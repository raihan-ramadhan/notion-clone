import { useRouter, useSearchParams } from "next/navigation";

export function useShowMobileSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const SEARCH_PARAMS_SHOW_MOBILE_SIDEBAR =
    searchParams.get("showMobileSidebar");

  const showMobileSidebar: boolean =
    SEARCH_PARAMS_SHOW_MOBILE_SIDEBAR?.toString() == "1";
  const toggleMobileSidebar = () => {
    if (showMobileSidebar) {
      router.back();
    } else {
      router.push("?showMobileSidebar=1");
    }
  };

  return {
    showMobileSidebar,
    toggleMobileSidebar,
  };
}
