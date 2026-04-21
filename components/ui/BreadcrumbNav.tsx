"use client";

import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/seo";

interface BreadcrumbProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * Breadcrumb Component with SEO Schema
 * Adds both visual breadcrumbs and JSON-LD structured data
 */
export default function BreadcrumbNav({ items }: BreadcrumbProps) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(items)),
        }}
      />

      {/* Visual Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              <Link
                href={item.url}
                className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 rounded transition-colors duration-200"
              >
                {item.name}
              </Link>
              {index < items.length - 1 && (
                <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}