import { useState } from "react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-8 left-8 border-2 border-green rounded-3xl px-4 py-2">
      <button className="flex items-center gap-1 cursor-pointer" onClick={() => setOpen(!open)}>
        <img src="/images/icons/user.svg" alt="user"/>
        <p className="text-green ml-2">مهمان</p>
        <img src={open ? "/images/icons/lift.svg" : "/images/icons/drop.svg"} alt="drop"/>
      </button>
      {open && 
        <>
          <hr className="border-green my-2"/>
          <button className="flex items-center gap-1 cursor-pointer">
            <img src="/images/icons/logout.svg" alt="logout"/>
            <p className="text-green">خروج</p>
          </button>
        </>
      }
    </div>
  );
}

export default UserMenu;