import { DocumentType } from "@/types/db";
import { useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { type UseMutateFunction } from "@tanstack/react-query";
import { type MutationProps } from "../Links";

import tailwindConfig from "../../../../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";
import MoreDropDown from "./MoreDropDown";
import MoreDialog from "./MoreDialog";
const fullConfig = resolveConfig<any>(tailwindConfig);

interface MoreProps {
  doc: DocumentType;
  mutate: UseMutateFunction<string | null, Error, MutationProps, unknown>;
  isMobile?: boolean;
}

const More: React.FC<MoreProps> = ({ doc, mutate, isMobile }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const onDelete = ({ id }: DocumentType) => {
    mutate(
      {
        id,
        callback: () => setIsLoading(true),
      },
      {
        onSuccess: () => closeMenu(),
        onSettled: () => setIsLoading(false),
      }
    );
  };

  // make sure when use useWindowSize always on component that get show by useEffect
  // this <More /> used in MobileSidebar that get show by useEffect
  const { width } = useWindowSize();
  const smBreakPoint = parseInt(
    fullConfig.theme.screens.sm.replace("px", ""),
    10
  );

  return (
    <>
      {/* show when  screen size bigger than sm (tablet and dekstop)*/}
      {width && width >= smBreakPoint && (
        <MoreDropDown
          {...{
            isOpen,
            toggleOpen,
            openMenu,
            closeMenu,
            isMobile,
            onDelete,
            doc,
            isLoading,
          }}
        />
      )}

      {/* show when screen size same or less than sm / 640px / phone*/}
      {width && width < smBreakPoint && (
        <MoreDialog
          {...{
            isOpen,
            toggleOpen,
            openMenu,
            closeMenu,
            isMobile,
            onDelete,
            doc,
            isLoading,
          }}
        />
      )}
    </>
  );
};

export default More;
