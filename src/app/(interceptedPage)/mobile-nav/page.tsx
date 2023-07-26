import MobileNav from "@/components/ResponsiveHeaderNav/MobileNav";
import Nav from "@/components/ResponsiveHeaderNav/Nav";

const Page: React.FC = () => {
  return (
    <div>
      <Nav isPage />
      <MobileNav isPage />
    </div>
  );
};

export default Page;
