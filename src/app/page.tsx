import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { landingPageContent } from '@/data/landing-page';

export default function LandingPage() {
  const { hero, features, proof, cta, footer } = landingPageContent;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. HEADER */}
      <Header />

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="container mx-auto grid grid-cols-1 gap-12 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-32 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                {hero.badge}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl text-foreground">
                {hero.title.line1} <br />
                <span className="text-primary">{hero.title.highlight}</span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                {hero.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
                  {hero.primaryCta} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 gap-2">
                  {hero.secondaryCta}
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p>{hero.trustedBy}</p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-xl border bg-linear-to-br from-muted/50 to-muted/10 p-4 shadow-lg ring-1 ring-border/50">
              {/* Hero Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/hero-dashboard.png"
                  alt="Monetra Dashboard Interface"
                  width={800}
                  height={800}
                  className="object-contain drop-shadow-2xl dark:invert-[0.1]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="features" className="container mx-auto px-4 py-24 sm:px-8 border-t bg-muted/30">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {features.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {features.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.items.map((item) => (
              <Card key={item.title} className="bg-background/80 backdrop-blur-sm border-muted transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. VALUE / PROOF SECTION */}
        <section className="container mx-auto px-4 py-24 sm:px-8">
          <div className="rounded-3xl border bg-card p-8 md:p-12 lg:p-16 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>

            <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {proof.heading}
                </h3>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {proof.description}
                </p>
                <div className="mt-8">
                  <Button variant="outline" className="gap-2">
                    {proof.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2">
                {proof.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="border-t bg-muted/20">
          <div className="container mx-auto px-4 py-24 sm:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {cta.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-[600px] text-lg text-muted-foreground">
              {cta.description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-8 h-12 text-base">{cta.primaryButton}</Button>
              <Button variant="outline" size="lg" className="px-8 h-12 text-base">{cta.secondaryButton}</Button>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="border-t py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight block">Monetra</span>
                <p className="text-xs text-muted-foreground">{footer.tagline}</p>
              </div>
            </div>

            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              {footer.links.company.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>{footer.copyright}</p>
            <div className="flex gap-4">
              {footer.links.legal.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
