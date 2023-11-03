import { useState, useCallback, useEffect, ChangeEvent } from "react";
import {
  FoodItemListType,
  FoodItemListTypeData,
} from "./createFoodsItemListType";
// import { getGoodsApi } from "../../../api/goodsApi";
// import { useAppSelector } from "../../../hook";
// import { t } from "i18next";
// import { ToastContainer, toast } from "react-toastify";
// import { AxiosResponse } from "axios";
// import "../Doctors.css";
// import { ModalClose } from "../../assets/logos/ModalClose";
import { AddImgButton } from "../../../../assets/logos/AddImgButton";
import "./Foods.css";

const CreateFoodsItemList: React.FC<FoodItemListType> = ({
  setOpenCreateGoodsProps,
}): JSX.Element => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [createFoodsCategoryState, setCreateFoodsCategoryState] =
    useState<FoodItemListTypeData>({
      categoryNameUz: "",
      categoryNameUzbekRu: "",
      categoryNameEng: "",
      file: null,
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileSelected(e.target.files[0]);
    }
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

  const createUserForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("fileSelected", fileSelected);
    // const resolveWithSomeData = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (createFoodsCategoryState.categoryNameUz === "") {
    //       reject("Foydalanuvchi nomi kiritilmagan");
    //     } else if (createFoodsCategoryState.categoryNameUzbekRu === "") {
    //       reject("Foydalanuvchi paroli kiritilmagan");
    //     } else if (createFoodsCategoryState.categoryNameEng === "") {
    //       reject("Tekshiruv paroli kiritilmagan");
    //     } else {
    //       resolve("Foydalanuvchi Ro'yhatdan o'tkazildi");
    //     }
    //   }, 3000);
    // });
    // toast.promise(resolveWithSomeData, {
    //   pending: {
    //     render() {
    //       return "Malumot Yuklanyapti";
    //     },
    //     icon: false,
    //   },
    //   success: {
    //     render({ data }) {
    //       return `${data}`;
    //     },
    //   },
    //   error: {
    //     render({ data }) {
    //       return `${data}`;
    //     },
    //   },
    // });

    const formData = new FormData();
    if (fileSelected) {
      formData.append("file", fileSelected);
    }

    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      categoryNameEng: "",
      categoryNameUzbekRu: "",
      categoryNameUz: "",
      file: null,
    }));

    return console.log(createFoodsCategoryState);
  };

  return (
    <div
      className="fixed left-[25%] top-[10%] bg-white w-[100vh] h-[80vh] 
     overflow-hidden z-10 rounded-xl py-[32px] px-[40px] flex flex-col gap-4 "
    >
      {/* <div className="flex justify-end">
        <ModalClose />
      </div> */}
      <div className="text-2xl font-medium ">Kategoriya malumotlari</div>
      <form onSubmit={createUserForm} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2 ">
          <div className=" text-md font-medium">Kategoriya nomi O‘zbek</div>
          <input
            type="text"
            name="categoryNameUz"
            className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Kategoriya nomi"
            value={createFoodsCategoryState.categoryNameUz}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium">Название категории Русский</div>
          <input
            type="text"
            name="categoryNameUzbekRu"
            className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Название категории"
            value={createFoodsCategoryState.categoryNameUzbekRu}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium">Category name English</div>
          <input
            type="text"
            name="categoryNameEng"
            className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Category name"
            value={createFoodsCategoryState.categoryNameEng}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium">
            Rasm Yuklash PNG, JPG (345x180px)
          </div>
          <div className="inputFileBox bg-secondary">
            <label htmlFor="inputFile" className="cursor-pointer">
              <div className="text-[#7A7A7A]  font-semibold h-full flex items-center">
                <div className="text-4xl ">
                  {fileSelected?.name ? "" : <AddImgButton />}
                </div>
                <div className="font-normal ml-[10px]">
                  {fileSelected?.name ?? "Rasm yuklash"}
                </div>
              </div>
              <input
                id="inputFile"
                type="file"
                name="userPasswordConfirm"
                className="outline-none border-[1px] border-primary rounded-lg p-2 visible focus:border-secondary w-full"
                placeholder="Parolni tasdiqlash"
                autoComplete="on"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-lg py-2 px-11 ml-52 bg-primary text-white w-[200px] h-auto"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default CreateFoodsItemList;
