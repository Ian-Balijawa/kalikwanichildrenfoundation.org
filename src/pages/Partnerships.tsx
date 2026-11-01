import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Partnerships() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">Partnership</h1>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            We value meaningful partnerships that enable us to transform the lives of children and
            communities. Through collaboration with international organizations, schools,
            volunteers, and well-wishers, we continue to expand our impact and create lasting
            change.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="w-full">
              <img
                src="/partnership.jpg"
                alt="Partnership"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Home Stay & Volunteering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Through Home Stay, people from around the world can learn about us and share
                    their wish to volunteer. It's a platform that connects us with a global
                    community of helpers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our International Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Kalikwani Children Foundation is privileged to work alongside international
                    organizations that share our vision of improving the lives of vulnerable
                    children through education, community development, and volunteer support.
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Sigma Foundation Malta</li>
                    <li>Order of Malta Volunteers Gozo</li>
                    <li>AFCM UK</li>
                    <li>Zalika Wallace Ministries UK</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Find Us Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <a
                        href="https://www.kalikwanichildrenfoundation.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        www.kalikwanichildrenfoundation.org
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.kalikwanichildrensfoundationKCSC.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        www.kalikwanichildrensfoundationKCSC.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.helpstay.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        HelpStay
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.worldpackers.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        Worldpackers
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our International Partners</h2>

          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Our work is strengthened through partnerships with organizations that believe in
            empowering children, supporting education, and uplifting communities through compassion
            and service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Sigma Foundation Malta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A valued partner supporting our mission to improve the lives of vulnerable
                  children and strengthen community development initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order of Malta Volunteers Gozo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A dedicated volunteer organization that has worked alongside us in serving
                  children and communities through compassion and practical support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AFCM UK</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A trusted international partner committed to supporting our educational and
                  community development programs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zalika Wallace Ministries UK</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A valued ministry partner working with us to create opportunities, hope, and a
                  brighter future for the children and families we serve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Key Statistics or Partner Schools Section (add or update as appropriate) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Educational Partners</h2>
          <ul className="max-w-xl mx-auto text-lg text-muted-foreground list-disc pl-6 space-y-2">
            <li>Royal College Kamuli</li>
            <li>Mbulamuti Junior School</li>
            <li>Green Hill Nursery and Primary School</li>
            <li>White Angels Junior School</li>
            <li>Nyanza High School</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Thank you for yg interest in partnering with us. Please feel free to reach out with any
            questions or ideas.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/30 hover:bg-white hover:text-black"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
