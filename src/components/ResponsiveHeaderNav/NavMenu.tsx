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
                className="top-full flex shadow-lg cursor-pointer bg-white z-10"
              >
                {item.popup.map((popupItem, index) => (
                  <ul
                    key={`list-${popupItem.id}`}
                    className="w-full h-auto flex flex-col justify-start p-1 flex-1 select-none relative rounded-md"
                  >
                    {popupItem?.sectionTitle && (
                      <span className="text-[11px] opacity-70 px-3 py-1">
                        {popupItem?.sectionTitle}
                      </span>
                    )}
                    {popupItem.items.map((linkItem) => (
                      <li
                        key={linkItem.id}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-min w-full py-1 px-0 justify-start whitespace-nowrap box-border min-w-[180px] overflow-hidden cursor-not-allowed"
                        )}
                        onClick={preventBubbling}
                      >
                        <NavigationMenuLink asChild>
                          <a
                            href={linkItem.href}
                            className="cursor-not-allowed flex items-center w-max"
                            onClick={preventBubbling}
                          >
                            {linkItem?.icon && (
                              <div className="ml-3" onClick={preventBubbling}>
                                <linkItem.icon className="h-6 w-6 pointer-events-none" />
                              </div>
                            )}
                            {linkItem?.img && (
                              <Image
                                onClick={preventBubbling}
                                alt={linkItem.img.split("/images/")[0]}
                                src={linkItem.img}
                                width={40}
                                height={40}
                                className="ml-1 select-none"
                              />
                            )}
                            <div className="px-3" onClick={preventBubbling}>
                              <div
                                className="text-base"
                                onClick={preventBubbling}
                              >
                                {linkItem.itemBody.itemLabel}
                              </div>
                              {linkItem.itemBody?.itemDesc && (
                                <div
                                  className="opacity-60"
                                  onClick={preventBubbling}
                                >
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
