"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Download, MapPin, Mail, Calendar } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

// -----------------------------------------------------------------------------
// Animation variants
// -----------------------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

const imageReveal: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

// -----------------------------------------------------------------------------
// Stat Counter Component
// -----------------------------------------------------------------------------
interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatCounter({ value, suffix, label, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      className="flex flex-col items-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      role="status"
      aria-label={`${label}: ${count}${suffix}`}
    >
      <span className="text-3xl font-bold text-violet-500 mb-1">
        {count}
        {suffix}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400 text-center">
        {label}
      </span>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Info Item Component – FIXED: No nested <a> tags
// -----------------------------------------------------------------------------
interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

function InfoItem({ icon: Icon, label, value, href }: InfoItemProps) {
  return (
    <div className="flex items-center gap-3 w-full group">
      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500 transition-colors duration-200">
        <Icon size={14} className="text-violet-500 group-hover:text-white transition-colors duration-200" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 w-20">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            className="text-sm text-slate-700 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded transition-colors duration-200"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------
const infoItems: InfoItemProps[] = [
  {
    icon: MapPin,
    label: "Location",
    value: "Rahim Yar Khan, Pakistan",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bilalahmed19015@gmail.com",
    href: "mailto:bilalahmed19015@gmail.com",
  },
  {
    icon: Calendar,
    label: "Availability",
    value: "Open to opportunities",
  },
];

// -----------------------------------------------------------------------------
// Main About Component
// -----------------------------------------------------------------------------
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About section"
      className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left – Image */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex justify-center"
          >
            <div
              aria-hidden="true"
              className="absolute top-4 left-4 w-full h-full rounded-3xl border-2 border-violet-500/20 -z-10"
            />
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 bg-slate-100 dark:bg-slate-800">
              <Image
                src="/profile-pic.png"
                alt="Bilal Ahmed — Creative Frontend Developer"
                width={400}
                height={500}
                className="object-cover w-full h-auto"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-white/10 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 p-3 shadow-lg">
                  <p className="text-white font-bold text-sm">Bilal Ahmed</p>
                  <p className="text-white/70 text-xs">Creative Frontend Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-medium text-violet-500 uppercase tracking-widest"
            >
              Get to know me
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
            >
              About Me
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={0.2}
              className="flex flex-col gap-3"
            >
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Hi! I&apos;m Bilal, a passionate Frontend Developer based in Rahim
                Yar Khan, Pakistan. I specialize in building fast, accessible, and
                visually polished web experiences using React and Next.js.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                I&apos;m currently available for freelance projects and actively
                expanding into full-stack development. Whether you need a landing
                page, a web app, or anything in between — I&apos;d love to work
                with you!
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="flex flex-col gap-3"
            >
              {infoItems.map((item) => (
                <InfoItem key={item.label} {...item} />
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.4}
              className="grid grid-cols-3 gap-3"
            >
              <StatCounter value={3} suffix="+" label="Projects Done" delay={0.5} />
              <StatCounter value={1} suffix="+" label="Happy Clients" delay={0.6} />
              <StatCounter value={100} suffix="%" label="On Time Delivery" delay={0.7} />
            </motion.div>

            <motion.a
              variants={fadeUp}
              custom={0.5}
              href="/Bilal-CV.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.97] active:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 text-white font-medium transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 w-fit"
              aria-label="Download CV (PDF)"
            >
              <Download
                size={16}
                className="group-hover:translate-y-0.5 transition-transform duration-200"
              />
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}