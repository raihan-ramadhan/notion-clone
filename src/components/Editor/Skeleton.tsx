//prettier-ignore
const Skeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 animate-pulse [&>div]:bg-accent [&>div]:rounded-md [&>div]:h-7">
      <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  );
};

export default Skeleton;
