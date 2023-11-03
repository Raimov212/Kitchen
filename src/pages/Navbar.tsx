import { NavbarRingtone } from "../assets/logos/navbar-logo/NavbarRingtone";
import { NavbarClock } from "../assets/logos/navbar-logo/NavbarClock";
import { NavbarSearch } from "../assets/logos/navbar-logo/NavbarSearch";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <div>Navbar</div>
      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          <NavbarRingtone />
        </div>
        <div className="cursor-pointer">
          <NavbarClock />
        </div>
        <div className=" text-secondary relative px-[12x] py-[8px] bg-secondary w-[350px] rounded-[10px] flex items-center">
          <div className="ml-2">
            <NavbarSearch />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="pl-[4px] w-[90%] bg-none outline-none bg-secondary "
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
