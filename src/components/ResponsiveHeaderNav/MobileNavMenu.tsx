"use client";

import { preventBubbling } from "@/lib/utils";
import navItems from "./nav-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

const MobileNavMenu: React.FC = () => {
  return (
    <Accordion type="multiple" defaultValue={[navItems[0].id]}>
      {navItems.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger
            id={`trigger-${item.id}`}
            aria-controls={`content-${item.id}`}
            className="text-lg font-semibold"
          >
            {item.label}
          </AccordionTrigger>
          <AccordionContent
            id={`content-${item.id}`}
            aria-labelledby={`trigger-${item.id}`}
          >
            {item.popup.map((popupItem) => (
              <ul key={popupItem.id} className="py-1">
                {popupItem?.sectionTitle && (
                  <span className="text-[12px] opacity-70 py-1 pointer-events-none">
                    {popupItem?.sectionTitle}
                  </span>
                )}
                {popupItem.items.map((linkItem) => (
                  <li key={linkItem.id} className="py-1">
                    <a
                      href={linkItem.href}
                      className="cursor-not-allowed flex gap-4 w-full"
                      onClick={preventBubbling}
                    >
                      {linkItem?.icon && (
                        <div onClick={preventBubbling}>
                          <linkItem.icon className="h-6 w-6 pointer-events-none" />
                        </div>
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
      ))}
      <AccordionItem value="pricing" asChild>
        <a
          onClick={preventBubbling}
          href="/pricing"
          className="cursor-not-allowed text-lg font-semibold py-4 w-full block"
        >
          Pricing
        </a>
      </AccordionItem>
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
