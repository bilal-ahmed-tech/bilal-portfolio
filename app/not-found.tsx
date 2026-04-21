import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-25">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-4 rounded-full bg-red-50 dark:bg-red-500/10">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let me help you get back on track.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg bg-linear-to-r from-violet-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            Go to Home
          </Link>

          <div className="grid grid-cols-3 gap-2">
            <Link
              href="#about"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Error Code: 404 • Page Not Found
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            If you believe this is an error, please{" "}
            <a
              href="mailto:bilalahmed19015@gmail.com"
              className="text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              contact me
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}