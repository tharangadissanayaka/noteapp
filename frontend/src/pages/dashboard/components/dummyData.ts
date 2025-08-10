import type { JournalCardProps } from "@/types/types";

// example data
const journalCardsData: JournalCardProps[] = [
    {
        id: "1",
        title: "Getting Started with React",
        date: "2025-06-20",
        description: "An introductory guide to building React applications with functional components and hooks.",
        hashtags: ["#React", "#JavaScript", "#Frontend"],
        isPinned: true
    },
    {
        id: "2",
        title: "Understanding TypeScript",
        date: "2025-06-18",
        description: "Exploring TypeScript's powerful type system for building robust JavaScript applications.",
        hashtags: ["#TypeScript", "#Types", "#JavaScript"]
    },
    {
        id: "3",
        title: "Tailwind CSS Tips",
        date: "2025-06-15",
        description: "Learn how to rapidly design modern websites using Tailwind CSS utility classes.",
        hashtags: ["#Tailwind", "#CSS", "#UI"],
        isPinned: false
    },
    {
        id: "4",
        title: "Next.js Routing Deep Dive",
        date: "2025-06-10",
        description: "A deep dive into file-based routing, dynamic routes, and API routes in Next.js.",
        hashtags: ["#NextJS", "#Routing", "#Fullstack"]
    },
    {
        id: "5",
        title: "Building Accessible Components",
        date: "2025-06-05",
        description: "Best practices for building accessible and inclusive React components.",
        hashtags: ["#Accessibility", "#React", "#A11y"]
    }
];

export default journalCardsData;
