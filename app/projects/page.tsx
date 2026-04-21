// app/projects/page.tsx (server component)
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/lib/types";
import { AnimatedProjects } from "@/components/ui/AnimatedProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects built by Bilal Ahmed — Frontend Developer",
};

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await client.fetch(projectsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  if (projects.length === 0) {
    return (
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">No projects found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Animated heading with CSS only */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-up">
          <p className="text-sm font-medium text-violet-500 uppercase tracking-widest mb-3">
            My Work
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            All Projects
          </h1>
          <p className="max-w-xl text-slate-500 dark:text-slate-400">
            A collection of everything I&apos;ve built — from landing pages to full React applications.
          </p>
        </div>

        <AnimatedProjects projects={projects} variant="all" />
      </div>
    </main>
  );
}