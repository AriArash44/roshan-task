import React from "react"
import type { ReactElement } from "react"
import type { MainLayoutProps, CompoundChildProps } from "../../consts/types"
import Aside from "../common/Aside"
import DropdownMenu from "../common/DropDown"

const pages = [
  { label: "تبدیل گفتار", path: "speech-to-text", icon: "/images/icons/speech.svg" },
  { label: "آرشیو", path: "archive", icon: "/images/icons/archive.svg" },
];

const Header: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
const Main: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;

type MainLayoutComponent = React.FC<MainLayoutProps> & {
  Header: typeof Header;
  Main: typeof Main;
};

const MainLayout: MainLayoutComponent = ({ children }) => {
  let header: ReactElement | undefined;
  let main: ReactElement | undefined;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === Header) header = child;
      if (child.type === Main) main = child;
    }
  });
  return (
    <>
      <DropdownMenu iconName="user" title="مهمان" options={[{label: "خروج", iconName: "logout"}]}
      changeTitleOnSelect={false} className="absolute top-8 left-8 border-2"/>
      <Aside pages={pages} />
      <div className="flex flex-col flex-1 gap-8 justify-center items-center pl-[4rem] py-10">
        <header>
          { header }
        </header>
        <main className="relative">
          { main }
        </main>
      </div>
    </>
  );
};

MainLayout.Header = Header;
MainLayout.Main = Main;

export default MainLayout;