import { Link, useLocation } from "react-router-dom";
import type { PageConfig } from "../../consts/types";

interface AsideProps {
  pages: PageConfig[];
}

const Aside = ({ pages }: AsideProps) => {
  const { pathname } = useLocation();

  return (
    <aside className="relative h-screen w-auto">
      <img
        src="/images/aside.png"
        alt=""
        className="h-full w-auto object-contain"
      />
      <nav className="absolute inset-0 p-4">
        {pages.map(({ label, path, icon }) => {
          const to = `/${path}`;
          const isActive = pathname === to;
          return (
            <Link
              key={path}
              to={to}
              className={`flex items-center mb-4 hover:underline ${
                isActive ? "text-blue-500 font-bold" : "text-white"
              }`}
            >
              <img src={icon} alt="" className="w-5 h-5 mr-2" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;
