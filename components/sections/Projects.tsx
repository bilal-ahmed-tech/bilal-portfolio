import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/lib/types";
import { AnimatedProjects } from "@/components/ui/AnimatedProjects";

export default async function Projects() {
  let projects: Project[] = [];

  try {
    projects = await client.fetch(featuredProjectsQuery, {}, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  // Always render the section with id="projects" so that the header can detect it.
  return (
    <section
      id="projects"
      aria-label="Projects section"
      className="py-24 bg-white dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-sm font-medium text-violet-500 uppercase tracking-widest mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="max-w-xl text-slate-500 dark:text-slate-400">
            A selection of my best work — click any project to see the full details.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">No projects yet. Check back soon!</p>
        ) : (
          <AnimatedProjects projects={projects} variant="featured" />
        )}
      </div>
    </section>
  );
}