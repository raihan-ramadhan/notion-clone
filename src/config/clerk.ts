import "server-only";
import { type ClerkOptions } from "@clerk/types/dist/clerk";

export const clerkProviderConfig: ClerkOptions = {
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  appearance: {
    variables: { colorPrimary: "#000" },
    elements: {
      footer: "hidden",
      main: "mb-12",
      card: "shadow-[0_5px_10px] shadow-foreground/30 bg-background",
      headerTitle: "text-primary",
      headerSubtitle: "text-primary/60",
      socialButtonsBlockButtonText: "text-primary",
      socialButtonsBlockButton: "border-none ring-[1px] ring-ring",
      socialButtonsBlockButtonArrow: "text-primary",
      socialButtonsBlockButton__loading: "text-primary",
      alertText__danger: "text-primary",
      alert__danger: "border-none ring-[1px] ring-ring",
      modalBackdrop: "bg-zinc-900/30 dark:bg-white/20 backdrop-blur-sm",
      navbar: " [&_*]:text-primary",
      scrollBox: " [&_*]:text-primary",
    },
  },
};
