"use client";

import {
  ArrowRight,
  Briefcase,
  Code2,
  Cpu,
  GitBranch,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  academicProjects,
  contactLinks,
  academicProject,
  exploredTech,
  featuredProject,
  flaskProject,
  journey,
  leetcodeProject,
  machineLearningProject,
  mlImage,
  mlTopics,
  navItems,
  presentations,
  profileImage,
  projectCollection,
  services,
  skillGroups,
  whatsappNumber,
} from "@/data/site";

function ProjectActions({ project }: { project: { github?: string | null; demo?: string | null } }) {
  return (
    <div className="mt-auto flex w-full flex-wrap gap-3 pt-5">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40">
          <GitBranch size={15} /> GitHub
        </a>
      ) : (
        <span className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200" aria-disabled="true">
          <GitBranch size={15} /> GitHub
        </span>
      )}
      {project.demo ? (
        <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:border-cyan-300">
          Demo <ArrowRight size={15} />
        </a>
      ) : (
        <span className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200" aria-disabled="true">
          Demo <ArrowRight size={15} />
        </span>
      )}
    </div>
  );
}

function PresentationActions({ presentation }: { presentation: { viewUrl?: string | null; watchUrl?: string | null } }) {
  return (
    <div className="mt-auto flex w-full flex-wrap gap-3 pt-5">
      {presentation.viewUrl ? (
        <a href={presentation.viewUrl} target="_blank" rel="noreferrer" className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40">
          View Presentation
        </a>
      ) : (
        <span className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200" aria-disabled="true">
          View Presentation
        </span>
      )}
      {presentation.watchUrl ? (
        <a href={presentation.watchUrl} target="_blank" rel="noreferrer" className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:border-cyan-300">
          Watch Presentation
        </a>
      ) : (
        <span className="inline-flex min-w-0 flex-1 basis-0 items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200" aria-disabled="true">
          Watch Presentation
        </span>
      )}
    </div>
  );
}

export function PortfolioPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [titleText, setTitleText] = useState("AI Developer");
  const [isSending, setIsSending] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const themeHydrated = useRef(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("essam-theme");
    const frame = window.requestAnimationFrame(() => {
      if (savedTheme === "light") {
        setDarkMode(false);
      }
      themeHydrated.current = true;
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (themeHydrated.current) {
      window.localStorage.setItem("essam-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    sections.forEach((section) => section.classList.add("reveal-section"));

    if (reducedMotion) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    let deleting = false;
    let index = "AI Developer".length;
    let holdTicks = 0;

    const interval = window.setInterval(() => {
      if (holdTicks > 0) {
        holdTicks -= 1;
        return;
      }

      if (!deleting) {
        index -= 1;
        setTitleText("AI Developer".slice(0, index));
        if (index === 0) {
          deleting = true;
          holdTicks = 7;
        }
        return;
      }

      index += 1;
      setTitleText("AI Developer".slice(0, index));
      if (index === "AI Developer".length) {
        deleting = false;
        holdTicks = 14;
      }
    }, 90);

    return () => window.clearInterval(interval);
  }, []);

  const whatsappDefaultMessage = useMemo(
    () => encodeURIComponent("Hi Essam, I’d like to discuss a project with you."),
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.reportValidity();
      return;
    }

    setIsSending(true);
    setSubmissionStatus("idle");

    try {
      const response = await fetch("/MyPortfolio/api/contact", {
        method: "POST",
        headers: { "Content-Type": "/MyPortfolio/application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Contact submission failed");
      }

      form.reset();
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`theme-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="min-h-screen bg-[#050A18] text-slate-200 transition-colors">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(24,216,210,0.12),transparent_40%)]" />
        <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050A18]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="#top" className="flex items-center gap-3 text-sm font-medium tracking-[0.22em] text-slate-100 uppercase">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-400/10 text-xs font-bold text-cyan-300">E</span>
              <span>Essam Mohamed</span>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-cyan-300">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
                onClick={() => setDarkMode((value) => !value)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                type="button"
                aria-label="Open mobile navigation"
                onClick={() => setMobileNavOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 md:hidden"
              >
                <Menu size={16} />
              </button>
            </div>
          </div>

          {mobileNavOpen && (
            <div className="border-t border-white/10 bg-[#050A18] md:hidden">
              <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-slate-200">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)} className="py-1 hover:text-cyan-300">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        <main id="top" className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <section className="pb-16 pt-10 md:pb-20">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="overflow-hidden rounded-[2rem] border border-cyan-400/25 bg-[#0A1124]/80 p-3 shadow-[0_0_30px_rgba(24,216,210,0.12)]">
                  <div className="relative h-[260px] w-[220px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(19,33,55,0.8),_rgba(7,12,20,0.95))]">
                    <Image src={profileImage} alt="Essam Mohamed portrait" fill className="object-cover" priority />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Essam Mohamed</h1>
                <p className="typewriter-title text-lg font-medium tracking-[0.22em] text-cyan-300 uppercase" aria-label="AI Developer">
                  <span>{titleText}</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                Open to Opportunities
              </div>
            </div>
          </section>

          <section id="about" className="scroll-mt-24 py-10 md:py-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">About Me</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-[#081120]/80 p-6 shadow-[0_0_25px_rgba(15,23,42,0.35)]">
                <p className="supporting-copy text-sm leading-7 text-slate-300">
                  I’m Essam, an AI Developer with a strong foundation in Python and hands-on experience in data, automation, web scraping, and Machine Learning.<br /><br />
                  I learn by understanding problems, building practical solutions, and applying what I learn through real projects.
                  I’m currently developing my Machine Learning skills through DEPI, while preparing for my next step into C# and .NET Backend Development.</p>
              </div>

              <div className="mindset-card rounded-2xl border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.8),rgba(8,15,27,0.95))] p-5">
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <span>Mindset</span>
                  <Sparkles size={14} />
                </div>
                <div className="supporting-copy space-y-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2"><span>Understand</span><ArrowRight size={14} className="text-cyan-300" /></div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2"><span>Build</span><ArrowRight size={14} className="text-cyan-300" /></div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2"><span>Solve</span><ArrowRight size={14} className="text-cyan-300" /></div>
                  <div className="flex items-center justify-between"><span>Document</span><ArrowRight size={14} className="text-cyan-300" /></div>
                </div>
              </div>
            </div>
          </section>

          <section id="journey" className="scroll-mt-24 py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Journey</h2>
            </div>

            <div className="relative mx-auto max-w-4xl">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/60 via-cyan-400/30 to-transparent md:block" />
              <div className="space-y-6 md:space-y-8">
                {journey.map((item) => (
                  <div key={item.title} className={`relative md:grid md:grid-cols-2 ${item.side === "left" ? "md:[&>*:first-child]:col-start-1" : "md:[&>*:first-child]:col-start-2"}`}>
                    <div className={`rounded-2xl border border-white/10 bg-[#091226]/80 p-5 shadow-[0_0_25px_rgba(15,23,42,0.32)] ${item.side === "left" ? "md:mr-8 md:text-right" : "md:ml-8"}`}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                        <h3 className="text-lg font-medium text-slate-100">{item.title}</h3>
                      </div>
                      <p className="supporting-copy text-sm leading-6 text-slate-300">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                        {item.stack.map((tag) => (
                          <span key={tag} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2 py-1">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:block" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">What I Can Build</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "Python Development", desc: "Robust scripts, automation, and backend-focused logic for practical use cases.", icon: <Code2 size={18} />, tags: ["Python", "OOP", "Automation"] },
                { title: "Data Processing", desc: "Clean, transform, and structure information for analysis and operations.", icon: <Cpu size={18} />, tags: ["Pandas", "NumPy", "ETL"] },
                { title: "Web Scraping & Automation", desc: "Collect data and streamline repetitive workflows with reliable automation.", icon: <span className="text-lg">◎</span>, tags: ["BeautifulSoup", "Selenium", "Playwright"] },
                { title: "Machine Learning", desc: "Experiment with ML pipelines, feature handling, and model evaluation.", icon: <Sparkles size={18} />, tags: ["Sklearn", "Regression", "Classification"] },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#091226]/80 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300">{item.icon}</div>
                  <h3 className="mb-2 text-lg font-medium text-slate-100">{item.title}</h3>
                  <p className="supporting-copy mb-4 text-sm leading-6 text-slate-300">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="services" className="scroll-mt-24 py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Freelance Services</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#091226]/80 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(24,216,210,0.08)]">
                  <div className="h-40 border-b border-white/10 bg-[#050d1c]">
                    <Image src={service.image} alt={service.title} width={600} height={400} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-5">
                    <div>
                      <h3 className="text-xl font-medium text-slate-100">{service.title}</h3>
                      <p className="supporting-copy mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
                    </div>

                    <div>
                      <p className="meta-copy mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-400">Includes</p>
                      <ul className="supporting-copy space-y-2 text-sm text-slate-300">
                        {service.included.map((item) => (
                          <li key={item} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="meta-copy mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-400">Tools</p>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                        {service.tools.map((tool) => (
                          <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto border-t border-white/10 pt-4">
                      <div className="mx-auto w-full max-w-[13rem] rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-0.5 text-center">
                        <p className="meta-copy text-[10px] leading-3 uppercase tracking-[0.22em] text-slate-400">Starting at</p>
                        <div className="text-lg font-medium leading-5 text-slate-100">{service.price}</div>
                      </div>

                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/15"
                      >
                        Request This Service
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-24 py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Featured Project</h2>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#091226]/80">
              <div className="grid gap-6 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-6">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#06111d]">
                  <Image src={featuredProject.image} alt={featuredProject.title} width={1200} height={800} className="h-full w-full object-cover" />
                </div>
                <div className="flex h-full flex-col justify-center p-2">
                  <h3 className="text-2xl font-medium text-slate-100">{featuredProject.title}</h3>
                  <p className="supporting-copy mt-3 text-sm leading-6 text-slate-300">{featuredProject.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                    {featuredProject.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{tech}</span>
                    ))}
                  </div>
                  <ProjectActions project={featuredProject} />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Web Scraping & Automation</h3>
              </div>

              <div className="grid items-stretch gap-5 md:grid-cols-3">
                {projectCollection.map((project) => (
                  <article key={project.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#091226]/80">
                    <div className="h-40 border-b border-white/10">
                      <Image src={project.image} alt={project.title} width={700} height={480} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h4 className="text-lg font-medium text-slate-100">{project.title}</h4>
                      <p className="supporting-copy mt-2 text-sm leading-6 text-slate-300">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{tech}</span>
                        ))}
                      </div>
                      <ProjectActions project={project} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#091226]/80 p-5 md:p-6">
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#06111d]">
                  <Image src={flaskProject.image} alt={flaskProject.title} width={1000} height={700} className="h-full w-full object-cover" />
                </div>
                <div className="flex h-full flex-col justify-center">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                    <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Flask Project</h3>
                  </div>
                  <h4 className="text-2xl font-medium text-slate-100">{flaskProject.title}</h4>
                  <p className="supporting-copy mt-3 text-sm leading-6 text-slate-300">{flaskProject.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                    {flaskProject.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{tech}</span>
                    ))}
                  </div>
                  <ProjectActions project={flaskProject} />
                </div>
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Machine Learning — Practical Work</h2>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#091226]/80 p-5 md:p-6">
              <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#06111d]">
                  <Image src={mlImage} alt="Machine learning learning lab" width={900} height={700} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="my-3 text-xs leading-relaxed text-slate-300">{machineLearningProject.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                    {mlTopics.map((topic) => (
                      <span key={topic} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{topic}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                    {['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'].map((tool) => (
                      <span key={tool} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2 py-1">{tool}</span>
                    ))}
                  </div>
                  <ProjectActions project={machineLearningProject} />
                </div>
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Problem Solving</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#091226]/80 p-5 md:p-6">
              <p className="supporting-copy max-w-3xl text-sm leading-7 text-slate-300">
                Solved problems with explanations, focusing on data structures, and breaking problems into smaller steps.</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-cyan-200">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">LeetCode</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">25 solved problems</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Algorithms</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Data Structures</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ProjectActions project={leetcodeProject} />
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Academic Programming Projects</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {academicProjects.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[#091226]/80 p-4 text-sm text-slate-300">{item}</div>
              ))}
            </div>
            <ProjectActions project={academicProject} />
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Technical Communication</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {presentations.map((presentation) => (
                <article key={presentation.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#091226]/80">
                  <div className="h-52 border-b border-white/10">
                    <Image src={presentation.image} alt={presentation.title} width={900} height={560} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-medium text-slate-100">{presentation.title}</h3>
                    <p className="supporting-copy mt-2 text-sm leading-6 text-slate-300">{presentation.description}</p>
                    <PresentationActions presentation={presentation} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="scroll-mt-24 py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Technical Skills</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-white/10 bg-[#091226]/80 p-5">
                  <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-200">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Currently Learning</h2>
            </div>

            <div className="rounded-2xl border border-cyan-400/15 bg-[#091226]/80 p-5 md:p-6">
              <div className="relative grid gap-6 md:grid-cols-3 md:gap-0">
                <div className="relative md:pr-6">
                  <span className="mb-3 inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current focus</p>
                  <p className="mt-2 text-lg text-slate-100">Machine Learning</p>
                </div>
                <div className="relative border-t border-white/10 pt-5 md:border-l md:border-t-0 md:px-6 md:pt-0">
                  <span className="mb-3 inline-flex h-2 w-2 rounded-full bg-cyan-300/80" />
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Program</p>
                  <p className="supporting-copy mt-2 text-sm leading-6 text-slate-300">Microsoft Machine Learning Engineer Scholarship — DEPI</p>
                </div>
                <div className="relative border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <span className="mb-3 inline-flex h-2 w-2 rounded-full bg-cyan-300/60" />
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Backend path</p>
                  <p className="supporting-copy mt-2 text-sm leading-6 text-slate-300">C# → SQL / Databases → .NET</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Technologies I&apos;ve Explored</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#091226]/50 p-4 md:p-5">
              <div className="flex flex-wrap gap-2">
                {exploredTech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.15em] text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200">{tech}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Education & Milestones</h2>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-[#091226]/80 p-5 pl-8 md:p-6 md:pl-10">
              <span className="absolute bottom-6 left-5 top-6 w-px bg-cyan-400/30 md:left-6" />
              <span className="absolute left-[17px] top-8 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)] md:left-[21px]" />
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Faculty of Science, Damanhour University</p>
              <p className="mt-3 text-xl font-medium text-slate-100">B.Sc. in Computer Science</p>
              <p className="supporting-copy mt-2 text-sm text-slate-300">2024 – Expected 2028</p>
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">What I&apos;m Exploring</h2>
            </div>

            <div className="relative grid gap-4 md:grid-cols-3 md:gap-5">
              <div className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-cyan-400/25 md:block" />
              {[
                "Machine Learning + AI",
                "C# + .NET + Backend Development",
                "Backend Systems + AI",
              ].map((item) => (
                <div key={item} className="relative rounded-2xl border border-white/10 bg-[#091226]/80 p-5 text-center text-lg font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400/30">
                  <span className="mx-auto mb-4 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                  <span className="block">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">What&apos;s Next?</h2>
            </div>

            <div className="rounded-2xl border border-cyan-400/15 bg-[#091226]/80 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                <p className="max-w-3xl text-sm leading-7 text-slate-300">
                  NOW: Strengthen Machine Learning and Python.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-400/15 bg-[#091226]/80 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                <p className="max-w-3xl text-sm leading-7 text-slate-300">
                  NEXT: Build with C#, SQL/Databases, and .NET.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-400/15 bg-[#091226]/80 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
                <p className="max-w-3xl text-sm leading-7 text-slate-300">
                  LONG TERM: Combine Backend Development and AI.
                </p>
              </div>
            </div>
          </section>

          <section id="contact" className="scroll-mt-24 py-10 md:py-14">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Let&apos;s Build Something Useful</h2>
            </div>


            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-[#091226]/80 p-5 md:p-6">
                <div className="shrink-0 grid grid-cols-2 gap-x-4 gap-y-5 text-sm text-slate-300 md:grid-cols-[1fr_1fr_1fr_1.2fr] md:items-center md:gap-3">
                  <div className="flex min-w-0 items-center justify-center gap-2 md:justify-center">
                    <GitBranch size={16} className="text-cyan-300" />
                    <a href={contactLinks.github} target="_blank" rel="noreferrer" className="hover:text-cyan-300">GitHub</a>
                  </div>
                  <div className="flex min-w-0 items-center justify-center gap-2 md:justify-center">
                    <Briefcase size={16} className="text-cyan-300" />
                    <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-300">LinkedIn</a>
                  </div>
                  <div className="flex min-w-0 items-center justify-center gap-2 md:justify-center">
                    <Mail size={16} className="text-cyan-300" />
                    <a href={contactLinks.email} className="truncate hover:text-cyan-300">Email</a>
                  </div>
                  <div className="flex min-w-0 items-center justify-center gap-2 md:justify-center">
                    <MessageCircle size={16} className="text-cyan-300" />
                    <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-cyan-300">WhatsApp</a>
                  </div>
                </div>
                <div className="mt-8 flex min-h-64 flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#050d1c]">
                  <div className="shrink-0 border-b border-white/10 px-3 py-2">
                    <p className="meta-copy text-slate-400"> Egypt- Alex </p>
                  </div>
                  <div className="flex min-h-0 flex-1 w-full">
                    <iframe
                      title="Location map placeholder"
                      src="https://maps.google.com/maps?q=31.2000924,29.9187387&z=12&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                    />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#091226]/80 p-5 md:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-300">
                    <span>Name</span>
                    <input name="name" required className="w-full rounded-xl border border-white/10 bg-[#050d1c] px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/40" />
                  </label>

                  <label className="space-y-2 text-sm text-slate-300">
                    <span>Email</span>
                    <input type="email" name="email" required className="w-full rounded-xl border border-white/10 bg-[#050d1c] px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/40" />
                  </label>
                </div>

                <label className="mt-5 block space-y-2 text-sm text-slate-300">
                  <span>Subject / Project</span>
                  <input name="subject" required className="w-full rounded-xl border border-white/10 bg-[#050d1c] px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/40" />
                </label>

                <label className="mt-5 block space-y-2 text-sm text-slate-300">
                  <span>Message</span>
                  <textarea name="message" required rows={6} className="w-full rounded-xl border border-white/10 bg-[#050d1c] px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/40" />
                </label>

                <div className="mt-6 flex justify-center">
                  <button type="submit" disabled={isSending} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/15">
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {submissionStatus === "success" ? (
                  <p role="status" className="mt-4 text-center text-sm text-cyan-200">Message sent successfully. I&apos;ll get back to you soon.</p>
                ) : null}
                {submissionStatus === "error" ? (
                  <p role="alert" className="mt-4 text-center text-sm text-red-300">Something went wrong. Please try again or contact me directly.</p>
                ) : null}
              </form>
            </div>
          </section>
        </main>

        <footer className="site-footer border-t border-white/10 px-4 py-6 text-center text-sm text-slate-400">
          © 2026 Essam Mohamed. All rights reserved.
        </footer>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappDefaultMessage}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.45)] transition hover:scale-105"
          aria-label="Open WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
}
