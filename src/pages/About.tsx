import { useState } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Block = string | { list: string[] };

type Profile = {
  name: string;
  role: string;
  image: string;
  headline?: string;
  intro: string;
  body: Block[];
};

const coreValues = [
  {
    title: 'Compassion',
    description:
      'We are driven by a deep sense of empathy and a genuine desire to alleviate suffering and bring hope to the vulnerable.',
  },
  {
    title: 'Integrity',
    description:
      'We uphold the highest standards of transparency, accountability, and ethical conduct in all our endeavors.',
  },
  {
    title: 'Empowerment',
    description:
      'We believe in empowering children with the tools, knowledge, and skills they need to become self-reliant and create their own futures.',
  },
  {
    title: 'Collaboration',
    description:
      'We actively seek partnerships with like-minded individuals, organizations, and communities to amplify our impact.',
  },
  {
    title: 'Inclusivity',
    description:
      'We embrace diversity and ensure that every child, regardless of their background, feels valued, respected, and included.',
  },
  {
    title: 'Advocacy',
    description:
      'We are committed to being a voice for the voiceless, raising awareness about the challenges faced by vulnerable children.',
  },
];

const founder = {
  name: 'Samuel Mwesigwa Kalikwani',
  role: 'Founder & Director',
  image: '/team/samuel-mwesigwa.jpg',
  lead: "Welcome to Kalikwani Children's Support Centre (KCSC). I am Samuel Mwesigwa, Director and CEO of this organisation, and I am honoured to lead an initiative committed to empowering vulnerable children, strengthening families and transforming communities.",
  stats: [
    { value: '250', label: 'Beneficiaries reached' },
    { value: '2', label: 'Districts served' },
  ],
  paragraphs: [
    'At Kalikwani, we believe every child deserves an opportunity to learn, grow, develop their potential and build a better future, regardless of their background or circumstances. Our work is founded on the belief that education, empowerment, compassion and community support are essential to creating lasting change.',
    'Through our programmes and partnerships, we work to improve the lives of vulnerable children and families across Kamuli and Kaliro Districts in Eastern Uganda. Our initiatives focus on education support, child protection, health and hygiene promotion, vocational skills development and community empowerment. Today, our work reaches approximately 250 beneficiaries, reflecting our continued commitment to making a meaningful difference in the communities we serve.',
    'Our vision extends beyond providing immediate assistance. We aspire to create sustainable opportunities that enable children and young people to become confident, skilled and independent individuals. We are also committed to strengthening community support systems and creating safer, more supportive environments where every child has the opportunity to thrive.',
    "To advance this mission, we welcome partnerships and support from individuals, institutions, foundations and organisations that share our commitment to improving children's lives.",
  ],
  supportTitle: 'Your support can help us to:',
  support: [
    'Expand access to quality education through school development, learning materials and educational support.',
    'Establish and strengthen vocational skills training opportunities for young people.',
    'Improve access to essential healthcare, hygiene and community-based support services.',
    'Strengthen child protection initiatives and provide safe, supportive environments for vulnerable children.',
    'Empower families and communities through sustainable development initiatives.',
  ],
  closing: [
    'I firmly believe that meaningful change is achieved through collective effort. By working together with committed partners, volunteers, donors and communities, we can break cycles of vulnerability, unlock opportunities and build a brighter future for the next generation.',
  ],
  tagline: 'Together, let us empower children, transform lives and create lasting hope.',
  thanks: 'Thank you for being part of our journey.',
};

const directors: Profile[] = [
  {
    name: 'Ivan Waiswa',
    role: 'Director & Chief Advisor',
    image: '/team/Ivan-Waiswa-Advisor-Kalikwani-Childrens-Foundation-683x1024.png',
    intro:
      "Dear friends and supporters, As Director and Chief Advisor of Kalikwani Children's Support Centre, I'm privileged to lead a team of dedicated individuals who share a common vision: to create a brighter future for vulnerable children and teenagers.",
    body: [
      "Our journey began with a simple yet powerful idea: that every child deserves access to quality education, healthcare, and a loving home. Today, we're proud to have made a significant impact in the lives of over 50 children, with many more waiting to benefit from our programs. But our work is far from over.",
      "We need your support to expand our initiatives, to reach more children, and to create a lasting legacy of hope. As a director and chief advisor, I've seen the power of collaboration and the impact of your donations.",
      "Let us work together to build a future where every child can thrive, where every teenager can access the skills and resources they need to succeed. Your donation is an investment in a child's future, a chance to break the cycle of poverty and create a brighter tomorrow. Join us in shaping a better world, one child at a time. Thank you!",
    ],
  },
  {
    name: 'Jeremiah Buyinza',
    role: 'Director & Permanent Secretary',
    image: '/team/Jeremiah-Buyinza.png',
    intro:
      "I'm Jeremiah Buyinza, Director and Permanent Secretary of Kalikwani Children's Support Centre. It's a privilege to serve this noble organization dedicated to transforming the lives of vulnerable children and teenagers.",
    body: [
      "As Permanent Secretary, I've witnessed firsthand the impact of our programs. We've empowered over 50 children to access education, and countless teenagers have benefited from our skills and empowerment programs. But our work is far from over. We have a vision to expand our reach, opening new schools, hospitals, and homes for those who need it most. We require resources and support to make this vision a reality.",
      'I urge you to join us in this noble endeavor. Your donation will help us:',
      {
        list: [
          'Build new classrooms and educational facilities',
          'Establish healthcare services and hospitals',
          'Provide safe homes and orphanages for homeless children',
          'Empower teenagers with skills and mentorship',
        ],
      },
      'Together, we can create a brighter future for these young lives. Let us unite to break the cycle of poverty and create a legacy of hope. Thank you for your support. Together, we can make a difference!',
    ],
  },
  {
    name: 'Benjamin Musasizi',
    role: 'Head of Finance & Administration',
    image: '/team/IMG-20240708-WA0001.jpg',
    intro:
      "Dear esteemed guests and supporters, Am Benjamin Musasizi, As the Head of Finance and Administration at Kalikwani Children's Support Centre, I'm responsible for ensuring that our resources are allocated efficiently and effectively to support our mission.",
    body: [
      "I'm proud to report that our financial management has been prudent and transparent, allowing us to maximize the impact of your donations. Every shilling, every dollar, has been invested in creating a brighter future for the children and teenagers under our care.",
      'Our financial sustainability is crucial to the longevity of our programs. Your support has enabled us to:',
      {
        list: [
          'Build a robust financial framework',
          'Invest in essential infrastructure',
          'Develop a skilled and dedicated team',
        ],
      },
      "I urge you to continue supporting our cause, knowing that your donation is a sound investment in the future of these young lives. Together, let's build a financially sustainable organization that can continue to transform lives for generations to come. Thank you for your trust and support.",
    ],
  },
];

const advisors: Profile[] = [
  {
    name: 'Anthony Zammit',
    role: 'Board Advisor for International Development',
    image: '/team/anthony-zammit.jpg',
    intro:
      "I'm Anthony Zammit, I am proud to be a board member of Kalikwani Children's Support Centre. It's a blessing to be accepted into such a proficient organization in such an important endeavour.",
    body: [
      'Dear friend,',
      "Someone, once said 'Give a fishing rod to a person and he will have food for the rest of his life.  I confess with you that I tried it when I was working in Peru but it never worked because one has to be a fisherman to fish, otherwise he will sell the fishing rod to the first buyer he finds, only to buy some rice with.  I tried it and failed with the chicken pens, I even gave a sewing machine to a promising lady. She sold it. I kind of gave up with them, and I focused on children, creating schools to make them fishermen before I give them the rod, make them farmers before I give them chicken coops, educate them in business and self-esteem before I give them any machine. This is why I created a school in Peru and this is why I am interested to become a member of this group.  Their ideas and motivations are on track. I hope that I will be able to join them in Uganda as I presently live in Malta, my home land. I am 69 years old.",
      "Our hope is to one day soon, become self sufficient and do not have to depend on any donations but it takes money to start, to build, to become self-reliant.  The whole of Africa, is 'Waking Up' and I am thrilled to be part of all this at this 'very special time in history'. Would YOU like to also be part of it? If you are a company and decide to help us financially, we as an NGO would be able to sign your tax exempt papers. Talk to us, we have many projects laid down to take life! These projects when they become active will give us tools, will give us books, new educational equipment and new life to so many, many students and poor families.  Help us erase the word 'poverty' and change it with dignity. Help us build a small but essential sanitary pad station for so many young ladies, a bee hive to make honey to sell and to give to the children, and so much more! Let us dedicate a project to you and put you on our history books of Kalikwani Children Support Centre.",
      'Be Blessed\nAnthony Zammit',
    ],
  },
];

const staff: Profile[] = [
  {
    name: 'Jonathan Ndada',
    role: 'Community Mobilizer',
    image: '/team/staff-856x1024.png',
    headline: 'Unlocking Potential, Unbridling Hope',
    intro:
      "On this digital platform, I stand with pride, representing the Kalikwani Children's Support Centre. Our journey has been a testament to the transformative power of community and compassion.",
    body: [
      'We have witnessed the resilience of young hearts, the determination of young minds, and the beauty of young souls. We have seen hope kindled, dreams ignited, and futures reshaped.',
      'Our mission is to nurture, to educate, and to empower. We strive to create a world where every child can laugh, learn, and thrive. A world where every child can become the master of their destiny.',
      'Together, let us break down barriers, let us bridge gaps, and let us build a brighter tomorrow. Let us unlock the potential within each child, and let us unbridle the hope that resides in every young heart.',
      'Join us in this noble endeavor. Let us write a new chapter in the story of Kalikwani, a chapter of triumph, of joy, and of unlimited possibility. Thank you.',
    ],
  },
];

function ProfileCard({
  profile,
  onReadMore,
}: {
  profile: Profile;
  onReadMore: (profile: Profile) => void;
}) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={profile.image}
          alt={profile.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-20">
          <h3 className="text-xl font-bold leading-tight text-white">{profile.name}</h3>
          <p className="mt-1 text-sm font-medium text-white/85">{profile.role}</p>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col p-5">
        {profile.headline && <p className="mb-2 font-semibold text-primary">{profile.headline}</p>}
        <p className="line-clamp-4 leading-relaxed text-muted-foreground">{profile.intro}</p>
        <div className="mt-auto pt-5">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onReadMore(profile)}
          >
            Read more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileGrid({
  profiles,
  onReadMore,
}: {
  profiles: Profile[];
  onReadMore: (profile: Profile) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {profiles.map((profile) => (
        <div
          key={profile.name}
          className="w-full sm:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)]"
        >
          <ProfileCard profile={profile} onReadMore={onReadMore} />
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const [active, setActive] = useState<Profile | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            About Kalikwani Children's Support Centre (KCSC)
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Kalikwani Children's Support Centre (KCSC) is a non-profit charitable foundation
            dedicated to creating positive change in the lives of vulnerable children and teenagers
            in Kamuli, Uganda.
          </p>
          <nav aria-label="On this page" className="mt-9 flex flex-wrap justify-center gap-2">
            <a
              href="#our-story"
              className="rounded-full border border-[#b9c9b7] px-4 py-2 text-sm font-semibold text-primary hover:bg-white"
            >
              Our story
            </a>
            <a
              href="#our-values"
              className="rounded-full border border-[#b9c9b7] px-4 py-2 text-sm font-semibold text-primary hover:bg-white"
            >
              Our values
            </a>
            <a
              href="#our-team"
              className="rounded-full border border-[#b9c9b7] px-4 py-2 text-sm font-semibold text-primary hover:bg-white"
            >
              Our team
            </a>
          </nav>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                Our vision is a society where every child, regardless of their circumstances, has
                equal opportunities to thrive, grow and reach their full potential.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To create a safe nurturing environment for teenagers, vulnerable and homeless
                children, providing them with access to education, shelter, life skills and advocacy
                support, enabling them to break the cycle of poverty and build a better future for
                themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="our-story" className="scroll-mt-24 py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              At the heart of our foundation lies a personal story of resilience and determination.
              The founders lost their beloved mother at a tender age. Left with a void that could
              not be easily filled, they faced numerous challenges and uncertainties. Their dreams
              seemed unreachable as their father, retired from his electrician job, struggled to
              make ends meet. Unfortunately, he also passed away a few years after his retirement.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              In the face of adversity, the brothers found support and solace in their big brother,
              who selflessly sacrificed his own education to ensure that they had a chance at a
              brighter future. This act of love and sacrifice became the foundation of their
              resolution to make a difference in the lives of other children facing similar
              obstacles.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Driven by their personal journey and a deep sense of gratitude, they embarked on a
              mission to establish the Kalikwani Children's Support Centre. With unwavering
              commitment and an unyielding spirit, they focused on providing hope and empowerment to
              teenagers, vulnerable children, and those facing homelessness in our community.
            </p>
            <p className="text-lg text-muted-foreground">
              Kalikwani Children's Support Centre is dedicated to all people with the spirit of
              compassion with humility and all people are free to join it irrespective of any kind
              of discrimination, amongst others including religion, tribe, region, race, gender,
              color, status in society, and level of education.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="our-values" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="our-team" className="scroll-mt-24 py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Photo and stats */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -inset-3 rounded-3xl bg-primary/10 -rotate-2" />
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="max-w-md mx-auto mt-8 text-center lg:text-left">
                <h3 className="text-3xl font-bold">{founder.name}</h3>
                <span className="inline-block mt-3 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                  {founder.role}
                </span>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {founder.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border bg-background p-4 text-center"
                    >
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl md:text-4xl">A message from our founder</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium">{founder.lead}</p>

              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                {founder.paragraphs.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>

              <Card className="bg-background border-0">
                <CardHeader>
                  <CardTitle className="text-xl">{founder.supportTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {founder.support.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                {founder.closing.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>

              <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
                <p className="text-xl font-semibold">{founder.tagline}</p>
                <p className="mt-2 opacity-90">{founder.thanks}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Directors</h2>
          <ProfileGrid profiles={directors} onReadMore={setActive} />
        </div>
      </section>

      {/* Board Advisor */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Board Advisor for International Development
          </h2>
          <ProfileGrid profiles={advisors} onReadMore={setActive} />
        </div>
      </section>

      {/* Staff */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Staff</h2>
          <ProfileGrid profiles={staff} onReadMore={setActive} />
        </div>
      </section>

      {/* Profile dialog */}
      <Dialog open={!!active} onOpenChange={(isOpen) => !isOpen && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="text-left">
                    <DialogTitle className="text-2xl">{active.name}</DialogTitle>
                    <DialogDescription className="font-semibold text-primary">
                      {active.role}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 leading-relaxed text-muted-foreground">
                {active.headline && (
                  <p className="text-lg font-semibold text-foreground">{active.headline}</p>
                )}
                <blockquote className="border-l-4 border-primary/40 pl-4 italic">
                  {active.intro}
                </blockquote>
                {active.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i} className="whitespace-pre-line">
                      {block}
                    </p>
                  ) : (
                    <ul key={i} className="space-y-2">
                      {block.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
