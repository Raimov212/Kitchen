import { AddButton } from "../assets/logos/AddButton";
import { ThreeDot } from "../assets/logos/ThreeDot";
import { useEffect, useState } from "react";
import CreateFoodsCategory from "../components/menu/createFoodsMenu/createFoods";
import { useNavigate, useParams } from "react-router-dom";
// import { Data } from "../data/data";
import apiToken from "../api/token";
import { useAppSelector } from "../hook/redux";
import { FoodsType } from "../redux/restoreRedux/restoreSliceType";
import { FoodCategoryTypeData } from "../components/menu/createFoodsMenu/createFoodsType";

const Foods = () => {
  const { id } = useParams();

  const token = useAppSelector((state) => state.restore.token);
  // const foodsAllDataType = useAppSelector((state) => state.restore.foodsAll);
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);
  const [dataFood, setDataFood] = useState<FoodsType[] | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<string>("");
  const [statusCode, setStatusCode] = useState<string>("");
  const [successStatus, setSuccessStatus] = useState("");
  const [createFoodsCategoryState, setCreateFoodsCategoryState] =
    useState<FoodCategoryTypeData>({
      nameUz: "",
      nameRu: "",
      nameEn: "",
      descriptionUz: "",
      descriptionRu: "",
      descriptionEn: "",
      status: "",
      photoUrl: "",
      categoryId: id,
      foodType: "",
      price: 0,
      kkal: 0,
    });

  const navigate = useNavigate();

  // const foodsAllData = foodsAllDataType[0] as unknown as foodsType[];

  const getAllFoodsFunction = async () => {
    const res = await apiToken.get(`/foods/all-by-category-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDataFood(res.data);
  };
  useEffect(() => {
    getAllFoodsFunction();
  }, []);

  console.log("dataFood", dataFood);

  const handlePreviewPage = () => {
    navigate("/");
    setDataFood([]);
    // dispatch(getAllFoods(null));
  };

  const handleClickDelete = async (id: string) => {
    const res = await apiToken.delete(`/foods/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setOpenDeleteModal(false);
      getAllFoodsFunction();
    }
    console.log("res", res);
  };

  const createUserForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      createFoodsCategoryState.nameUz === "" ||
      createFoodsCategoryState.nameRu === "" ||
      createFoodsCategoryState.nameEn === "" ||
      createFoodsCategoryState.status === "" ||
      createFoodsCategoryState.categoryId === "" ||
      createFoodsCategoryState.foodType === "" ||
      createFoodsCategoryState.photoUrl === null
    ) {
      setStatusCode("Malumotlar to'liq kiritilmagan");
    }

    try {
      const res = await apiToken.post(
        "/foods/create",
        createFoodsCategoryState,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setStatusCode("");
        setCreateFoodsCategoryState((prev) => ({
          ...prev,
          descriptionUz: "",
          descriptionRu: "",
          descriptionEn: "",
          foodType: "",
          nameEn: "",
          nameRu: "",
          nameUz: "",
          photoUrl: "",
          price: 0,
          status: "",
          categoryId: "",
          kkal: 0,
        }));
        getAllFoodsFunction();
        setOpenCreateUsers((prev) => !prev);
        setSuccessStatus("");
        setSuccessStatus("Ovqat ro'yhatdan o'tkazildi");
      }

      console.log("response", res);
    } catch (error) {
      if (error) {
        setStatusCode("Bu kategoriya oldin ro'yxatdan o'tkazilgan");
      }
      console.log("error", error);
    }
  };

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
          createFoodsCategoryState={createFoodsCategoryState}
          setCreateFoodsCategoryState={setCreateFoodsCategoryState}
          statusCode={statusCode}
          createUserForm={createUserForm}
          successStatus={successStatus}
          id={undefined}
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
              <div
                onClick={() => setOpenSettings(openSettings ? "" : item.id)}
                className="absolute top-4 right-4 cursor-pointer"
              >
                <ThreeDot />
              </div>
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
                  className="fixed left-[35%] z-20 top-[300px] bg-primary w-[50vh] h-[20vh] 
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
