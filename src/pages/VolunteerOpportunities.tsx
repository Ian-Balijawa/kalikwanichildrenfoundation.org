import { ResourcePage } from '@/components/layout/ResourcePage';

export default function VolunteerOpportunities() {
  return (
    <ResourcePage
      title="Volunteer with us"
      intro="Share your time and skills to support children and communities in Kamuli."
      heading="Start a conversation with our team."
      message="Volunteer needs can change with our programs. Tell us about your interests and availability, and we can discuss where your skills may be useful."
      image="/images/IMG-20250624-WA0018.jpg"
      imageAlt="Children and community members holding learning materials outdoors"
      primary={{ label: 'Contact us about volunteering', to: '/contact' }}
      secondary={{ label: 'Explore our programs', to: '/programs' }}
    />
  );
}
