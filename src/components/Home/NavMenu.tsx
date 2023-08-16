"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "../ui/Separator";
import { cn, preventBubbling } from "@/lib/utils";

import { product, download, solutions, resources } from "@/lib/nav-items";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";

const NavMenu: React.FC = () => {
  return (
    <div className="flex items-center relative">
      <NavigationMenu>
        <NavigationMenuList>
          {/* PRODUCT */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-base h-[30px] px-3 py-1">
              {product.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="top-full flex shadow-lg cursor-pointer bg-popover z-10 rounded-md overflow-hidden">
              {product.popup.map((popupItem, index) => (
                <React.Fragment key={index}>
                  <ul className="w-full h-auto flex flex-col justify-start p-1 flex-1 select-none relative">
                    {popupItem.items.map((linkItem, idx) => (
                      <li
                        key={idx}
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
                            {linkItem.icon && (
                              <div className="pl-3" onClick={preventBubbling}>
                                {linkItem.icon}
                              </div>
                            )}

                            <div
                              className="px-3 w-full"
                              onClick={preventBubbling}
                            >
                              <div className="text-base">
                                {linkItem.itemBody.itemLabel}
                              </div>
                              {linkItem.itemBody.itemDesc && (
                                <div className="opacity-60">
                                  {linkItem.itemBody.itemDesc}
                                </div>
                              )}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  {index !== product.popup.length - 1 && (
                    <div>
                      <Separator orientation="vertical" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* DOWNLOAD */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-base h-[30px] px-3 py-1">
              {download.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="top-full flex shadow-lg cursor-pointer bg-popover z-10 rounded-md overflow-hidden">
              {download.popup.map((popupItem, index) => (
                <React.Fragment key={index}>
                  <ul className="w-full h-auto flex flex-col justify-start p-1 flex-1 select-none relative">
                    {popupItem.items.map((linkItem, idx) => (
                      <li
                        key={idx}
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
                            <div
                              className="px-3 w-full"
                              onClick={preventBubbling}
                            >
                              <div className="text-base">
                                {linkItem.itemBody.itemLabel}
                              </div>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  {index !== download.popup.length - 1 && (
                    <div>
                      <Separator orientation="vertical" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* SOLUTIONS */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-base h-[30px] px-3 py-1">
              {solutions.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="top-full flex shadow-lg cursor-pointer bg-popover z-10 rounded-md overflow-hidden">
              {solutions.popup.map((popupItem, index) => (
                <React.Fragment key={index}>
                  <ul className="w-full h-auto flex flex-col justify-start p-1 flex-1 select-none relative">
                    <span className="text-[11px] opacity-70 px-3 py-1">
                      {popupItem.sectionTitle}
                    </span>
                    {popupItem.items.map((linkItem, idx) => (
                      <li
                        key={idx}
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
                            {linkItem.img && (
                              <div className="ml-1 min-h-[40px] min-w-[40px]">
                                <picture>
                                  <source
                                    srcSet={linkItem.img[1].src}
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
                              {linkItem.itemBody.itemDesc && (
                                <div className="opacity-60">
                                  {linkItem.itemBody.itemDesc}
                                </div>
                              )}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  {index !== solutions.popup.length - 1 && (
                    <div>
                      <Separator orientation="vertical" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* RESOURCES */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="text-base h-[30px] px-3 py-1">
              {resources.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="top-full flex shadow-lg cursor-pointer bg-popover z-10 rounded-md overflow-hidden">
              {resources.popup.map((popupItem, index) => (
                <React.Fragment key={index}>
                  <ul className="w-full h-auto flex flex-col justify-start p-1 flex-1 select-none relative">
                    {popupItem.items.map((linkItem, idx) => (
                      <li
                        key={idx}
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
                            <div
                              className="px-3 w-full"
                              onClick={preventBubbling}
                            >
                              <div className="text-base">
                                {linkItem.itemBody.itemLabel}
                              </div>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  {index !== resources.popup.length - 1 && (
                    <div>
                      <Separator orientation="vertical" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

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
