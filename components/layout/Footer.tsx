"use client";

import { FaGithub, FaLinkedin, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    href: "https://github.com/bilal-ahmed-tech",
    label: "Visit Bilal Ahmed on GitHub",
    icon: FaGithub,
    bg: "bg-[#333]",
  },
  {
    href: "https://www.linkedin.com/in/bilal-ahmed-b54439369/",
    label: "Visit Bilal Ahmed on LinkedIn",
    icon: FaLinkedin,
    bg: "bg-[#0A66C2]",
  },
  {
    href: "https://wa.me/923276742759",
    label: "Contact Bilal Ahmed on WhatsApp",
    icon: FaWhatsapp,
    bg: "bg-[#25D366]",
  },
  {
    href: "mailto:bilalahmed19015@gmail.com",
    label: "Send email to Bilal Ahmed",
    icon: Mail,
    bg: "bg-violet-500",
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="flex flex-col gap-4"
          >
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded transition-colors duration-200 w-fit"
            >
              Bilal<span className="text-violet-500">.</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Frontend Developer building fast, accessible, and visually
              polished web experiences.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon, bg }) => (
                <Link
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className={`group relative w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 transition-all duration-300 overflow-hidden`}
                >
                  <span className={`absolute inset-0 ${bg} scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg`} />
                  <Icon className="relative z-10 w-4 h-4 group-hover:text-white transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-violet-500 transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-widest">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:bilalahmed19015@gmail.com"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded transition-colors duration-200 w-fit"
              >
                bilalahmed19015@gmail.com
              </a>
              <a
                href="https://wa.me/923276742759"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded transition-colors duration-200 w-fit"
              >
                +92 327-6742759
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <FaMapMarkerAlt size={14} className="text-violet-500 shrink-0" aria-hidden="true" />
                <span>Rahim Yar Khan, Pakistan</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
          className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Bilal Ahmed. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Built with{" "}
            <span className="text-violet-500 font-medium">Next.js</span> &{" "}
            <span className="text-violet-500 font-medium">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}