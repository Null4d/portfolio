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
    description: `Hello! My name is Batu, and I am a passionate Frontend developer. I am 15 years old and currently living in Georgia. My journey into programming started at an early age, driven by my curiosity about how technology works. Over time, I honed my skills in coding, web development, and frontend development, exploring various programming languages and frameworks.

In addition to coding, I have a deep love for anime. I enjoy watching a wide range of anime series, from action-packed shonen to thought-provoking psychological thrillers. This passion led me to anime editing, where I create AMVs (Anime Music Videos) to bring my favorite scenes to life in new and creative ways.

When I'm not coding or editing, I spend my time playing video games, experimenting with game development, and exploring new tech trends. I enjoy problem-solving, building projects, and continuously learning to improve my craft.

My goal is to become a highly skilled Frontend developer, contribute to innovative projects, and one day make a significant impact in the tech industry. If you share similar interests or want to collaborate, feel free to connect!`,
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
