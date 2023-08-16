import { ClerkLoading } from "@clerk/nextjs/app-beta/client";
import { NotionLogoIcon } from "@radix-ui/react-icons";

const Loader: React.FC = () => {
  return (
    <ClerkLoading>
      <div className="centering-absolute text-2xl flex items-center gap-2 font-serif">
        <NotionLogoIcon className="h-[32px] w-[32px]" /> Loading...
      </div>
    </ClerkLoading>
  );
};

export default Loader;
