import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { FoodCategoryType } from "./createFoodsType";
import apiToken from "../../../api/token";
// import { t } from "i18next";
import { AddImgButton } from "../../../assets/logos/AddImgButton";
import "./Foods.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../data/firebase";
import { useAppSelector } from "../../../hook/redux";
// import { categoriesType } from "../../../redux/restoreRedux/restoreSliceType";

type ImageType = File | null;

const CreateFoods: React.FC<FoodCategoryType> = ({
  setOpenCreateGoodsProps,
  id,
}): JSX.Element => {
  // const categoryTypeListType = useAppSelector(
  //   (state) => state.restore.categoriesAll
  // );

  // const categoriesListData =
  //   categoryTypeListType[0] as unknown as categoriesType[];

  const token = useAppSelector((state) => state.restore.token);
  const [imageUpload, setImageUpload] = useState<ImageType>(null);
  const [statusFood, setStatusFood] = useState<string>("ACTIVE");
  const [statusCode, setStatusCode] = useState<string | null>("");
  const [successStatus, setSuccessStatus] = useState("");
  const [foodType, setFoodType] = useState<string>("SIMPLE");
  // const [categoryType, setCategoryType] = useState<string>("Caategory Tanlang");

  console.log("statusFood", statusFood);

  const [createFoodsCategoryState, setCreateFoodsCategoryState] = useState({
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

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCreateFoodsCategoryState({
        ...createFoodsCategoryState,
        [e.target.name]: e.target.value,
      });
    },
    [createFoodsCategoryState]
  );

  const handleFoodType = (e: ChangeEvent<HTMLSelectElement>) => {
    setFoodType(e.target.value);
    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      foodType: e.target.value,
    }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFood(e.target.value);
    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleChangeSaveImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `create-foods-image/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      return await getDownloadURL(snapshot.ref).then((url) => {
        return setCreateFoodsCategoryState((prev) => ({
          ...prev,
          photoUrl: url,
        }));
      });
    });
    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      foodType: foodType ?? "SIMPLE",
      status: statusFood ?? "ACTIVE",
    }));
  };

  useEffect(() => {
    const handleKeydown = (event: { key: string | undefined }) => {
      if (event.key == undefined) {
        return;
      } else if (event.key === "Escape") {
        setOpenCreateGoodsProps((prev) => !prev);
      } else {
        return;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [setOpenCreateGoodsProps]);

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
        setSuccessStatus("Ovqat ro'yhatdan o'tkazildi");
        window.location.reload();
      }

      console.log("response", res);
    } catch (error) {
      if (
        error.response.data.errorMessage === "Category name is already exist"
      ) {
        setStatusCode("Bu kategoriya oldin ro'yxatdan o'tkazilgan");
      }
      console.log("error", error);
    }
  };

  console.log("createFoodsCategoryState", createFoodsCategoryState);

  return (
    <div
      className="fixed left-[25%] top-[50px] bg-white w-[100vh] h-[90vh] 
     overflow-hidden z-10 rounded-xl py-[32px] px-[40px] flex flex-col gap-2"
    >
      {/* <div className="flex justify-end">
        <ModalClose />
      </div> */}
      <div className="text-2xl font-medium ">Kategoriya malumotlari</div>
      <form
        onSubmit={createUserForm}
        className="flex flex-col gap-4 overflow-y-scroll"
      >
        <div className="flex justify-between gap-8">
          <div className="w-full">
            <div className="flex flex-col gap-2 ">
              <div className=" text-md font-medium">Ovqat nomi O‘zbek</div>
              <input
                type="text"
                name="nameUz"
                className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="Ovqat nomi"
                value={createFoodsCategoryState.nameUz}
                autoComplete="on"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-md font-medium">Название еды</div>
              <input
                type="text"
                name="nameRu"
                className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="Название еды"
                value={createFoodsCategoryState.nameRu}
                autoComplete="on"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-md font-medium">The name of the food</div>
              <input
                type="text"
                name="nameEn"
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="The name of the food"
                value={createFoodsCategoryState.nameEn}
                autoComplete="on"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="text-md font-medium">Izoh Uzbek</div>
              <input
                type="text"
                name="descriptionUz"
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="Izoh Uzbek"
                value={createFoodsCategoryState.descriptionUz}
                autoComplete="on"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-md font-medium">Примечание Русский</div>
              <input
                type="text"
                name="descriptionRu"
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="Примечание Русский"
                value={createFoodsCategoryState.descriptionRu}
                autoComplete="on"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-md font-medium">Note english</div>
              <input
                type="text"
                name="descriptionEn"
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="Note english"
                value={createFoodsCategoryState.descriptionEn}
                autoComplete="on"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div>Ovqat statusi</div>
            <select
              className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-[150px]"
              value={statusFood}
              onChange={handleStatusChange}
            >
              <option value="ACTIVE">Faol</option>
              <option value="NOT_ACTIVE">Faol emas</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>Ovqat turi</div>
            <select
              className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-[170px]"
              value={foodType}
              onChange={handleFoodType}
            >
              <option value="SIMPLE">Oddiy</option>
              <option value="SET">O'zgaruvchan</option>
            </select>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <div className="text-md font-medium">Kila kaloriya</div>
            <input
              type="number"
              name="kkal"
              className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
              placeholder="Kila kaloriya"
              value={createFoodsCategoryState.kkal}
              autoComplete="on"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-md font-medium">Narxi</div>
            <input
              type="number"
              name="price"
              className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
              placeholder="Narxi"
              value={createFoodsCategoryState.price}
              autoComplete="on"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col w-full">
            <div className="text-md font-medium">
              Rasm Yuklash PNG, JPG (345x180px)
            </div>
            <div className="inputFileBox bg-secondary">
              <label htmlFor="inputFile" className="cursor-pointer">
                <div className="text-[#7A7A7A]  font-semibold h-full flex items-center">
                  <div className="text-4xl ">
                    {imageUpload?.name ? "" : <AddImgButton />}
                  </div>
                  <div className="font-normal ml-[10px]">
                    {imageUpload?.name ?? "Rasm yuklash"}
                  </div>
                </div>
                <input
                  id="inputFile"
                  type="file"
                  name="userPasswordConfirm"
                  className="outline-none border-[1px] border-primary rounded-lg p-2 visible focus:border-secondary w-full"
                  autoComplete="on"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div
            onClick={handleChangeSaveImage}
            className="rounded-lg text-center pt-4 cursor-pointer bg-primary text-white w-[200px] h-[60px]"
          >
            Rasmni Saqlash
          </div>
        </div>

        <button
          type="submit"
          disabled={createFoodsCategoryState.photoUrl ? false : true}
          className={`rounded-lg py-2 px-11 ml-52 bg-primary text-white w-[200px] h-auto `}
        >
          Saqlash
        </button>
        <div className="text-green-500 font-normal text-center">
          {successStatus}
        </div>
        <div className="text-red-500 font-normal text-center">{statusCode}</div>
      </form>
    </div>
  );
};

export default CreateFoods;
