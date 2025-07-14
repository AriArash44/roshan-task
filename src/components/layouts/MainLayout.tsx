import React from "react"
import type { ReactElement, ReactNode } from "react"
import Aside from "../common/Aside"
import UserMenu from "../common/UserMenu";

const pages = [
  { label: "تبدیل گفتار", path: "speech-to-text", icon: "/images/icons/speech.svg" },
  { label: "آرشیو", path: "archive", icon: "/images/icons/archive.svg" },
];

interface MainLayoutProps {
  children: ReactNode;
}

interface CompoundChildProps {
  children: ReactNode;
}

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
      <UserMenu />
      <Aside pages={pages} />
      <div className="flex flex-col flex-1 gap-8 justify-center items-center pl-[4rem]">
        <header>
          { header }
        </header>
        <main>
          { main }
        </main>
      </div>
    </>
  );
};

MainLayout.Header = Header;
MainLayout.Main = Main;

export default MainLayout;