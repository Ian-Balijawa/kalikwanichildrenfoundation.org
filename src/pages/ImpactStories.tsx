import { ResourcePage } from '@/components/layout/ResourcePage';

export default function ImpactStories() {
  return (
    <ResourcePage
      title="Impact stories"
      intro="The people and communities behind our work matter most."
      heading="A closer look at our community."
      message="Individual stories are not available on this page yet. Explore the gallery to see moments from our work, or learn how our programs support children and families."
      image="/images/IMG-20250123-WA0039.jpg"
      imageAlt="Children and community members standing together outdoors"
      primary={{ label: 'View gallery', to: '/gallery' }}
      secondary={{ label: 'Our programs', to: '/programs' }}
    />
  );
}
