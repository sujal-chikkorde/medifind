import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, HeartPulse } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="h-6 w-6" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-6 w-6" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-6 w-6" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-6 w-6" />, href: "#", label: "LinkedIn" },
    { icon: <Youtube className="h-6 w-6" />, href: "#", label: "Youtube" },
  ];

  const footerSections = [
    {
      title: "Our Services",
      links: [
        { name: "Find a Doctor", path: "/find-doctors" },
        { name: "Find Medicine", path: "/find-medicines" },
        { name: "Book Appointment", path: "/appointments" },
        { name: "Health Articles", path: "/articles" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Help Center", path: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-12 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <HeartPulse className="h-10 w-10 text-primary" />
              <span className="text-xl font-bold gradient-text">MEDIFIND</span>
            </Link>
            <p className="text-sm">
              Connecting you to better health, effortlessly. Find trusted doctors and essential medicines near you in Karnataka, India.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="font-semibold text-slate-800 dark:text-slate-100 mb-4">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm hover:text-primary dark:hover:text-primary-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-300 dark:border-slate-600 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {currentYear} MEDIFIND. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:text-primary dark:hover:text-primary-foreground transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;