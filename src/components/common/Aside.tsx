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
        src="/images/backgrounds/aside.png"
        alt=""
        className="h-full w-auto object-contain"
      />
      <nav className="absolute inset-0 p-1">
        {pages.map(({ label, path, icon }) => {
          const to = `/${path}`;
          const isActive = pathname === to;
          return (
            <Link
              key={path}
              to={to}
              className={`flex items-center mb-4 hover:underline w-[70%] ${
                isActive ? "bg-gray-100 font-bold" : "text-white"
              }`}
            >
              <img src={icon} alt="" className="h-5 mr-2 w-[20%]" />
              <span className="flex-1 text-[clamp(0.6rem,2.5vw,0.9rem)]">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;
