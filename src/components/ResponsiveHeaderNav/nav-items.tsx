import { Icons, type IconsProps } from "../Icons";

type NavItems = Array<{
  id: string;
  label: string;
  popup: Array<{
    id: string;
    sectionTitle?: string;
    items: Array<{
      id: string;
      // eslint-disable-next-line no-unused-vars
      icon?: (props: IconsProps) => any;
      img?: string;
      href: string;
      itemBody: {
        itemLabel: string;
        itemDesc?: string;
      };
    }>;
  }>;
}>;

const navItems: NavItems = [
  {
    id: "label1",
    label: "Product",
    popup: [
      {
        id: "product-1",
        items: [
          {
            id: "product-1-item-1",
            icon: (props) => <Icons.bookOpen className={props?.className} />,
            href: "/product-wikis",
            itemBody: {
              itemLabel: "Wikis",
              itemDesc: "Centralize your knowledge",
            },
          },
          {
            icon: (props) => <Icons.target className={props?.className} />,
            id: "product-1-item-2",
            href: "/product/projects",
            itemBody: {
              itemLabel: "Projects",
              itemDesc: "For every team or size",
            },
          },
          {
            icon: (props) => <Icons.doc className={props?.className} />,
            id: "product-1-item-3",
            href: "/product/docs",
            itemBody: {
              itemLabel: "Docs",
              itemDesc: "Simple & powerful",
            },
          },
          {
            icon: (props) => <Icons.sparkles className={props?.className} />,
            id: "product-1-item-4",
            href: "/product/ai",
            itemBody: {
              itemLabel: "Notion Ai",
              itemDesc: "Integrated AI assistent",
            },
          },
        ],
      },
      {
        id: "product-2",
        items: [
          {
            id: "product-2-item-1",
            href: "/templates",
            itemBody: {
              itemLabel: "Template gallery",
              itemDesc: "Setups to get you started",
            },
          },
          {
            id: "product-2-item-2",
            href: "/customers",
            itemBody: {
              itemLabel: "Customer stories",
              itemDesc: "See how teams use Notion",
            },
          },
          {
            id: "product-2-item-3",
            href: "/integrations",
            itemBody: {
              itemLabel: "Connections",
              itemDesc: "Connect your tools to Notion",
            },
          },
        ],
      },
    ],
  },
  {
    id: "label2",
    label: "Download",
    popup: [
      {
        id: "download-1",
        items: [
          {
            id: "download-1-item-1",
            href: "/mobile",
            itemBody: { itemLabel: "iOS & Android" },
          },
          {
            id: "download-1-item-2",
            href: "/deksktop",
            itemBody: { itemLabel: "Mac & Windows" },
          },
          {
            id: "download-1-item-3",
            href: "/web-clipper",
            itemBody: { itemLabel: "Web Clipper" },
          },
        ],
      },
    ],
  },
  {
    id: "label3",
    label: "Solutions",
    popup: [
      {
        sectionTitle: "BY TEAM SIZE",
        id: "solutions-1",
        items: [
          {
            img: "/images/team-size-enterprise.png",
            id: "solutions-1-item-1",
            href: "/enterprise",
            itemBody: {
              itemLabel: "Enterprise",
              itemDesc: "Advanced features for your org",
            },
          },
          {
            img: "/images/team-size-small-business.png",
            id: "solutions-1-item-2",
            href: "/team",
            itemBody: {
              itemLabel: "Small business",
              itemDesc: "Run your team on one tool",
            },
          },
          {
            img: "/images/team-size-personal.png",
            id: "solutions-1-item-3",
            href: "/personal",
            itemBody: {
              itemLabel: "Personal",
              itemDesc: "Free for individuals",
            },
          },
        ],
      },
      {
        sectionTitle: "BY TEAM FUNCTION",
        id: "solutions-2",
        items: [
          {
            id: "solutions-2-item-1",
            href: "/product/notion-for-design",
            itemBody: { itemLabel: "Design" },
          },
          {
            id: "solutions-2-item-2",
            href: "/product/notion-for-enginering",
            itemBody: { itemLabel: "Enginering" },
          },
          {
            id: "solutions-2-item-3",
            href: "/product/notion-for-product",
            itemBody: { itemLabel: "Product" },
          },
          {
            id: "solutions-2-item-4",
            href: "/product/notion-for-manager",
            itemBody: { itemLabel: "Managers" },
          },
        ],
      },
      {
        sectionTitle: "NOTION FOR",
        id: "solutions-3",
        items: [
          {
            id: "solutions-3-item-1",
            href: "/startup",
            itemBody: { itemLabel: "Startups" },
          },
          {
            id: "solutions-3-item-2",
            href: "/remote",
            itemBody: { itemLabel: "Remote work" },
          },
          {
            id: "solutions-3-item-3",
            href: "/product/notion-for-education",
            itemBody: { itemLabel: "Educations" },
          },
          {
            id: "solutions-3-item-4",
            href: "/nonprofit",
            itemBody: { itemLabel: "Nonprofits" },
          },
        ],
      },
    ],
  },
  {
    id: "label4",
    label: "Resources",
    popup: [
      {
        id: "resources-1",
        items: [
          {
            id: "resources-1-item-1",
            href: "/blog",
            itemBody: { itemLabel: "Blog" },
          },
          {
            id: "resources-1-item-2",
            href: "/help/guide",
            itemBody: { itemLabel: "Guides & tutorial" },
          },
          {
            id: "resources-1-item-3",
            href: "/webinars",
            itemBody: { itemLabel: "Webinars" },
          },
          {
            id: "resources-1-item-4",
            href: "/help",
            itemBody: { itemLabel: "Help center" },
          },
          {
            id: "resources-1-item-5",
            href: "https://developers.notion.com/",
            itemBody: { itemLabel: "API docs" },
          },
          {
            id: "resources-1-item-6",
            href: "/community",
            itemBody: { itemLabel: "Community" },
          },
          {
            id: "resources-1-item-7",
            href: "/consultants",
            itemBody: { itemLabel: "Find a consultant" },
          },
        ],
      },
    ],
  },
];

export default navItems;
