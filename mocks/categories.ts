import type { Category } from "~/types";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Web Development",
    slug: "web-development",
    description:
      "Frontend and backend development tutorials, best practices, and deep dives into modern web technologies.",
    postCount: 5,
  },
  {
    id: "cat-2",
    name: "Design",
    slug: "design",
    description:
      "UI/UX design principles, design systems, accessibility, and the art of crafting delightful user experiences.",
    postCount: 3,
  },
  {
    id: "cat-3",
    name: "DevOps",
    slug: "devops",
    description:
      "Continuous integration, deployment strategies, cloud infrastructure, and everything about shipping software.",
    postCount: 2,
  },
  {
    id: "cat-4",
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description:
      "Exploring artificial intelligence, machine learning models, and how they integrate with modern applications.",
    postCount: 2,
  },
  {
    id: "cat-5",
    name: "Career",
    slug: "career",
    description:
      "Career advice, interview preparation, remote work tips, and navigating the tech industry.",
    postCount: 2,
  },
];
