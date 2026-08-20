import { IconMail, IconBrandLinkedin, IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react"

export const dashboardData = {
  contact: [
    {
      href: "mailto:govind@example.com",
      label: "Email",
      icon: <IconMail className="h-5 w-5" />,
      aria: "Email",
    },
    {
      href: "https://www.linkedin.com/in/govind",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
      aria: "LinkedIn",
    },
    {
      href: "https://github.com/govind",
      label: "GitHub",
      icon: <IconBrandGithub className="h-5 w-5" />,
      aria: "GitHub",
    },
    {
      href: "https://instagram.com/govind",
      label: "Instagram",
      icon: <IconBrandInstagram className="h-5 w-5" />,
      aria: "Instagram",
    },
  ],

  scratchGifs: [
    "/about/cat-1.gif",
    "/about/cat-2.gif",
    "/about/cat-3.gif",
    "/about/cat-5.gif",
  ],

  tools: [
    { name: "React", icon: "react", themeDependent: false },
    { name: "React Native", icon: "reactnative", themeDependent: false },
    { name: "NextJS", icon: "nextjs", themeDependent: true },
    { name: "Shopify", icon: "shopify", themeDependent: false },
    { name: "WordPress", icon: "wordpress", themeDependent: false },
    { name: "Elementor", icon: "elementor", themeDependent: false },
    { name: "WooCommerce", icon: "woocommerce", themeDependent: false },
    { name: "Angular", icon: "angular", themeDependent: false },
    { name: "NodeJS", icon: "nodejs", themeDependent: false },
    { name: "Javascript", icon: "javascript", themeDependent: false },
    { name: "Typescript", icon: "typescript", themeDependent: false },
    { name: "Express", icon: "express", themeDependent: false },
    { name: "C", icon: "c", themeDependent: false },
    { name: "Python", icon: "python", themeDependent: false },
    { name: "HTML", icon: "html", themeDependent: false },
    { name: "CSS", icon: "css", themeDependent: false },
    { name: "TailwindCSS", icon: "tailwind", themeDependent: false },
    { name: "AWS", icon: "aws", themeDependent: false },
    { name: "Azure", icon: "azure", themeDependent: false },
    { name: "GCP", icon: "gcp", themeDependent: false },
    { name: "PostgreSQL", icon: "postgresql", themeDependent: false },
    { name: "MongoDB", icon: "mongodb", themeDependent: false },
    { name: "SQL", icon: "sql", themeDependent: false },
    { name: "Docker", icon: "docker", themeDependent: false },
    { name: "Git", icon: "git", themeDependent: false },
    { name: "Github", icon: "github", themeDependent: true },
    { name: "Figma", icon: "figma", themeDependent: false },
    { name: "VSCode", icon: "vscode", themeDependent: false },
  ],
};
