"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Monitor,
  Briefcase,
  Code2,
  Smartphone,
  Bug,
  Wrench,
  LucideIcon,
} from "lucide-react";
import { Service } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor,
  briefcase: Briefcase,
  "code-2": Code2,
  smartphone: Smartphone,
  bug: Bug,
  wrench: Wrench,
};

const iconColorMap: Record<string, string> = {
  monitor: "text-violet-600 dark:text-violet-400",
  briefcase: "text-blue-600 dark:text-blue-400",
  "code-2": "text-cyan-600 dark:text-cyan-400",
  smartphone: "text-green-600 dark:text-green-400",
  bug: "text-orange-600 dark:text-orange-400",
  wrench: "text-slate-600 dark:text-slate-400",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

interface Props {
  services: Service[];
}

export function AnimatedServices({ services }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service, i) => {
        const IconComponent = iconMap[service.icon] ?? Monitor;
        const iconColor = iconColorMap[service.icon] ?? "text-violet-600 dark:text-violet-400";

        return (
          <motion.div
            key={service._id}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i * 0.08}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-500/50 dark:hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/5 focus-within:ring-2 focus-within:ring-violet-500 transition-all duration-300 cursor-default"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 flex items-center justify-center transition-all duration-300">
                <IconComponent
                  size={22}
                  className={`${iconColor} group-hover:scale-110 transition-transform duration-300`}
                />
              </div>
              <span className="text-4xl font-bold text-slate-100 dark:text-slate-800 select-none group-hover:text-violet-500/50 transition-colors duration-300">
                {String(service.order).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
              {service.title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
              {service.description}
            </p>

            <div className="h-px bg-slate-100 dark:bg-slate-800 mb-4 group-hover:bg-violet-500/30 transition-colors duration-300" />

            <ul className="flex flex-col gap-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 group-hover:bg-violet-600 dark:group-hover:bg-violet-400 shrink-0 transition-colors duration-200" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}