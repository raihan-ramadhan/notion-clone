import React from "react";
import { Icons, IconsProps } from "@/components/Icons";
import { StaticImageData } from "next/image";

import TeamSizeEnterpriseLight from "../../public/images/team-size-enterprise.png";
import TeamSizeEnterpriseDark from "../../public/images/team-size-enterprise-dark.png";
import TeamSizeSmallBusinessLight from "../../public/images/team-size-small-business.png";
import TeamSizeSmallBusinessDark from "../../public/images/team-size-small-business-dark.png";
import TeamSizePersonalLight from "../../public/images/team-size-personal.png";
import TeamSizePersonalDark from "../../public/images/team-size-personal-dark.png";

type ProductItems = Array<{
  icon?: React.FunctionComponentElement<IconsProps>;
  href: string;
  itemBody: {
    itemLabel: string;
    itemDesc: string;
  };
}>;

export const product = {
  label: "Product",
  popup: [
    {
      items: [
        {
          icon: React.createElement(Icons.bookOpen, {
            className: "h-6 w-6 pointer-events-none",
          }),
          href: "/product-wikis",
          itemBody: {
            itemLabel: "Wikis",
            itemDesc: "Centralize your knowledge",
          },
        },
        {
          icon: React.createElement(Icons.target, {
            className: "h-6 w-6 pointer-events-none",
          }),
          href: "/product/projects",
          itemBody: {
            itemLabel: "Projects",
            itemDesc: "For every team or size",
          },
        },
        {
          icon: React.createElement(Icons.doc, {
            className: "h-6 w-6 pointer-events-none",
          }),
          href: "/product/docs",
          itemBody: {
            itemLabel: "Docs",
            itemDesc: "Simple & powerful",
          },
        },
        {
          icon: React.createElement(Icons.sparkles, {
            className: "h-6 w-6 pointer-events-none",
          }),
          href: "/product/ai",
          itemBody: {
            itemLabel: "Notion Ai",
            itemDesc: "Integrated AI assistent",
          },
        },
      ] as ProductItems,
    },
    {
      items: [
        {
          href: "/templates",
          itemBody: {
            itemLabel: "Template gallery",
            itemDesc: "Setups to get you started",
          },
        },
        {
          href: "/customers",
          itemBody: {
            itemLabel: "Customer stories",
            itemDesc: "See how teams use Notion",
          },
        },
        {
          href: "/integrations",
          itemBody: {
            itemLabel: "Connections",
            itemDesc: "Connect your tools to Notion",
          },
        },
      ] as ProductItems,
    },
  ],
} as const;

export const download = {
  label: "Download",
  popup: [
    {
      items: [
        {
          href: "/mobile",
          itemBody: { itemLabel: "iOS & Android" },
        },
        {
          href: "/deksktop",
          itemBody: { itemLabel: "Mac & Windows" },
        },
        {
          href: "/web-clipper",
          itemBody: { itemLabel: "Web Clipper" },
        },
      ],
    },
  ],
} as const;

type SolutionsItems = Array<{
  img?: StaticImageData[];
  href: string;
  itemBody: {
    itemLabel: string;
    itemDesc?: string;
  };
}>;

export const solutions = {
  label: "Solutions",
  popup: [
    {
      sectionTitle: "BY TEAM SIZE",
      items: [
        {
          img: [TeamSizeEnterpriseLight, TeamSizeEnterpriseDark],
          href: "/enterprise",
          itemBody: {
            itemLabel: "Enterprise",
            itemDesc: "Advanced features for your org",
          },
        },
        {
          img: [TeamSizeSmallBusinessLight, TeamSizeSmallBusinessDark],
          href: "/team",
          itemBody: {
            itemLabel: "Small business",
            itemDesc: "Run your team on one tool",
          },
        },
        {
          img: [TeamSizePersonalLight, TeamSizePersonalDark],
          href: "/personal",
          itemBody: {
            itemLabel: "Personal",
            itemDesc: "Free for individuals",
          },
        },
      ] as SolutionsItems,
    },
    {
      sectionTitle: "BY TEAM FUNCTION",
      items: [
        {
          href: "/product/notion-for-design",
          itemBody: { itemLabel: "Design" },
        },
        {
          href: "/product/notion-for-enginering",
          itemBody: { itemLabel: "Enginering" },
        },
        {
          href: "/product/notion-for-product",
          itemBody: { itemLabel: "Product" },
        },
        {
          href: "/product/notion-for-manager",
          itemBody: { itemLabel: "Managers" },
        },
      ] as SolutionsItems,
    },
    {
      sectionTitle: "NOTION FOR",
      items: [
        {
          href: "/startup",
          itemBody: { itemLabel: "Startups" },
        },
        {
          href: "/remote",
          itemBody: { itemLabel: "Remote work" },
        },
        {
          href: "/product/notion-for-education",
          itemBody: { itemLabel: "Educations" },
        },
        {
          href: "/nonprofit",
          itemBody: { itemLabel: "Nonprofits" },
        },
      ] as SolutionsItems,
    },
  ],
} as const;

export const resources = {
  label: "Resources",
  popup: [
    {
      items: [
        {
          href: "/blog",
          itemBody: { itemLabel: "Blog" },
        },
        {
          href: "/help/guide",
          itemBody: { itemLabel: "Guides & tutorial" },
        },
        {
          href: "/webinars",
          itemBody: { itemLabel: "Webinars" },
        },
        {
          href: "/help",
          itemBody: { itemLabel: "Help center" },
        },
        {
          href: "https://developers.notion.com/",
          itemBody: { itemLabel: "API docs" },
        },
        {
          href: "/community",
          itemBody: { itemLabel: "Community" },
        },
        {
          href: "/consultants",
          itemBody: { itemLabel: "Find a consultant" },
        },
      ],
    },
  ],
} as const;
