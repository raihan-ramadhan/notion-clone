"use client";

import navItems from "./nav-items";
import { Separator } from "../ui/Separator";
import { cn, preventBubbling } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import Image from "next/image";

const NavMenu: React.FC = () => {
  return (
    <div className="flex items-center relative">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.id} className="relative">
              <NavigationMenuTrigger
                id={`trigger-${item.id}`}
                aria-controls={`content-${item.id}`}
                className="text-base h-[30px] px-3 py-1"
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                id={`content-${item.id}`}
                aria-labelledby={`trigger-${item.id}`}
                className="top-full flex shadow-lg cursor-pointer bg-popover z-10 rounded-md overflow-hidden"
              >
                {item.popup.map((popupItem, index) => (
                  <ul
                    key={`list-${popupItem.id}`}
                    className="w-full h-auto flex flex-col justify-start p-1 flex-1 select-none relative"
                  >
                    {popupItem?.sectionTitle && (
                      <span className="text-[11px] opacity-70 px-3 py-1">
                        {popupItem?.sectionTitle}
                      </span>
                    )}
                    {popupItem.items.map((linkItem) => (
                      <li
                        key={linkItem.id}
                        className="h-min whitespace-nowrap overflow-hidden cursor-not-allowed bg-popover w-full"
                        onClick={preventBubbling}
                      >
                        <NavigationMenuLink asChild>
                          <a
                            href={linkItem.href}
                            className={cn(
                              "py-1 min-w-[180px] cursor-not-allowed flex items-center w-full outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md"
                            )}
                            onClick={preventBubbling}
                          >
                            {linkItem?.icon && (
                              <div className="pl-3" onClick={preventBubbling}>
                                <linkItem.icon className="h-6 w-6 pointer-events-none" />
                              </div>
                            )}
                            {linkItem?.img && (
                              <div className="ml-1 min-h-[40px] min-w-[40px]">
                                <picture>
                                  <source
                                    srcSet={linkItem.img[1]}
                                    media="(prefers-color-scheme: dark)"
                                  />
                                  <Image
                                    onClick={preventBubbling}
                                    alt="image icon"
                                    src={linkItem.img[0]}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 select-none"
                                  />
                                </picture>
                              </div>
                            )}
                            <div
                              className="px-3 w-full"
                              onClick={preventBubbling}
                            >
                              <div className="text-base">
                                {linkItem.itemBody.itemLabel}
                              </div>
                              {linkItem.itemBody?.itemDesc && (
                                <div className="opacity-60">
                                  {linkItem.itemBody?.itemDesc}
                                </div>
                              )}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    {index !== item.popup.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className="absolute right-0 inset-y-0"
                      />
                    )}
                  </ul>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base h-[30px] px-3 py-1"
              )}
            >
              <a
                href="/pricing"
                className="cursor-not-allowed"
                onClick={preventBubbling}
              >
                Pricing
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
