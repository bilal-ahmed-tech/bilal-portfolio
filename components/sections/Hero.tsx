"use client";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

// -----------------------------------------------------------------------------
// Social links data
// -----------------------------------------------------------------------------
const socialLinks = [
  {
    href: "https://github.com/bilal-ahmed-tech",
    label: "GitHub",
    icon: FaGithub,
    bgHover: "hover:bg-slate-900 dark:hover:bg-white",
    textHover: "hover:text-white dark:hover:text-slate-900",
    borderHover: "hover:border-slate-900 dark:hover:border-white",
    ring: "focus-visible:ring-slate-500",
  },
  {
    href: "https://www.linkedin.com/in/bilal-ahmed-b54439369/",
    label: "LinkedIn",
    icon: FaLinkedin,
    bgHover: "hover:bg-[#0A66C2]",
    textHover: "hover:text-white",
    borderHover: "hover:border-[#0A66C2]",
    ring: "focus-visible:ring-[#0A66C2]",
  },
  {
    href: "https://wa.me/923276742759",
    label: "WhatsApp",
    icon: FaWhatsapp,
    bgHover: "hover:bg-[#25D366]",
    textHover: "hover:text-white",
    borderHover: "hover:border-[#25D366]",
    ring: "focus-visible:ring-[#25D366]",
  },
];

export default function Hero() {
  return (
    <section
      aria-label="Hero section"
      className="relative min-h-screen flex items-center bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[4rem_4rem]"
      />

      {/* Gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/3 w-150 h-150 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/4 w-75 h-75 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        {/* Left — Text */}
        <div className="flex flex-col items-start order-2 md:order-1">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-500 dark:text-violet-400 text-sm font-medium mb-6 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 dark:bg-violet-400 animate-pulse" />
            Open to freelance & full-time opportunities
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]"
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 via-violet-500 to-purple-600">
              Bilal Ahmed
            </span>
          </motion.h1>

          {/* Role – corrected */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-linear-to-r from-violet-500 to-transparent" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
              Creative Frontend Developer
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
          >
            I build fast, accessible, and visually polished web experiences
            using React and Next.js. Currently expanding into full-stack
            development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.97] active:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 text-white font-medium transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
            >
              View Projects
              <ExternalLink
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </a>
            <a
              href="/Bilal-CV.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-500 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-all duration-200"
            >
              <Download
                size={15}
                className="group-hover:translate-y-0.5 transition-transform duration-200"
              />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex items-center gap-3"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${link.bgHover} ${link.textHover} ${link.borderHover} ${link.ring}`}
              >
                <link.icon size={19} />
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right — Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <div className="relative">
            {/* Outer glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full bg-linear-to-br from-violet-500/20 to-purple-600/10 blur-3xl"
            />

            {/* Rotating ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-linear-to-br from-violet-500/30 via-transparent to-purple-600/30 animate-spin [animation-duration:8s]"
            />

            {/* Image container */}
            <div className="relative w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl shadow-violet-500/10">
              <Image
                src="/profile-pic.png"
                alt="Bilal Ahmed — Creative Frontend Developer based in Rahim Yar Khan, Pakistan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
                priority
              />
            </div>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -bottom-2 -left-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute -top-2 -right-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-violet-500">1+</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Year Exp.
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 motion-safe:animate-bounce"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}