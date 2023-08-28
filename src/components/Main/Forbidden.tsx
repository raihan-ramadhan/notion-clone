import Header from "../Header";

const Forbidden: React.FC = () => {
  return (
    <>
      <Header />
      <main className="w-full h-[calc(100vh_-_48px)] flex items-center justify-center flex-col">
        <span className="text-7xl">403</span>
        <span className="font-semibold">Access Forbidden</span>
      </main>
    </>
  );
};

export default Forbidden;
