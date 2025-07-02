import Helendo from "../images/project/HelendoProject.png";
import OldPortfolio from "../images/project/ProjectOldPortfolio.png";
import Playx from "../images/project/ProjectPlayx.png";

export const heroData = {
  greeting: "Hi all. I am",
  name: "Q1sh0x",
  title: "Frontend Developer",
  comments: [
    "// complete the game to continue",
    "// you can also see it on my Github page",
  ],
  codeSnippet: {
    variable: "githubLink",
    value: "https://github.com/Null4d",
    url: "https://github.com/Null4d",
  },
};

export const headerData = {
  logo: {
    text: "q1sh0x",
    href: "/",
  },
  navigation: [
    { id: 1, name: "_hello", href: "/" },
    { id: 2, name: "_about-me", href: "/about" },
    { id: 3, name: "_projects", href: "/projects" },
  ],
};

export const aboutData = {
  personalInfo: {
    name: "Batu",
    age: 15,
    location: "Georgia",
    title: "Frontend Developer",
    description: `Hello! I'm Batu, a 15-year-old passionate Frontend Developer currently living in Georgia. My journey into programming started early, fueled by curiosity about how websites and technology work. Over time, I’ve gained experience with HTML, CSS, JavaScript, and modern frameworks, and I enjoy building responsive, user-friendly interfaces.

Outside of coding, I'm a huge anime fan. I enjoy watching various genres—from action-packed shonen to psychological thrillers. This passion led me to AMV (Anime Music Video) editing, where I express my creativity by syncing anime clips with music and effects.

In my free time, I love gaming, exploring game development, and keeping up with new tech trends. I enjoy solving problems, building fun projects, and learning something new every day.

My goal is to become a skilled Frontend Developer, contribute to exciting projects, and make an impact in the tech industry. If you’re into tech, anime, or creative projects, I’d love to connect!`,
  },
  certificates: [
    {
      name: "CodeCademy",
      url: "https://www.codecademy.com/profiles/Q1sh0x/certificates/2682884a0719474f96407efe432fdd87",
      iconClass: "text-xl icon-external-link",
    },
  ],

  codeSnippets: [
    {
      username: "@Q1sh0x",
      code: `   function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
     const value: T = parseModel(chunk._response, chunk._value);
     const initializedChunk: InitializedChunk<T> = (chunk: any);
     initializedChunk._status = INITIALIZED;
     initializedChunk._value = value;
     return value;
    }`,
    },
    {
      username: "@Q1sh0x",
      code: `   export function parseModelTuple(
     response: Response,
     value: {+[key: string]: JSONValue} | $ReadOnlyArray<JSONValue>,
   ): any {
     const tuple: [mixed, mixed, mixed, mixed] = (value: any);`,
    },
  ],

  sections: {
    personalInfo: "personal-info",
    certificates: "certificates",
    content: "content",
    codeShowcase: "Code snippet showcase:",
  },
};

export const projects = [
  {
    id: 1,
    title: "Playx",
    tech: ["HTML", "CSS", "Tailwind", "JavaScript", "React"],
    image: Playx,
    url: "https://null4d.github.io/Playx.io/",
  },
  {
    id: 2,
    title: "Helendo",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Helendo,
    url: "https://null4d.github.io/helendo.io/",
  },
  {
    id: 3,
    title: "Old Portfolio",
    tech: ["HTML", "CSS", "JavaScript"],
    image: OldPortfolio,
    url: "https://null4d.github.io/CreatorPortfolio/",
  },
];

export const techFilterOptions = [
  { name: "React", className: "icon-reactjs text-2xl" },
  { name: "HTML & CSS", className: "icon-html5 text-2xl" },
  { name: "Tailwind", className: "icon-tailwindcss text-2xl" },
  { name: "JavaScript", className: "icon-javascript text-2xl" },
];

export const socialLinksData = [
  {
    name: "Github",
    href: "https://github.com/Null4d",
    iconClass: "icon-github",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/nullffx/",
    iconClass: "icon-instagram",
  },
  {
    name: "Discord",
    href: "https://discord.com/users/884110769027952642",
    iconClass: "icon-discord",
  },
  {
    name: "Twitter",
    href: "https://x.com/Q1sh0aa",
    iconClass: "icon-twitter",
  },
  {
    name: "Email",
    href: "mailto:batuc0d3r@gmail.com",
    iconClass: "icon-mail",
  },
];

export const githubData = {
  username: "Null4d",
  currentYear: new Date().getFullYear(),
  startYear: 2020,
  contributionColors: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dayLabels: ["", "Mon", "", "Wed", "", "Fri", ""],
  monthLabels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayLabelsShort: ["Mon", "Wed", "Fri"],
  loadingText: "Loading GitHub contributions...",
  errorTitle: "GitHub Contributions",
  errorMessage: "Unable to load contribution data for {year}.",
  contributionsText: "{count} contributions in {year}",
  reposText: "All repos",
  legendLabels: {
    less: "Less",
    more: "More",
  },
  tooltipText: {
    singular: "contribution",
    plural: "contributions",
    on: "on",
  },
  apiErrors: {
    noUserData: "No user data",
  },
  svgConfig: {
    cellSize: 11,
    cellGap: 3,
    topPadding: 25,
    dayLabelOffset: 20,
    borderRadius: 2,
    monthLabelSize: 10,
    dayLabelSize: 9,
    labelColor: "#7d8590",
    hoverStroke: "#ffffff",
  },
  contributionLevels: [
    { min: 0, max: 0, level: 0 },
    { min: 1, max: 3, level: 1 },
    { min: 4, max: 6, level: 2 },
    { min: 7, max: 9, level: 3 },
    { min: 10, max: Infinity, level: 4 },
  ],
  graphqlQuery: `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `,
};
