import { NavLink } from "react-router-dom";
import { SidebarAdvertising } from "../assets/logos/sidebar-logo/SidebarAdvertising";
// import { SidebarMenu } from "../assets/logos/sidebarLogo/SidebarMenu";
import { SiteLogo } from "../assets/logos/sidebar-logo/SiteLogo";
import { SidebarClose } from "../assets/logos/sidebar-logo/SidebarClose";
import { useState } from "react";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div
      className={`pt-[42px] px-[12px] relative ${
        openSidebar ? "flex-[1.1]" : "flex-[0.1]"
      }  flex-[0.1] bg-secondary`}
    >
      <div
        onClick={() => setOpenSidebar((prev) => !prev)}
        className="bg-close p-[4px] absolute top-10 right-[-10px] rounded-lg cursor-pointer"
      >
        <SidebarClose />
      </div>
      <div className="mb-[16px] ml-4">{openSidebar && <SiteLogo />}</div>
      <div className="flex flex-col gap-[8px]">
        {/* <SidebarMenu /> */}
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 bg-primary px-[12px] py-[8px] rounded-lg text-white"
              : "flex gap-2 px-[12px] py-[8px] rounded-lg text-primary transition-all ease-in-out"
          }
          to={"/"}
        >
          <SidebarAdvertising />
          {openSidebar && <div className="text-base">Menu</div>}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 bg-primary px-[12px] py-[8px] rounded-lg text-white"
              : "flex gap-2 px-[12px] py-[8px] rounded-lg text-primary transition-all ease-in-out"
          }
          to={"/advertising"}
        >
          <SidebarAdvertising />
          {openSidebar && <div className="text-base">Yangi Ovqatlar</div>}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex gap-2 bg-primary px-[12px] py-[8px] rounded-lg text-white"
              : "flex gap-2 px-[12px] py-[8px] rounded-lg text-primary transition-all ease-in-out"
          }
          to={"/employee"}
        >
          <SidebarAdvertising />
          {openSidebar && <div className="text-base">Ishchilar</div>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
