import { AddButton } from "../assets/logos/AddButton";
import { ThreeDot } from "../assets/logos/ThreeDot";
import { useEffect, useState } from "react";
import CreateFoodsCategory from "../components/menu/createFoodCategoryMenu/createFoodCategory";
import { Link } from "react-router-dom";
import apiToken from "../api/token";
import { useAppSelector } from "../hook/redux";
import { categoriesType } from "../redux/restoreRedux/restoreSliceType";
import { FoodCategoryTypeData } from "../components/menu/createFoodCategoryMenu/createFoodCategoryType";

const Menu = () => {
  const token = useAppSelector((state) => state.restore.token);
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [dataFood, setDataFood] = useState<categoriesType[] | null>(null);
  const [statusCode, setStatusCode] = useState("");
  const [successStatus, setSuccessStatus] = useState("");

  const [createFoodsCategoryState, setCreateFoodsCategoryState] =
    useState<FoodCategoryTypeData>({
      nameUz: "",
      nameRu: "",
      nameEn: "",
      status: "",
      photoUrl: "",
      startTime: "",
      endTime: "",
    });

  const getAllCategoryFood = async () => {
    const res = await apiToken.get("/categories/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDataFood(res.data);
  };
  useEffect(() => {
    getAllCategoryFood();
  }, []);

  const handleClickDelete = async (id: string) => {
    const res = await apiToken.delete(`/categories/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setOpenDeleteModal((prev) => !prev);
      getAllCategoryFood();
    }
    console.log("res", res);
  };

  const createUserForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      createFoodsCategoryState.nameUz === "" ||
      createFoodsCategoryState.nameRu === "" ||
      createFoodsCategoryState.nameEn === "" ||
      createFoodsCategoryState.startTime === "" ||
      createFoodsCategoryState.endTime === "" ||
      createFoodsCategoryState.status === "" ||
      createFoodsCategoryState.photoUrl === null
    ) {
      setStatusCode("Malumotlar to'liq kiritilmagan");
    }

    try {
      const res = await apiToken.post(
        "/categories/create",
        createFoodsCategoryState,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setStatusCode("");
        setSuccessStatus("Categoriya ro'yhatdan o'tkazildi");

        setCreateFoodsCategoryState((prev) => ({
          ...prev,
          nameUz: "",
          nameRu: "",
          nameEn: "",
          status: "",
          photoUrl: "",
          startTime: "",
          endTime: "",
        }));
        setStatusCode("");
        setSuccessStatus("");
        getAllCategoryFood();
      }

      setOpenCreateUsers(false);

      console.log("response", res);
    } catch (error) {
      if (error) {
        setStatusCode("Bu kategoriya oldin ro'yxatdan o'tkazilgan");
      }
    }
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
        <CreateFoodsCategory
          createFoodsCategoryState={createFoodsCategoryState}
          setCreateFoodsCategoryState={setCreateFoodsCategoryState}
          setOpenCreateGoodsProps={setOpenCreateUsers}
          createUserForm={createUserForm}
          statusCode={statusCode}
          successStatus={successStatus}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        {dataFood?.map((item) => (
          <div className="relative" key={item.id}>
            <Link
              to={`/foods/${item.id}`}
              className="w-full h-[200px] bg-primary rounded-lg flex flex-col
           items-center justify-center gap-2 shadow-md "
            >
              <img
                src={item.photoUrl}
                alt="food"
                className="w-full h-[170px] object-cover rounded-lg"
              />
              <div className="font-semibold text-white">{item.name}</div>
            </Link>
            <button
              onClick={() => setOpenSettings(openSettings ? "" : item.id)}
              className="absolute top-4 right-4 cursor-pointer w-8 flex items-center justify-center h-8 z-20"
            >
              <ThreeDot />
            </button>
            <div className="absolute top-0 right-[-40px] z-10 transition-all ease-in-out">
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
                className="fixed left-[35%] z-30 top-[300px] bg-primary w-[50vh] h-[20vh] 
               overflow-hidden rounded-xl py-[32px] px-[40px] flex flex-col items-center justify-center gap-2 "
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
