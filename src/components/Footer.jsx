import React, { memo, useRef, useState, useCallback } from "react";
import { socialLinksData } from "../data/index";
import { SoundWrapper } from "../audio/AudioEngine";

const DOCK_CONFIG = {
  RADIUS: 121,
  PEAK_MAG: 2.2,
  SPACING: 0.22,
  TOOLTIP_THRESHOLD: 0.3,
  TOOLTIP_OFFSET: -77,
  MARGIN_MULT: 100,
};

const Footer = () => {
  const dockRef = useRef(null);
  const rafRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const isMobile = "ontouchstart" in window;

  const calculateMagnification = useCallback((distance) => {
    const normalizedDistance = Math.min(distance / DOCK_CONFIG.RADIUS, 1);
    const base = 1 - normalizedDistance;
    const intensity = Math.sqrt(base) * Math.pow(base, 0.2);
    const finalIntensity = Math.max(0, intensity);

    return {
      scale: 1 + finalIntensity * (DOCK_CONFIG.PEAK_MAG - 1),
      margin: finalIntensity * DOCK_CONFIG.SPACING * DOCK_CONFIG.MARGIN_MULT,
      intensity: finalIntensity,
    };
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const pointerX = e.touches?.[0]?.clientX ?? e.clientX;
        const items = dock.querySelectorAll(".dockitem");

        let bestTooltip = null;
        let highestIntensity = 0;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const distance = Math.abs(pointerX - centerX);
          const { scale, margin, intensity } = calculateMagnification(distance);

          item.style.setProperty("--dock-scale", scale.toString());
          item.style.setProperty("--dock-margin", `${margin}px`);

          if (
            intensity > highestIntensity &&
            intensity >= DOCK_CONFIG.TOOLTIP_THRESHOLD
          ) {
            highestIntensity = intensity;
            bestTooltip = item.dataset.itemName;
          }
        });

        if (bestTooltip !== hoveredItem) {
          setHoveredItem(bestTooltip || null);
        }
      });
    },
    [calculateMagnification, hoveredItem],
  );

  const handleEnd = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const dock = dockRef.current;
    if (dock) {
      dock.querySelectorAll(".dockitem").forEach((item) => {
        item.style.setProperty("--dock-scale", "1");
        item.style.setProperty("--dock-margin", "0px");
      });
    }

    setHoveredItem(null);
  }, []);

  const touchHandlers = isMobile
    ? {
        onTouchStart: handleMove,
        onTouchMove: handleMove,
        onTouchEnd: handleEnd,
        onTouchCancel: handleEnd,
      }
    : {};

  const mouseHandlers = !isMobile
    ? {
        onMouseMove: handleMove,
        onMouseLeave: handleEnd,
      }
    : {};

  return (
    <footer className="relative bg-primary-1">
      <div className="flex items-center justify-center h-16 pl-5 border md:pl-5 border-primary-3">
        <div className="fixed flex items-center justify-center z-3">
          <div className="flex w-full h-full backdrop-blur-sm absolute rounded-[15px]" />

          <nav
            ref={dockRef}
            className="relative z-1 h-12 flex justify-center items-center transition-all duration-300 border border-primary-3 shadow-[0px_5px_25px_rgba(0,0,0,1)] rounded-[15px] touch-none select-none"
            {...mouseHandlers}
            {...touchHandlers}
            aria-label="Social links"
          >
            {socialLinksData.map((item) => {
              const isHovered = hoveredItem === item.name;
              const iconClasses = `flex w-full h-full backdrop-blur-[1px] lg:backdrop-blur-none items-center justify-center text-primary-7 border border-primary-3 rounded-lg transition-all duration-300 ease-out ${item.iconClass}`;

              let bgClass = "";
              if (isHovered) {
                bgClass = "bg-primary-2 border-primary-2";
              } else if (!isMobile) {
                bgClass = "hover:bg-primary-2";
              }

              return (
                <div key={item.name} className="relative">
                  {isHovered && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-10 backdrop-blur-[2px] lg:backdrop-blur-none"
                      style={{ top: DOCK_CONFIG.TOOLTIP_OFFSET }}
                      role="tooltip"
                    >
                      <div className="text-primary-7 bg-primary-2 flex items-center justify-center border-2 border-primary-2 min-w-[5rem] w-fit rounded-md px-4 py-1 text-xs whitespace-nowrap relative animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
                        {item.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] mt-[2px] border-r-[4px] border-t-[4px] border-transparent border-t-primary-2" />
                      </div>
                    </div>
                  )}

                  <SoundWrapper>
                    <a
                      target="_blank"
                      className="dockitem relative w-9 h-9 flex items-center justify-center focus:outline-none rounded-lg origin-bottom transition-all duration-300 ease-out will-change-transform"
                      rel="noreferrer"
                      href={item.href}
                      aria-label={`Visit ${item.name}`}
                      data-item-name={item.name}
                      style={{
                        transform: "scale(var(--dock-scale, 1))",
                        marginInline: "calc(var(--dock-margin, 0px) + 6px)",
                      }}
                      onMouseEnter={() =>
                        !isMobile && setHoveredItem(item.name)
                      }
                      onMouseLeave={() => !isMobile && setHoveredItem(null)}
                    >
                      <div className={`${iconClasses} ${bgClass}`} />
                    </a>
                  </SoundWrapper>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
