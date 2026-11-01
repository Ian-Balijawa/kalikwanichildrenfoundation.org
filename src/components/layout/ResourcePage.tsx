import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type ResourcePageProps = {
  title: string;
  intro: string;
  heading: string;
  message: string;
  image?: string;
  imageAlt?: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
};

export function ResourcePage({
  title,
  intro,
  heading,
  message,
  image,
  imageAlt,
  primary,
  secondary,
}: ResourcePageProps) {
  return (
    <div>
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold">{title}</h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">{intro}</p>
        </div>
      </section>
      <section className="bg-[#fffdf8]">
        <div
          className={`container mx-auto grid items-center gap-10 ${image ? 'lg:grid-cols-2 lg:gap-20' : 'max-w-4xl'}`}
        >
          {image && (
            <img
              src={image}
              alt={imageAlt || ''}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover"
            />
          )}
          <div>
            <h2 className="text-3xl md:text-5xl">{heading}</h2>
            <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-muted-foreground">
              {message}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full px-6 shadow-none">
                <Link to={primary.to}>
                  {primary.label}
                  <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-6 shadow-none"
              >
                <Link to={secondary.to}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
