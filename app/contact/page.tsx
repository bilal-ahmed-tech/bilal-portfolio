"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { MapPin, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      data.append("subject", "New message from Portfolio Contact Page");
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
    <main className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Let’s Talk
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Fill out the form below – I’ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Two‑column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column – contact info + map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Contact cards */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Get in touch</h2>
              <div className="space-y-4">
                <a
                  href="mailto:bilalahmed19015@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500 transition-colors">
                    <MdEmail className="w-5 h-5 text-violet-500 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-slate-700 dark:text-slate-200">bilalahmed19015@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/923276742759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <FaWhatsapp className="w-5 h-5 text-green-500 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">WhatsApp</p>
                    <p className="text-slate-700 dark:text-slate-200">+92 327-6742759</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200 group cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                    <MdLocationOn className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Location</p>
                    <p className="text-slate-700 dark:text-slate-200">Rahim Yar Khan, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map image – professional (no emoji) */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&h=400&fit=crop"
                alt="Map placeholder – Rahim Yar Khan, Pakistan"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="bg-white dark:bg-slate-900 p-4 text-center text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                <MapPin size={14} className="text-violet-500" />
                <span>Rahim Yar Khan, Pakistan – Reach out virtually!</span>
              </div>
            </div>
          </motion.div>

          {/* Right column – form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaPaperPlane className="w-6 h-6 text-violet-500" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                >
                  Your Name *
                </label>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                >
                  Email Address *
                </label>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className={inputClass("subject")}
                  placeholder=" "
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                >
                  Subject *
                </label>
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  className={`${inputClass("message")} resize-none`}
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-5 text-slate-500 dark:text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-violet-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                >
                  Message *
                </label>
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {/* Success message – no emoji */}
              {status === "success" && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl text-center text-sm flex items-center justify-center gap-2">
                  <CheckCircle size={16} />
                  <span>Message sent! I’ll reply soon.</span>
                </div>
              )}
              {/* Error message  */}
              {status === "error" && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-center text-sm flex items-center justify-center gap-2">
                  <XCircle size={16} />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}