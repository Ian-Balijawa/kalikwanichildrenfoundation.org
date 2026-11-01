import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExternalLink, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

const contactInfo = [
  {
    title: 'Main Office',
    address: 'Near Busota HC III, Kamuli - Jinja Rd.',
    city: 'Kamuli Municipality',
    country: 'Uganda',
    poBox: 'P.O. Box 124, Kamuli, Uganda',
    phones: ['+256 701 952 867', '+256 767 241 074', '+256 708 342 530', '+256 789 165 360'],
    email: 'kalikwani.csc2024@gmail.com',
  },
];

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'volunteer', label: 'Volunteer Opportunities' },
  { value: 'donation', label: 'Donation Information' },
  { value: 'partnership', label: 'Partnership Opportunities' },
  { value: 'media', label: 'Media Inquiry' },
];

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100091111111111',
    icon: <FaFacebook className="w-6 h-6" />,
  },
  {
    name: 'Twitter',
    url: 'https://x.com/KalikwaniChildrenFoundation',
    icon: <FaTwitter className="w-6 h-6" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/kalikwanichildrenfoundation/',
    icon: <FaInstagram className="w-6 h-6" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/kalikwanichildrenfoundation/',
    icon: <FaLinkedin className="w-6 h-6" />,
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/@kalikwanichildrenfoundation',
    icon: <FaYoutube className="w-6 h-6" />,
  },
];

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget as HTMLFormElement);
    const name = `${values.get('firstName') || ''} ${values.get('lastName') || ''}`.trim();
    const subject = `Website enquiry: ${values.get('inquiryType') || 'General enquiry'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${values.get('email') || ''}`,
      `Phone: ${values.get('phone') || 'Not provided'}`,
      '',
      String(values.get('message') || ''),
    ].join('\n');
    window.location.href = `mailto:kalikwani.csc2024@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Have questions about our programs or want to get involved? We'd love to hear from you.
            Reach out to us using the form below or through our contact information.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Type of Inquiry</Label>
                  <Select name="inquiryType">
                    <SelectTrigger aria-label="Type of inquiry">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Open Email to Send
                </Button>
                <p className="text-sm text-muted-foreground">
                  Your email app will open with your message ready to send.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="grid gap-6">
                  {contactInfo.map((office, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4">{office.title}</h3>
                        <div className="space-y-2 text-muted-foreground">
                          <p>{office.address}</p>
                          <p>{office.city}</p>
                          <p>{office.country}</p>
                          <p>{office.poBox}</p>
                          <div className="pt-4">
                            <strong>Phone:</strong>
                            {office.phones.map((phone, phoneIndex) =>
                              phoneIndex === 1 ? (
                                <a
                                  key={phoneIndex}
                                  href="https://api.whatsapp.com/send/?phone=%2B256767241074&text&type=phone_number&app_absent=0"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-primary underline"
                                >
                                  <FaWhatsapp className="inline-block" />
                                  {phone}
                                </a>
                              ) : (
                                <p key={phoneIndex}>{phone}</p>
                              ),
                            )}
                          </div>
                          <p>
                            <strong>Email:</strong> {office.email}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                <div className="rounded-2xl bg-muted p-7">
                  <MapPin className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                  <p className="font-semibold">Busota, Kamuli Municipality</p>
                  <p className="mt-1 text-muted-foreground">
                    Near Busota HC III, Kamuli - Jinja Rd., Uganda
                  </p>
                  <a
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4"
                    href="https://www.google.com/maps/search/?api=1&query=Busota+HC+III+Kamuli+Uganda"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-110"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
