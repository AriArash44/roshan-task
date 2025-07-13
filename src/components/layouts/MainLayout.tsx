import React from "react"
import type { ReactElement, ReactNode } from "react"

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
      
    );
};

MainLayout.Header = Header;
MainLayout.Main = Main;

export default MainLayout;