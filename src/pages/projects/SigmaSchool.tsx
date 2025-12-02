import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const constructionImages = [
    "/construction/8.jpg",
    "/construction/9.jpg",
    "/construction/10.jpg",
    "/construction/11.jpg",
    "/construction/12.jpg",
    "/construction/13.jpg",
    "/construction/14.jpg",
    "/construction/15.jpg",
    "/construction/16.jpg",
    "/construction/17.jpg",
    "/construction/18.jpg",
];

const designImages = [
    "/designs/1.jpg",
    "/designs/2.jpg",
    "/designs/3.jpg",
    "/designs/4.jpg",
    "/designs/5.jpg",
    "/designs/6.jpg",
];

export default function SigmaSchool() {
    const [selectedConstructionImage, setSelectedConstructionImage] = useState(0);
    const [selectedDesignImage, setSelectedDesignImage] = useState(0);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">
                            Anthony Zammit Sigma School Construction
                        </h1>
                        <p className="text-lg text-muted-foreground mb-4">
                            Building a brighter future for 500 students in Nawaikoke Kaliro, Uganda
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                Education
                            </span>
                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-medium">
                                Ongoing Construction
                            </span>
                            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-medium">
                                Seeking Additional Funding
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Overview */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <h2>Project Background</h2>
                            <p>
                                Thanks to the generous support of the <strong>Sigma Foundation of Malta</strong>,
                                who have contributed <strong>€25,944</strong>, we are constructing a state-of-the-art
                                primary school facility in Nawaikoke Kaliro, Uganda. This transformative project will
                                provide quality education infrastructure for 500 students in our community.
                            </p>
                            <p>
                                The school building will feature 8 modern classrooms, a well-equipped library,
                                and administrative offices, creating an environment conducive to learning and
                                academic excellence. We are actively seeking additional funding to complete this
                                vital project and bring quality education to our community.
                            </p>

                            <div className="bg-muted p-6 rounded-lg my-8">
                                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Location</dt>
                                        <dd className="text-lg">Nawaikoke Kaliro, Uganda</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Funding Partner</dt>
                                        <dd className="text-lg">Sigma Foundation of Malta</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Total Budget</dt>
                                        <dd className="text-lg">€101,000</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Funds Received</dt>
                                        <dd className="text-lg font-semibold text-green-600">€25,944</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Still Needed</dt>
                                        <dd className="text-lg font-semibold text-orange-600">€75,056</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Timeline</dt>
                                        <dd className="text-lg">January 2024 - December 2024</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Beneficiaries</dt>
                                        <dd className="text-lg">500 Students</dd>
                                    </div>
                                    <div>
                                        <dt className="text-muted-foreground font-medium">Status</dt>
                                        <dd className="text-lg text-green-600 font-semibold">Under Construction</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg my-8">
                                <h3 className="text-xl font-semibold mb-4">Fundraising Progress</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-2xl font-bold text-green-600">€25,944</span>
                                        <span className="text-muted-foreground">raised of</span>
                                        <span className="text-2xl font-bold">€101,000</span>
                                    </div>
                                    <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                                            style={{ width: "25.7%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>25.7% funded</span>
                                        <span>€75,056 still needed</span>
                                    </div>
                                    <p className="text-sm text-center text-muted-foreground pt-2 border-t">
                                        Your contribution can help us complete this vital educational facility
                                    </p>
                                </div>
                            </div>

                            <h2>Facilities</h2>
                            <ul>
                                <li><strong>8 Classrooms:</strong> Spacious, well-lit learning spaces designed for optimal student engagement</li>
                                <li><strong>Library:</strong> A dedicated space for reading, research, and academic resources</li>
                                <li><strong>Administrative Offices:</strong> Professional spaces for school management and staff</li>
                                <li><strong>Modern Infrastructure:</strong> Built to contemporary standards with durability and sustainability in mind</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Construction Progress */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Construction Progress</h2>

                        {/* Main Image Display */}
                        <div className="mb-8">
                            <div className="aspect-video relative overflow-hidden rounded-lg bg-black">
                                <img
                                    src={constructionImages[selectedConstructionImage]}
                                    alt={`Construction progress ${selectedConstructionImage + 1}`}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-sm text-muted-foreground mt-2">
                                Image {selectedConstructionImage + 1} of {constructionImages.length}
                            </p>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                            {constructionImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedConstructionImage(index)}
                                    className={`aspect-video relative overflow-hidden rounded-md border-2 transition-all ${selectedConstructionImage === index
                                        ? "border-primary ring-2 ring-primary"
                                        : "border-transparent hover:border-primary/50"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Construction thumbnail ${index + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Construction Updates */}
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold mb-6">Recent Updates</h3>
                            <div className="space-y-6">
                                <div className="bg-background p-6 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-primary font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2">Foundation Complete</h4>
                                            <p className="text-muted-foreground mb-1">March 15, 2024</p>
                                            <p>The foundation work has been completed and wall construction has begun.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-background p-6 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-primary font-bold">⚙</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2">Construction Ongoing</h4>
                                            <p className="text-muted-foreground mb-1">December 2024</p>
                                            <p>Construction is progressing well with walls being erected and roofing preparations underway.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architectural Designs */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Architectural Designs</h2>

                        {/* Main Design Display */}
                        <div className="mb-8">
                            <div className="aspect-video relative overflow-hidden rounded-lg bg-black">
                                <img
                                    src={designImages[selectedDesignImage]}
                                    alt={`Architectural design ${selectedDesignImage + 1}`}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-sm text-muted-foreground mt-2">
                                Design {selectedDesignImage + 1} of {designImages.length}
                            </p>
                        </div>

                        {/* Design Thumbnail Gallery */}
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {designImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedDesignImage(index)}
                                    className={`aspect-video relative overflow-hidden rounded-md border-2 transition-all ${selectedDesignImage === index
                                        ? "border-primary ring-2 ring-primary"
                                        : "border-transparent hover:border-primary/50"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Design thumbnail ${index + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 prose prose-lg max-w-none">
                            <h3>Building Specifications</h3>
                            <p>
                                The architectural plans showcase a modern, functional design that prioritizes
                                both educational effectiveness and structural durability. The building layout
                                has been carefully planned to maximize natural light, ventilation, and efficient
                                use of space.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Expected Impact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-background p-6 rounded-lg">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
                                <p className="text-muted-foreground">
                                    Modern classrooms and facilities will provide an optimal learning
                                    environment for 500 students.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-lg">
                                <div className="text-4xl mb-4">👨‍🏫</div>
                                <h3 className="text-xl font-semibold mb-2">Teacher Support</h3>
                                <p className="text-muted-foreground">
                                    Professional administrative spaces and resources to support
                                    effective teaching and school management.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-lg">
                                <div className="text-4xl mb-4">🌍</div>
                                <h3 className="text-xl font-semibold mb-2">Community Development</h3>
                                <p className="text-muted-foreground">
                                    A cornerstone for community growth, providing educational
                                    opportunities for current and future generations.
                                </p>
                            </div>
                            <div className="bg-background p-6 rounded-lg">
                                <div className="text-4xl mb-4">🎓</div>
                                <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
                                <p className="text-muted-foreground">
                                    Library and learning resources to foster a culture of reading,
                                    research, and academic achievement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Acknowledgment Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Our Gratitude</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We extend our deepest gratitude to the <strong>Sigma Foundation of Malta</strong>
                            for their generous support and commitment to education in Uganda. This partnership
                            is transforming lives and creating opportunities for hundreds of children in our community.
                        </p>
                        <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg text-left">
                            <p className="text-lg italic">
                                "Education is the most powerful weapon which you can use to change the world."
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">— Nelson Mandela</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Your support can help us continue building educational infrastructure
                        and creating opportunities for children in Uganda.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/support">
                            <Button size="lg" variant="secondary">
                                Support This Project
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white/10 hover:bg-white/20"
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
