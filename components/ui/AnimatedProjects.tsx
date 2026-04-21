"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

interface Props {
  projects: Project[];
  variant?: "featured" | "all"; // "featured" = bento (home), "all" = uniform grid (projects page)
}

export function AnimatedProjects({ projects, variant = "featured" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const isBento = variant === "featured";

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {projects.map((project, i) => {
          const isFeatured = project.featured === true;
          // Only apply bento span if variant is "featured" and the project is featured (and we want to span first featured)
          // Actually simpler: span the first featured project when variant is "featured"
          const shouldSpan = isBento && isFeatured && i === projects.findIndex(p => p.featured === true);
          const imageUrl = project.coverImage
            ? urlFor(project.coverImage).width(800).height(400).url()
            : null;

          return (
            <motion.div
              key={project._id}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i * 0.1}
              whileHover={{ y: -4 }}
              onClick={() => handleCardClick(project.slug.current)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(project.slug.current);
                }
              }}
              role="button"
              tabIndex={0}
              className={`group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-violet-500/50 dark:hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 overflow-hidden cursor-pointer ${
                shouldSpan ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* card content – same as before */}
              <div className={`relative overflow-hidden ${shouldSpan ? "h-64" : "h-44"}`}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={shouldSpan ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    priority={shouldSpan && i === 0}
                  />
                ) : (
                  <div className="h-full bg-linear-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                    <span className="text-5xl font-bold text-violet-500/30">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100 max-md:bg-slate-900/40">
                  {project.githubUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                      }}
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 border border-white/20 text-white backdrop-blur-sm transition-all duration-200"
                    >
                      <FaGithub size={20} />
                    </button>
                  )}
                  {project.liveUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                      }}
                      aria-label={`View ${project.title} live demo`}
                      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 border border-white/20 text-white backdrop-blur-sm transition-all duration-200"
                    >
                      <ExternalLink size={20} />
                    </button>
                  )}
                </div>

                {isFeatured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className={`font-bold text-slate-900 dark:text-white group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200 ${shouldSpan ? "text-xl" : "text-lg"}`}>
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={16}
                    className="text-slate-400 group-hover:text-violet-500 transition-colors duration-200 shrink-0"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 border border-violet-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {variant === "featured" && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
          className="flex justify-center mt-10"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-all duration-200"
          >
            View All Projects
            <ExternalLink
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      )}
    </div>
  );
}