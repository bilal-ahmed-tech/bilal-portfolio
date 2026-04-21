# Portfolio Website Documentation

## 📋 Project Overview

This is a modern, responsive portfolio website built with **Next.js 16** and **Sanity CMS**. It showcases professional projects, services, and skills with smooth animations and dark/light theme support.

**Primary Purpose:** Freelance portfolio to display projects, skills, and services with a contact interface for potential clients.

---

## ✨ Key Features

- 🎨 **Dark/Light Theme Toggle** - Theme persistence with smooth transitions
- 📱 **Fully Responsive** - Mobile-first design approach
- ✨ **Smooth Animations** - Powered by Framer Motion
- 🎯 **Active Section Tracking** - Navigation highlights current section
- 📊 **Project Showcase** - Display projects with live links and GitHub repositories
- 📝 **Dynamic Content** - Managed through Sanity CMS
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🚀 **SEO Optimized** - Robots.txt and sitemap.ts for search engines
- 📲 **Mobile Menu** - Hamburger navigation for mobile devices

---

## 🛠️ Technology Stack

### Frontend

- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 12.38.0** - Advanced animations
- **Lucide React 1.8.0** - Icon library
- **React Icons 5.6.0** - Additional icons

### Backend & CMS

- **Sanity CMS 5.21.0** - Headless CMS for content management
- **next-sanity 12.3.0** - Next.js integration for Sanity
- **Sanity Image URL** - Image optimization

### Developer Tools

- **ESLint 9** - Code quality
- **Prettier 3.8.3** - Code formatting
- **Babel React Compiler** - React optimization

---

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Header & Footer
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Loading state
│   ├── not-found.tsx            # 404 page
│   ├── robots.ts                # SEO robots.txt
│   ├── sitemap.ts               # SEO sitemap
│   ├── contact/page.tsx         # Contact page
│   ├── projects/
│   │   ├── page.tsx             # All projects listing
│   │   └── [slug]/page.tsx      # Individual project details
│   ├── studio/[[...tool]]/page.tsx  # Sanity Studio
│   └── globals.css              # Global styles
│
├── components/                  # React components
│   ├── layout/
│   │   ├── Header.tsx           # Navigation header (fixed)
│   │   ├── Footer.tsx           # Footer component
│   │   └── ThemeProvider.tsx    # Dark/Light theme context
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section
│   │   ├── About.tsx            # About section
│   │   ├── Skills.tsx           # Skills section
│   │   ├── Services.tsx         # Services section
│   │   ├── Projects.tsx         # Projects section
│   │   └── Contact.tsx          # Contact section
│   └── ui/
│       ├── AnimatedProjects.tsx # Project cards with animations
│       ├── AnimatedServices.tsx # Service cards with animations
│       ├── BackToTop.tsx        # Scroll to top button
│       └── BreadcrumbNav.tsx    # Breadcrumb navigation
│
├── sanity/                      # Sanity CMS configuration
│   ├── env.ts                   # Sanity environment variables
│   ├── structure.ts             # Sanity studio structure
│   ├── lib/
│   │   ├── client.ts            # Sanity client configuration
│   │   ├── image.ts             # Image URL builder
│   │   ├── live.ts              # Live preview support
│   │   └── queries.ts           # GROQ queries
│   └── schemaTypes/
│       ├── index.ts             # Schema index
│       ├── project.ts           # Project schema with URLs
│       └── service.ts           # Service schema
│
├── lib/
│   ├── seo.ts                   # SEO utilities
│   └── types.ts                 # TypeScript type definitions
│
├── public/
│   └── robots.txt               # Search engine directives
│
├── sanity.config.ts             # Main Sanity configuration
├── sanity.cli.ts                # Sanity CLI configuration
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
└── package.json                 # Dependencies
```

---

## 🔗 Website Links & URLs Configuration

### Location of Links Used:

| Location           | Purpose          | Details                                                             |
| ------------------ | ---------------- | ------------------------------------------------------------------- |
| **Header.tsx**     | Navigation links | Defined in `sectionLinks[]` and `pageDropdownItems[]` arrays        |
| **Project Schema** | Project URLs     | `liveUrl` - Live project link, `githubUrl` - GitHub repository link |
| **Sanity CMS**     | Content URLs     | Managed in Sanity Studio dashboard                                  |
| **sitemap.ts**     | SEO sitemap      | Auto-generated for search engines                                   |
| **robots.ts**      | SEO robots       | Controls crawler access                                             |

### Navigation Links Structure:

```typescript
// Section links (homepage sections)
const sectionLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Page links (dropdown menu)
const pageDropdownItems: NavLink[] = [
  { label: "All Projects", href: "/projects" },
  { label: "Contact Page", href: "/contact" },
];
```

### External Link Handling:

- **External links** use `external: true` flag
- Opens in new tab with `"noopener,noreferrer"` for security
- Navigation links are defined in `Header.tsx` with `NavLink` interface

### Project URLs (from Sanity Schema):

```typescript
// Live URL - public project link
{
  name: "liveUrl",
  title: "Live URL",
  type: "url",
  validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] })
}

// GitHub URL - source code repository
{
  name: "githubUrl",
  title: "GitHub URL",
  type: "url",
  validation: (Rule) => Rule.custom((url) => {
    if (!url.includes("github.com")) return "Must be a valid GitHub URL"
  })
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (for CMS)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local with Sanity credentials
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

### Running the Project

```bash
# Development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Sanity Studio

Access Sanity Studio at `/studio` route to manage:

- Projects (with live URLs and GitHub links)
- Services
- Other portfolio content

---

## 🎨 Key Components

### Header Component (`Header.tsx`)

- Fixed navbar with scroll progress indicator
- Theme toggle (dark/light)
- Navigation with active section highlighting
- Responsive mobile menu with hamburger icon
- Dropdown menu for additional pages
- Accessibility features (ARIA labels, keyboard navigation)

**Navigation Links Used:**

- Section anchors: `#about`, `#skills`, `#services`, `#projects`, `#contact`
- Page routes: `/projects`, `/contact`, `/`

### ThemeProvider (`ThemeProvider.tsx`)

- Context-based theme management
- Local storage persistence
- Light/Dark mode toggle

### Sections

- **Hero.tsx** - Main landing section with CTA
- **About.tsx** - Personal information
- **Skills.tsx** - Technical skills display
- **Services.tsx** - Services offered with animation
- **Projects.tsx** - Featured projects from Sanity
- **Contact.tsx** - Contact form section

### UI Components

- **AnimatedProjects.tsx** - Project cards with Framer Motion
- **AnimatedServices.tsx** - Service cards with animations
- **BackToTop.tsx** - Scroll to top button
- **BreadcrumbNav.tsx** - Navigation breadcrumbs

---

## 📊 Sanity CMS Integration

### Schemas

**Project Schema** (`project.ts`)

- Title, description, slug
- Featured image
- **liveUrl** - Deployed project link (http/https)
- **githubUrl** - Repository link (https only, GitHub domain check)
- Category, tags
- Publication status

**Service Schema** (`service.ts`)

- Title, description
- Icon/badge
- Order/priority

### Content Queries (`queries.ts`)

- GROQ queries for fetching projects, services, and skills
- Image URL optimization using Sanity image builder

---

## 📱 Responsive Design

- **Mobile:** Full vertical layout, hamburger menu, touch-optimized buttons
- **Tablet:** Optimized spacing, readable text
- **Desktop:** Multi-column layout, full navigation bar

---

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader support
- Focus indicators on all interactive elements
- Skip to main content link

---

## 📸 Screenshots

_Screenshots will be added here_ - Add your website screenshots:

- Homepage hero section
- Projects showcase
- Services section
- Mobile view
- Dark mode version
- Contact form

---

## 🔍 SEO Features

- **robots.ts** - Controls search engine crawling
- **sitemap.ts** - XML sitemap for indexing
- **Meta tags** - OpenGraph and Twitter card support
- **Structured data** - Schema.org markup
- **Mobile-first** - Mobile-optimized by default

---

## 📝 Environment Variables

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

# Optional
SANITY_API_TOKEN=xxxxx (for authenticated requests)
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub then connect to Vercel
# Vercel will auto-deploy on push
```

### Environment Setup for Production

1. Add Sanity environment variables to Vercel
2. Set production dataset in Sanity config
3. Configure custom domain
4. Enable automatic deployments

---

## 🐛 Troubleshooting

| Issue                      | Solution                                |
| -------------------------- | --------------------------------------- |
| Sanity content not loading | Check API credentials in .env.local     |
| Images not displaying      | Verify Sanity image URL configuration   |
| Theme not persisting       | Check localStorage and browser settings |
| Mobile menu not closing    | Verify menuRef and event listeners      |

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity CMS Docs](https://www.sanity.io/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📄 License

Private portfolio project.

---

**Last Updated:** April 21, 2026
