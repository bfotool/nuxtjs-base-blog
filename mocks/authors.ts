import type { Author } from "~/types";

export const mockAuthors: Author[] = [
  {
    id: "author-1",
    name: "Sarah Chen",
    avatar: "https://picsum.photos/seed/sarah/200/200",
    bio: "Full-stack developer with 8 years of experience. Passionate about React, TypeScript, and building scalable web applications.",
    social: {
      twitter: "https://twitter.com/sarahchen",
      github: "https://github.com/sarahchen",
    },
  },
  {
    id: "author-2",
    name: "Marcus Rivera",
    avatar: "https://picsum.photos/seed/marcus/200/200",
    bio: "DevOps engineer and cloud architect. Writes about infrastructure, CI/CD, and the art of shipping software reliably.",
    social: {
      twitter: "https://twitter.com/marcusrivera",
      github: "https://github.com/marcusrivera",
      linkedin: "https://linkedin.com/in/marcusrivera",
    },
  },
  {
    id: "author-3",
    name: "Lena Kowalski",
    avatar: "https://picsum.photos/seed/lena/200/200",
    bio: "UX designer turned frontend engineer. Bridging the gap between beautiful design and clean code.",
    social: {
      twitter: "https://twitter.com/lenakowalski",
      github: "https://github.com/lenakowalski",
    },
  },
  {
    id: "author-4",
    name: "James Okafor",
    avatar: "https://picsum.photos/seed/james/200/200",
    bio: "Machine learning engineer exploring the intersection of AI and web development. Speaker and open-source contributor.",
    social: {
      github: "https://github.com/jamesokafor",
      linkedin: "https://linkedin.com/in/jamesokafor",
    },
  },
];
