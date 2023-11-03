import { AddButton } from "../../../assets/logos/AddButton";
import Food3 from "../../../assets/image/menu-image/food3.png";
import { ThreeDot } from "../../../assets/logos/ThreeDot";
import { useState } from "react";
import CreateFoodsCategory from "../createFoodCategoryMenu/createFoodCategory";

const data = [
  {
    img: Food3,
    title: "O’zingiz tanlang",
  },
  {
    img: Food3,
    title: "Tayyor taomlar",
  },
  {
    img: Food3,
    title: "Salatlar",
  },
  {
    img: Food3,
    title: "Non va shirinliklar",
  },
  {
    img: Food3,
    title: "Ichimliklar",
  },
  {
    img: Food3,
    title: "Tayyor set",
  },
];

const FoodsLIst = () => {
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-medium">FoodsLIst</div>
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
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full h-[200px] bg-secondary rounded-lg flex flex-col
           items-center justify-center gap-2 shadow-md relative"
          >
            <div className="absolute top-4 right-4 cursor-pointer">
              <ThreeDot />
            </div>
            <img src={item.img} alt="food" />
            <div className="font-semibold">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodsLIst;
