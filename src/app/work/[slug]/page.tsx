import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MONNET_CASE_STUDIES } from "@/data/monnetCaseStudies";
import { MonnetCaseStudyView } from "@/components/MonnetCaseStudyView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const base = MONNET_CASE_STUDIES.map((c) => ({
    slug: c.slug,
  }));
  return [...base, { slug: "kitch-os" }, { slug: "faware-os" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = slug === "kitch-os" || slug === "faware-os" ? "fin-score" : slug;
  const study = MONNET_CASE_STUDIES.find((c) => c.slug === targetSlug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} — Case Study | Muhammad Ahmed`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = slug === "kitch-os" || slug === "faware-os" ? "fin-score" : slug;
  const study = MONNET_CASE_STUDIES.find((c) => c.slug === targetSlug);

  if (!study) {
    notFound();
  }

  return <MonnetCaseStudyView study={study} />;
}
