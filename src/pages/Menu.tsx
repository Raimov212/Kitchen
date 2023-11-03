import { AddButton } from "../assets/logos/AddButton";
import { ThreeDot } from "../assets/logos/ThreeDot";
import { useEffect, useState } from "react";
import CreateFoodsCategory from "../components/menu/createFoodCategoryMenu/createFoodCategory";
import { Link } from "react-router-dom";
import { Data } from "../data/data";

const Menu = () => {
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);

  const getAllCategoryFood = async () => {};

  useEffect(() => {
    getAllCategoryFood();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-medium">Menu</div>
        <div
          onClick={() => setOpenCreateUsers((prev) => !prev)}
          className="bg-primary w-[32px] h-[32px] rounded-lg cursor-pointer"
        >
          <AddButton />
        </div>
      </div>
      {openCreateUsers && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-10"
          onClick={() => setOpenCreateUsers(false)}
        ></div>
      )}
      {openCreateUsers && (
        <CreateFoodsCategory setOpenCreateGoodsProps={setOpenCreateUsers} />
      )}
      <div className="grid grid-cols-3 gap-4">
        {Data?.map((item, index) => (
          <Link
            to={`/${item.id}`}
            key={index}
            className="w-full h-[200px] bg-secondary rounded-lg flex flex-col
           items-center justify-center gap-2 shadow-md relative"
          >
            <div className="absolute top-4 right-4 cursor-pointer">
              <ThreeDot />
            </div>
            <img src={item.img} alt="food" />
            <div className="font-semibold">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
