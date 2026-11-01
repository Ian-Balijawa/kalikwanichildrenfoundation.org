import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/get-involved', label: 'Get involved' },
  { to: '/contact', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[min(90vw,380px)] overflow-y-auto border-l-[#e9e5d9] bg-[#fffdf8] px-6 pt-14"
        >
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-10 w-10 rounded-full"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetClose>
          <SheetTitle className="mb-7 text-left font-serif text-3xl text-[#193d30]">
            Explore Kalikwani
          </SheetTitle>
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-[#e9e5d9] py-3 text-lg font-semibold ${isActive ? 'text-primary' : 'text-[#2b4236]'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Button asChild className="mt-8 h-12 rounded-full shadow-none">
              <Link to="/support" onClick={() => setOpen(false)}>
                Donate <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
