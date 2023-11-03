import { AddButton } from "../assets/logos/AddButton";
import { ThreeDot } from "../assets/logos/ThreeDot";
import { useEffect, useState } from "react";
import CreateFoodsCategory from "../components/menu/createFoodCategoryMenu/createFoodCategory";
import { Link } from "react-router-dom";
// import { Data } from "../data/data";
import apiToken from "../api/token";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { getAllCategories } from "../redux/restoreRedux/restoreSlice";
import { categoriesType } from "../redux/restoreRedux/restoreSliceType";

const Menu = () => {
  const token = useAppSelector((state) => state.restore.token);
  const categoriesAllDataType = useAppSelector(
    (state) => state.restore.categoriesAll
  );
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const categoriesAllData =
    categoriesAllDataType[0] as unknown as categoriesType[];

  useEffect(() => {
    getAllCategoryFood();
  }, [0]);

  const getAllCategoryFood = async () => {
    const res = await apiToken.get("/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllCategories(res.data));
  };

  const handleClickDelete = async (id: string) => {
    const res = await apiToken.delete(`/categories/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setOpenDeleteModal((prev) => !prev);
      window.location.reload();
    }
    console.log("res", res);
  };

  // console.log("categoriesAllData", categoriesAllData);

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
        {categoriesAllData?.map((item) => (
          <div className="relative" key={item.id}>
            <Link
              to={`/foods/${item.id}`}
              className="w-full h-[200px] bg-secondary rounded-lg flex flex-col
           items-center justify-center gap-2 shadow-md "
            >
              <img src={item.photoUrl} alt="food" />
              <div className="font-semibold">{item.name}</div>
            </Link>
            <button
              onClick={() => setOpenSettings(openSettings ? "" : item.id)}
              className="absolute top-4 right-4 cursor-pointer w-8 flex items-center justify-center h-8 z-50"
            >
              <ThreeDot />
            </button>
            <div className="absolute top-0 right-[-40px] z-20 transition-all ease-in-out">
              {openSettings === item.id && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setOpenDeleteModal((prev) => !prev)}
                    className="rounded-lg  text-white bg-red-600 p-[2px] "
                  >
                    delete
                  </button>
                  <button className="rounded-lg  text-white bg-yellow-500 p-[2px]">
                    edit
                  </button>
                </div>
              )}
            </div>
            {openDeleteModal && (
              <div
                className="fixed left-[35%] top-[300px] bg-primary w-[50vh] h-[20vh] 
               overflow-hidden z-50 rounded-xl py-[32px] px-[40px] flex flex-col items-center justify-center gap-2 "
              >
                <div className="text-white">Malumotni o'chirmoqchimiz</div>
                <div className="flex gap-2">
                  <button
                    className="rounded-lg  text-white bg-yellow-500 w-[100px] p-[2px] h-10"
                    onClick={() => setOpenDeleteModal((prev) => !prev)}
                  >
                    Close
                  </button>
                  <button
                    className="rounded-lg  text-white bg-red-600 w-[100px] p-[2px] h-10"
                    onClick={() => handleClickDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
