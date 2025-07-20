import { Link, useLocation } from "react-router-dom";
import type { AsideProps } from "../../consts/types";
import { useEffect, useState } from "react";

const Aside = ({ pages }: AsideProps) => {
  const { pathname } = useLocation();
  const [isTall, setIsTall] = useState(false);
  useEffect(() => {
    const checkHeight = () => {
      const documentHeight = document.body.scrollHeight;
      const screenHeight = window.innerHeight;
      setIsTall(documentHeight > screenHeight);
    };
    checkHeight();
    const observer = new MutationObserver(checkHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    return () => observer.disconnect();
  }, []);
  return (
    <aside className="relative w-43 min-h-screen overflow-hidden">
      <img
        src="/images/backgrounds/aside.png"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 top-[8%] mr-[18%]">
        <span className="flex items-center gap-1.5 ">
          <img src="/images/icons/three-lines.svg" alt="Ava" className="h-8 mr-2 w-[15%]" />
          <span className=" text-[clamp(0.7rem,2.8vw,1rem)] font-bold text-white pl-2">آوا</span>
        </span>
      </div>
      <nav className="absolute inset-0 top-[30%] p-1">
        {pages.map(({ label, path, icon }) => {
          const to = `/${path}`;
          const isActive = pathname === to;
          return (
            <Link
              key={path}
              to={to}
              className={`flex items-center mb-4 py-2 rounded-lg ${
                isTall ? "w-[80%]" : "w-[70%]"} ${isActive ? "bg-dark-green font-bold" : ""}`}
            >
              <img src={icon} alt="" className="h-5 mr-2 w-[15%]" />
              <span className="flex-1 text-center text-[clamp(0.5rem,2.4vw,0.8rem)] text-white pl-2">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Aside;
