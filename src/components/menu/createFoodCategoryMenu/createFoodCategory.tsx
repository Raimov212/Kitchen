import { useState, useCallback, useEffect, ChangeEvent } from "react";
import {
  FoodCategoryType,
  // FoodCategoryTypeData,
} from "./createFoodCategoryType";
// import apiToken from "../../../api/token";
// import { t } from "i18next";
// import { ToastContainer, toast } from "react-toastify";
// import { ModalClose } from "../../assets/logos/ModalClose";
import { AddImgButton } from "../../../assets/logos/AddImgButton";
import "./Foods.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../data/firebase";
// import { useAppSelector } from "../../../hook/redux";
// import { experimentalSetDeliveryMetricsExportedToBigQueryEnabled } from "firebase/messaging/sw";

type ImageType = File | null;

const CreateFoodsCategory: React.FC<FoodCategoryType> = ({
  setOpenCreateGoodsProps,
  createFoodsCategoryState,
  setCreateFoodsCategoryState,
  createUserForm,
  statusCode,
  successStatus,
}): JSX.Element => {
  // const token = useAppSelector((state) => state.restore.token);
  const selectTimeDate: string[] = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];
  const [imageUpload, setImageUpload] = useState<ImageType>(null);
  const [startTimeFood, setStartTimeFood] = useState("09:00");
  const [endTimeFood, setEndTimeFood] = useState("19:00");
  const [statusFood, setStatusFood] = useState("ACTIVE");
  // const [statusCode, setStatusCode] = useState<string | null>("");
  // const [successStatus, setSuccessStatus] = useState("");

  console.log("statusFood", statusFood);

  // const [createFoodsCategoryState, setCreateFoodsCategoryState] =
  //   useState<FoodCategoryTypeData>({
  //     nameUz: "",
  //     nameRu: "",
  //     nameEn: "",
  //     status: "",
  //     photoUrl: "",
  //     startTime: "",
  //     endTime: "",
  //   });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCreateFoodsCategoryState({
        ...createFoodsCategoryState,
        [e.target.name]: e.target.value,
      });
    },
    [createFoodsCategoryState, setCreateFoodsCategoryState]
  );

  const handleStartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStartTimeFood(e.target.value);
    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      startTime: e.target.value,
    }));
  };

  const handleEndChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEndTimeFood(e.target.value);
    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      endTime: e.target.value,
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
    const imageRef = ref(storage, `create-category-image/${imageUpload.name}`);
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
      startTime: startTimeFood ?? "09:00",
      endTime: endTimeFood ?? "19:00",
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

  // const createUserForm = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   if (
  //     createFoodsCategoryState.nameUz === "" ||
  //     createFoodsCategoryState.nameRu === "" ||
  //     createFoodsCategoryState.nameEn === "" ||
  //     createFoodsCategoryState.startTime === "" ||
  //     createFoodsCategoryState.endTime === "" ||
  //     createFoodsCategoryState.status === "" ||
  //     createFoodsCategoryState.photoUrl === null
  //   ) {
  //     setStatusCode("Malumotlar to'liq kiritilmagan");
  //   }

  //   try {
  //     const res = await apiToken.post(
  //       "/categories/create",
  //       createFoodsCategoryState,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (res.status === 200) {
  //       setStatusCode("");
  //       setSuccessStatus("Categoriya ro'yhatdan o'tkazildi");
  //     }

  //     console.log("response", res);
  //   } catch (error) {
  //     if (
  //       error.response.data.errorMessage === "Category name is already exist"
  //     ) {
  //       setStatusCode("Bu kategoriya oldin ro'yxatdan o'tkazilgan");
  //     }
  //     console.log("error", error);
  //   }
  // };

  console.log("createFoodsCategoryState", createFoodsCategoryState);

  return (
    <div
      className="fixed left-[25%] top-[50px] bg-white w-[100vh] h-[90vh] 
    overflow-hidden z-50 rounded-xl py-[32px] px-[40px] "
    >
      <div className="flex flex-col gap-2 ">
        <div className="text-2xl font-medium ">Kategoriya malumotlari</div>
        <form onSubmit={createUserForm} className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2 ">
            <div className=" text-md font-medium">Kategoriya nomi O‘zbek</div>
            <input
              type="text"
              name="nameUz"
              className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
              placeholder="Kategoriya nomi"
              value={createFoodsCategoryState.nameUz}
              autoComplete="on"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-md font-medium">
              Название категории Русский
            </div>
            <input
              type="text"
              name="nameRu"
              className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
              placeholder="Название категории"
              value={createFoodsCategoryState.nameRu}
              autoComplete="on"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-md font-medium">Category name English</div>
            <input
              type="text"
              name="nameEn"
              className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
              placeholder="Category name"
              value={createFoodsCategoryState.nameEn}
              autoComplete="on"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div>Boshlanish vaqti</div>
              <select
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-[170px]"
                value={startTimeFood}
                onChange={handleStartChange}
              >
                {selectTimeDate.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>Tugash vqti</div>
              <select
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-[170px]"
                value={endTimeFood}
                onChange={handleEndChange}
              >
                {selectTimeDate.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>Faolligi</div>
              <select
                className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-[170px]"
                value={statusFood}
                onChange={handleStatusChange}
              >
                <option value="ACTIVE">Faol</option>
                <option value="NOT_ACTIVE">Faol emas</option>
              </select>
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
          <div className="text-red-500 font-normal text-center">
            {statusCode}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodsCategory;
