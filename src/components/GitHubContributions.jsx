import React, { useState, useEffect, useCallback } from "react";
import { githubData } from "../data/index";

const cache = new Map();
const CACHE_TTL = 6e5;

const GitHubContributions = () => {
  const [svgData, setSvgData] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [year, setYear] = useState(githubData.currentYear);
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });

  const showTooltip = useCallback((event, count, date) => {
    const d = new Date(date);
    const month = githubData.monthLabels[d.getMonth()];
    const day = d.getDate();
    const text = `${count} ${count === "1" ? githubData.tooltipText.singular : githubData.tooltipText.plural} ${githubData.tooltipText.on} ${month} ${day}`;
    setTooltip({
      show: true,
      x: event.clientX,
      y: event.clientY,
      content: text,
    });
  }, []);

  const moveTooltip = useCallback((event) => {
    setTooltip((prev) =>
      prev.show ? { ...prev, x: event.clientX, y: event.clientY } : prev,
    );
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip({ show: false, x: 0, y: 0, content: "" });
  }, []);

  const fetchContributions = async (targetYear) => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: githubData.graphqlQuery,
          variables: {
            username: githubData.username,
            from: `${targetYear}-01-01T00:00:00Z`,
            to: `${targetYear}-12-31T23:59:59Z`,
          },
        }),
      });

      const json = await response.json();
      if (!json.data || !json.data.user)
        throw new Error(githubData.apiErrors.noUserData);

      const cal = json.data.user.contributionsCollection.contributionCalendar;
      const contributions = cal.weeks.flatMap((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
        })),
      );

      const svg = generateContributionSVG(contributions);

      cache.set(`${githubData.username}-${targetYear}`, {
        svg,
        totalCount: cal.totalContributions,
        timestamp: Date.now(),
      });

      setSvgData(svg);
      setTotalCount(cal.totalContributions);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const generateContributionSVG = (contributions) => {
    const config = githubData.svgConfig;
    const weeks = Math.ceil(contributions.length / 7);
    const width = weeks * (config.cellSize + config.cellGap);
    const height = 7 * (config.cellSize + config.cellGap) + config.topPadding;

    let svg = `<svg 
      width="${width}" 
      height="${height}" 
      viewBox="0 0 ${width} ${height}"
      class="contribution-calendar w-full h-auto"
      preserveAspectRatio="xMinYMin meet">
      <style>
        .month-label { font-size: ${config.monthLabelSize}px; fill: ${config.labelColor}; }
        .day-label { font-size: ${config.dayLabelSize}px; fill: ${config.labelColor}; }
        .contrib-square { cursor: pointer; }
        .contrib-square:hover { stroke: ${config.hoverStroke}; stroke-width: 1px; }
        @media (max-width: 768px) {
          .month-label { font-size: ${Math.max(8, config.monthLabelSize - 2)}px; }
          .day-label { font-size: ${Math.max(7, config.dayLabelSize - 1)}px; }
        }
      </style>`;

    githubData.monthLabels.forEach((month, i) => {
      const x = i * 4.33 * (config.cellSize + config.cellGap);
      svg += `<text x="${x}" y="10" class="month-label">${month}</text>`;
    });

    [1, 3, 5].forEach((dayIndex, i) => {
      const y =
        config.dayLabelOffset +
        dayIndex * (config.cellSize + config.cellGap) +
        6;
      svg += `<text x="-5" y="${y}" class="day-label" text-anchor="end">${githubData.dayLabelsShort[i]}</text>`;
    });

    contributions.forEach((contrib, i) => {
      const week = Math.floor(i / 7);
      const day = i % 7;
      const x = week * (config.cellSize + config.cellGap);
      const y =
        config.dayLabelOffset + day * (config.cellSize + config.cellGap);
      const level = githubData.contributionLevels.find(
        (l) => contrib.count >= l.min && contrib.count <= l.max,
      ).level;

      svg += `<rect 
        class="contrib-square" 
        x="${x}" 
        y="${y}" 
        width="${config.cellSize}" 
        height="${config.cellSize}" 
        fill="${githubData.contributionColors[level]}" 
        rx="${config.borderRadius}" 
        data-count="${contrib.count}" 
        data-date="${contrib.date}"
        onmouseover="window.showTooltip(event, '${contrib.count}', '${contrib.date}')"
        onmousemove="window.moveTooltip(event)"
        onmouseout="window.hideTooltip()">
      </rect>`;
    });

    return svg + "</svg>";
  };

  const years = Array.from(
    { length: githubData.currentYear - githubData.startYear + 1 },
    (_, i) => githubData.currentYear - i,
  );

  const handleSvgMouseMove = useCallback(
    (event) => {
      const target = event.target;
      if (!target.classList.contains("contrib-square")) {
        hideTooltip();
      }
    },
    [hideTooltip],
  );

  useEffect(() => {
    window.showTooltip = showTooltip;
    window.moveTooltip = moveTooltip;
    window.hideTooltip = hideTooltip;

    return () => {
      delete window.showTooltip;
      delete window.moveTooltip;
      delete window.hideTooltip;
    };
  }, [showTooltip, moveTooltip, hideTooltip]);

  useEffect(() => {
    const cacheKey = `${githubData.username}-${year}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setSvgData(cached.svg);
      setTotalCount(cached.totalCount);
      setLoading(false);
      return;
    }

    fetchContributions(year);
  }, [year]);

  if (loading) {
    return (
      <div className="mt-4 md:mt-6 p-3 md:p-4 border border-primary-3 rounded-lg bg-primary-1">
        <div className="flex items-center text-primary-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-4 mr-2" />
          {githubData.loadingText}
        </div>
      </div>
    );
  }

  if (error || !svgData) {
    return (
      <div className="mt-4 md:mt-6 p-3 md:p-4 border border-primary-3 rounded-lg bg-primary-1">
        <div className="text-yellow-400 text-sm">
          <p className="font-semibold mb-1">{githubData.errorTitle}</p>
          <p className="text-xs md:text-sm">
            Add REACT_APP_GITHUB_TOKEN to .env file to see contributions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:mt-6 p-3 md:p-4 border border-primary-3 rounded-lg bg-primary-1 relative">
      <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-primary-7 text-xs md:text-sm font-medium">
            {githubData.contributionsText
              .replace("{count}", totalCount)
              .replace("{year}", year)}
          </h3>
          <span className="hidden sm:inline-block text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded whitespace-nowrap">
            {githubData.reposText}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={year}
            onChange={(e) => setYear(+e.target.value)}
            className="bg-primary-3 text-primary-7 border border-primary-3 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary-4"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <div className="hidden sm:flex items-center text-xs text-primary-2">
            <span className="mr-2 text-xs">{githubData.legendLabels.less}</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-[11px] h-[11px] rounded-[2px]"
                  style={{
                    backgroundColor: githubData.contributionColors[level],
                  }}
                />
              ))}
            </div>
            <span className="ml-2 text-xs">{githubData.legendLabels.more}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div
          className="min-w-fit"
          dangerouslySetInnerHTML={{ __html: svgData }}
          onMouseMove={handleSvgMouseMove}
          onMouseLeave={hideTooltip}
        />
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 pointer-events-none max-w-xs"
          style={{
            left: Math.min(tooltip.x + 10, window.innerWidth - 200),
            top: tooltip.y - 35,
            whiteSpace: "nowrap",
            fontSize: "11px",
            backgroundColor: "#24292f",
            color: "#f0f6fc",
            border: "1px solid #30363d",
            padding: "4px 8px",
            borderRadius: "3px",
          }}
        >
          <span className="text-xs">{tooltip.content}</span>
        </div>
      )}
    </div>
  );
};

export default GitHubContributions;
