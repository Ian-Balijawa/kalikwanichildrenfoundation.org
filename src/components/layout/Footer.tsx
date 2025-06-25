import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
	return (
		<footer className="bg-primary text-primary-foreground w-full">
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">About KCF</h3>
						<p className="text-sm">
							Kalikwani Children's Foundation is dedicated to empowering children and
							transforming lives through education, support, and community
							development.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/about">About Us</Link>
							</li>
							<li>
								<Link to="/programs">Our Programs</Link>
							</li>
							<li>
								<Link to="/gallery">Gallery</Link>
							</li>
							<li>
								<Link to="/contact">Contact Us</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Get Involved</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/volunteer">Volunteer</Link>
							</li>
							<li>
								<Link to="/support">Donate</Link>
							</li>
							<li>
								<Link to="/partnerships">Partner With Us</Link>
							</li>
							<li>
								<Link to="/impact-stories">Impact Stories</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Contact Info</h3>
						<ul className="space-y-2 text-sm">
							<li>Busota, Southern Division</li>
							<li>Kamuli Municipality, Uganda</li>
							<li>
								<a
									href="https://api.whatsapp.com/send/?phone=%2B256764969385&text&type=phone_number&app_absent=0"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-primary underline"
								>
									<FaWhatsapp className="inline-block" />
									+256 764 969 385
								</a>
							</li>
							<li>Email: kalikwani.csc2024@gmail.com</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm">
					<p>
						&copy; {new Date().getFullYear()} Kalikwani Children's Foundation. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
