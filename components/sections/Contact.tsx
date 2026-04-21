"use client";

import { FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { CheckCircle, XCircle } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = "Invalid email address";
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    else if (formState.message.length < 10)
      newErrors.message = "At least 10 characters required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");

    try {
      const data = new FormData();
      data.append("access_key", "62c2cf0b-d0d5-4d51-96eb-1b4f76efe481");
      data.append("subject", "New message from Portfolio");
      data.append("name", formState.name);
      data.append("email", formState.email);
      data.append("subject_line", formState.subject);
      data.append("message", formState.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: string) =>
    `peer w-full px-4 pt-6 pb-2 border rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-slate-300 dark:border-slate-700 focus:ring-violet-500 focus:border-transparent"
    }`;

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact section"
      className="relative py-28 overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 -left-40 w-80 h-80 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-3 bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="text-4xl md:text-5xl font-bold bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent"
          >
            Let&apos;s Create Something Amazing
          </motion.h2>

          <motion.div
            variants={fadeUp}
            custom={0.2}
            className="w-24 h-1 bg-linear-to-r from-violet-500 to-purple-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left – Contact Info */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="relative group"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-1 bg-linear-to-r from-violet-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"
              />
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-violet-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg select-none">
                    BA
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Bilal Ahmed
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Frontend Developer & UI Engineer
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Based in{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Rahim Yar Khan, Pakistan
                  </span>
                  , I specialize in building fast, accessible web experiences
                  with React and Next.js.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.4} className="space-y-4">
              <a
                href="mailto:bilalahmed19015@gmail.com"
                aria-label="Send email to Bilal Ahmed"
                className="flex items-center gap-5 p-5 rounded-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500 transition-colors duration-300 shrink-0">
                  <MdEmail className="w-6 h-6 text-violet-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">
                    bilalahmed19015@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/923276742759"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Bilal Ahmed on WhatsApp"
                className="flex items-center gap-5 p-5 rounded-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300 shrink-0">
                  <FaWhatsapp className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">
                    +92 327-6742759
                  </p>
                </div>
              </a>

              <div className="group flex items-center gap-5 p-5 rounded-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300 shrink-0">
                  <MdLocationOn className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-slate-700 dark:text-slate-200 font-medium">
                    Rahim Yar Khan, Pakistan
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.5}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-violet-500/5 to-purple-500/5 rounded-3xl blur-2xl"
            />
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <FaPaperPlane className="w-5 h-5 text-violet-500" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass("name")}
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                  >
                    Your Name
                  </label>
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-xs text-red-500 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass("email")}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                  >
                    Email Address
                  </label>
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={inputClass("subject")}
                    placeholder=" "
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                  >
                    Subject
                  </label>
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="text-xs text-red-500 mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputClass("message")} resize-none`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-5 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                  >
                    Message
                  </label>
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-xs text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaPaperPlane />
                  )}
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <div
                    role="status"
                    className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl text-center text-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} />
                    <span>Message sent! I&apos;ll reply soon.</span>
                  </div>
                )}
                {status === "error" && (
                  <div
                    role="alert"
                    className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-center text-sm flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}