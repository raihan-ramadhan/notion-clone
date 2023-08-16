"use client";

import { product, download, solutions, resources } from "@/lib/nav-items";
import { preventBubbling } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

const MobileNavMenu: React.FC = () => {
  return (
    <Accordion type="multiple" defaultValue={["product"]}>
      {/* PRODUCT */}
      <AccordionItem value={"product"}>
        <AccordionTrigger className="text-lg font-semibold">
          {product.label}
        </AccordionTrigger>
        <AccordionContent>
          {product.popup.map((popupItem, index) => (
            <ul key={index} className="py-1">
              {popupItem.items.map((linkItem, idx) => (
                <li key={idx} className="py-1">
                  <a
                    href={linkItem.href}
                    className="cursor-not-allowed flex gap-4 w-full"
                    onClick={preventBubbling}
                  >
                    {linkItem.icon && (
                      <div onClick={preventBubbling}>{linkItem.icon}</div>
                    )}
                    <div className="text-base">
                      {linkItem.itemBody.itemLabel}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* DOWNLOAD */}
      <AccordionItem value={"download"}>
        <AccordionTrigger className="text-lg font-semibold">
          {download.label}
        </AccordionTrigger>
        <AccordionContent>
          {download.popup.map((popupItem, index) => (
            <ul key={index} className="py-1">
              {popupItem.items.map((linkItem, idx) => (
                <li key={idx} className="py-1">
                  <a
                    href={linkItem.href}
                    className="cursor-not-allowed flex gap-4 w-full"
                    onClick={preventBubbling}
                  >
                    <div className="text-base">
                      {linkItem.itemBody.itemLabel}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* SOLUTIONS */}
      <AccordionItem value={"solutions"}>
        <AccordionTrigger className="text-lg font-semibold">
          {solutions.label}
        </AccordionTrigger>
        <AccordionContent>
          {solutions.popup.map((popupItem, index) => (
            <ul key={index} className="py-1">
              {popupItem.sectionTitle && (
                <span className="text-[12px] opacity-70 py-1 pointer-events-none">
                  {popupItem?.sectionTitle}
                </span>
              )}
              {popupItem.items.map((linkItem, idx) => (
                <li key={idx} className="py-1">
                  <a
                    href={linkItem.href}
                    className="cursor-not-allowed flex gap-4 w-full"
                    onClick={preventBubbling}
                  >
                    <div className="text-base">
                      {linkItem.itemBody.itemLabel}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* RESOURCES */}
      <AccordionItem value={"resources"}>
        <AccordionTrigger className="text-lg font-semibold">
          {resources.label}
        </AccordionTrigger>
        <AccordionContent>
          {resources.popup.map((popupItem, index) => (
            <ul key={index} className="py-1">
              {popupItem.items.map((linkItem, idx) => (
                <li key={idx} className="py-1">
                  <a
                    href={linkItem.href}
                    className="cursor-not-allowed flex gap-4 w-full"
                    onClick={preventBubbling}
                  >
                    <div className="text-base">
                      {linkItem.itemBody.itemLabel}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* PRICING */}
      <AccordionItem value="pricing" asChild>
        <a
          onClick={preventBubbling}
          href="/pricing"
          className="cursor-not-allowed text-lg font-semibold py-4 w-full block"
        >
          Pricing
        </a>
      </AccordionItem>

      {/* CONCTACT */}
      <AccordionItem value="contact-sales" asChild>
        <a
          onClick={preventBubbling}
          href="/contact-sales"
          className="cursor-not-allowed text-lg font-semibold py-4 w-full block"
        >
          Request a demo
        </a>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileNavMenu;
