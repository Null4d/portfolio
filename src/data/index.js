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
    {
      id: 1,
      name: "_hello",
      href: "/",
    },
    {
      id: 2,
      name: "_about-me",
      href: "/about",
    },
    {
      id: 3,
      name: "_projects",
      href: "/projects",
    },
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
