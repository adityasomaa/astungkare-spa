import { services, type Service } from "@/content/services";

export interface NavItem {
  href: string;
  label: string;
  /** if set, this item shows a Treatments-style dropdown */
  dropdown?: "treatments";
}

/** Single source of truth for primary navigation, used on every viewport. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Treatments", dropdown: "treatments" },
  { href: "/#areas", label: "Areas Covered" },
  { href: "/contact", label: "Contact" }
];

export const treatmentGroups: Array<{ key: Service["category"]; label: string; items: Service[] }> = [
  { key: "massage", label: "Massage", items: services.filter((s) => s.category === "massage") },
  { key: "face", label: "Face & Beauty", items: services.filter((s) => s.category === "face") },
  { key: "scrub", label: "Body Scrub", items: services.filter((s) => s.category === "scrub") },
  { key: "nails", label: "Nails", items: services.filter((s) => s.category === "nails") },
  { key: "waxing", label: "Waxing", items: services.filter((s) => s.category === "waxing") }
];
