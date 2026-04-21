import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects: Project[] = await client.fetch(projectsQuery);
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project: Project | null = await client.fetch(projectBySlugQuery, { slug });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Bilal Ahmed`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.coverImage ? [urlFor(project.coverImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | null = await client.fetch(projectBySlugQuery, { slug });

  if (!project) notFound();

  const coverUrl = project.coverImage ? urlFor(project.coverImage).width(1200).height(600).url() : null;

  return (
    <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Cover image */}
        {coverUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-8 bg-slate-100 dark:bg-slate-800">
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {project.title}
            </h1>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 text-slate-700 dark:text-slate-300 text-sm font-medium transition-all duration-200"
              >
                <FaGithub size={16} />
                Code
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <ExternalLink size={16} />
                Live Demo
              </Link>
            )}
          </div>
        </div>

        {/* Main description (short version from home) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
            About this project
          </h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Challenge (if exists) */}
        {project.challenge && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The Challenge
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>
        )}

        {/* Tech Stack (if exists) */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery (if images exist) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Gallery
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((image, idx) => {
                const imageUrl = image.asset?.url;
                if (!imageUrl) return null;
                return (
                  <div
                    key={idx}
                    className="relative h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}