import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/lib/types";
import { AnimatedServices } from "@/components/ui/AnimatedServices";

export default async function Services() {
  let services: Service[] = [];

  try {
    services = await client.fetch(servicesQuery, {}, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

  if (services.length === 0) return null;

  return (
    <section
      id="services"
      aria-label="Services section"
      className="py-24 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-sm font-medium text-violet-500 uppercase tracking-widest mb-3">
            What I offer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            My Services
          </h2>
          <p className="max-w-xl text-slate-500 dark:text-slate-400">
            From landing pages to full React applications — I build what your
            business needs.
          </p>
        </div>

        {/* Pass only plain services (no IconComponent) */}
        <AnimatedServices services={services} />
      </div>
    </section>
  );
}