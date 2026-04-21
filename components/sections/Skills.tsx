"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiCss,
  SiGit,
  SiSwagger,
  SiBootstrap,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

type SkillLevel = "Advanced" | "Intermediate" | "Learning";

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  level: SkillLevel;
}

const skills: Skill[] = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-[#F7DF1E]",
    bg: "bg-yellow-400/10 border-yellow-400/20 hover:border-yellow-400/50 hover:bg-yellow-400/20",
    level: "Advanced",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-[#3178C6]",
    bg: "bg-blue-400/10 border-blue-400/20 hover:border-blue-400/50 hover:bg-blue-400/20",
    level: "Learning",
  },
  {
    name: "React",
    icon: SiReact,
    color: "text-[#61DAFB]",
    bg: "bg-cyan-400/10 border-cyan-400/20 hover:border-cyan-400/50 hover:bg-cyan-400/20",
    level: "Advanced",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-black dark:text-black",
    bg: "bg-slate-100 dark:bg-white border-slate-200 dark:border-slate-200 hover:border-slate-300 dark:hover:border-slate-300 hover:bg-slate-200 dark:hover:bg-gray-100",
    level: "Learning",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-[#06B6D4]",
    bg: "bg-teal-400/10 border-teal-400/20 hover:border-teal-400/50 hover:bg-teal-400/20",
    level: "Advanced",
  },
  {
    name: "CSS3",
    icon: SiCss,
    color: "text-[#2965F1]",
    bg: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20",
    level: "Advanced",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "text-[#F05032]",
    bg: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-500/20",
    level: "Intermediate",
  },
  {
    name: "REST APIs",
    icon: SiSwagger,
    color: "text-[#2E5C0A] dark:text-[#6BBF1A]",
    bg: "bg-violet-500/10 border-violet-500/20 hover:border-violet-500/50 hover:bg-violet-500/20",
    level: "Intermediate",
  },
  {
    name: "VS Code",
    icon: BiLogoVisualStudio,
    color: "text-[#007ACC]",
    bg: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20",
    level: "Advanced",
  },
  {
    name: "Bootstrap",
    icon: SiBootstrap,
    color: "text-[#7952B3]",
    bg: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20",
    level: "Intermediate",
  },
];

const levelColor: Record<SkillLevel, string> = {
  Advanced: "bg-green-600/10 text-green-600 border-green-600/20",
  Intermediate: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Learning: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills section"
      className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-sm font-medium text-violet-500 uppercase tracking-widest mb-3">
            What I work with
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-slate-500 dark:text-slate-400">
            Technologies I use to build fast, accessible, and visually polished
            web experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl border cursor-default transition-all duration-300 ${skill.bg}`}
              style={{ willChange: "transform" }}>
              <div
                className={`text-3xl ${skill.color} transition-transform duration-300 group-hover:scale-110`}>
                <skill.icon size={32} />
              </div>
              <span
                className={`text-sm font-medium text-center ${
                  skill.name === "Next.js"
                    ? "text-slate-700 dark:text-slate-900"
                    : "text-slate-700 dark:text-slate-300"
                }`}>
                {skill.name}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${levelColor[skill.level]}`}>
                {skill.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
