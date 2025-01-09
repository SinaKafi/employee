import Sidebar from "../sidebar/Sidebar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="flex flex-1 flex-col px-12 pt-4 pb-4  bg-white">
        <div className=" w-full">
          <Sidebar mustCollapse={false} />
        </div>

        {children}
      </div>
    </>
  );
}
