import { AddButton } from "../assets/logos/AddButton";
import { ThreeDot } from "../assets/logos/ThreeDot";
import { useEffect, useState } from "react";
import CreateFoodsCategory from "../components/menu/createFoodsMenu/createFoods";
import { useNavigate, useParams } from "react-router-dom";
// import { Data } from "../data/data";
import apiToken from "../api/token";
import { useAppSelector } from "../hook/redux";
import { foodsType } from "../redux/restoreRedux/restoreSliceType";

const Foods = () => {
  const token = useAppSelector((state) => state.restore.token);
  // const foodsAllDataType = useAppSelector((state) => state.restore.foodsAll);
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);
  const [dataFood, setDataFood] = useState<foodsType[] | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // const foodsAllData = foodsAllDataType[0] as unknown as foodsType[];

  useEffect(() => {
    getAllFoodsFunction();
  }, []);

  const getAllFoodsFunction = async () => {
    const res = await apiToken.get(`/foods/all-by-category-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDataFood(res.data);
  };

  console.log("dataFood", dataFood);

  const handlePreviewPage = () => {
    navigate("/");
    setDataFood(null);
    // dispatch(getAllFoods(null));
  };

  // const path = window.location.pathname.split("/");

  // useEffect(() => {
  //   if (!path.includes("foods")) {
  //     console.log("not page");
  //   } else {
  //     console.log("ok page");
  //   }
  // }, [path]);

  return (
    <div>
      <button
        onClick={handlePreviewPage}
        className="bg-primary text-white px-4 rounded-lg hover:scale-105"
      >
        Left
      </button>
      <div className="flex justify-between">
        <div className="text-3xl font-medium">Foods</div>
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
        <CreateFoodsCategory
          setOpenCreateGoodsProps={setOpenCreateUsers}
          id={id}
        />
      )}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {dataFood !== null &&
          dataFood?.map((item, index) => (
            <div
              // to={`/foods/s${item.id}`}
              key={index}
              className="w-full h-full bg-secondary rounded-lg flex flex-col
           items-center justify-center gap-2 shadow-md relative"
            >
              <div className="absolute top-4 right-4 cursor-pointer">
                <ThreeDot />
              </div>
              <img
                src={item.photoUrl}
                className="w-full h-[170px] object-cover rounded-lg"
                alt="food"
              />
              <div className="font-semibold">{item.name}</div>
              <div className="font-semibold">{item.description}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Foods;
