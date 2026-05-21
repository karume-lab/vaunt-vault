import type { Route } from "next";

export const navLinks: { label: string; href: Route }[] = [
  { label: "Discover", href: "/discover/affiliates" as Route },
  { label: "The Team", href: "#the-team" as Route },
  { label: "Statistics", href: "#statistics" as Route },
  { label: "FAQs", href: "#faqs" as Route },
  { label: "Get In Touch With Us", href: "#get-in-touch-with-us" as Route },
];

export enum ProfileTypes {
  Affiliate = "affiliate",
  Business = "business",
}

export const profileTypeDescriptions = {
  affiliate:
    "Grow your influence and earn on your own terms by partnering with trusted brands. Share products that genuinely resonate with your audience and turn your reach into real, values-aligned rewards.",
  business:
    "Promote your own products and services by collaborating with experienced creators who can amplify your brand's visibility, build trust, and deliver long-term growth through impactful campaigns.",
};
