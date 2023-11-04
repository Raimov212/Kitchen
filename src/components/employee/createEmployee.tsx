import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { FoodCategoryType } from "./createEmployeeType";
// import { t } from "i18next";
// import { ToastContainer, toast } from "react-toastify";
// import { ModalClose } from "../../assets/logos/ModalClose";
import { useAppSelector } from "../../hook/redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../data/firebase";
import { AddImgButton } from "../../assets/logos/AddImgButton";

enum roleAdmin {
  "ROLE_ADMIN" = "Admin",
  "ROLE_DEVELOPER" = "Developer",
  "ROLE_DIRECTOR" = "Director",
  "ROLE_COOKER" = "Cooker",
  "ROLE_SUPPLIER" = "Supplier",
}

const RoleData: string[] = [
  "ROLE_ADMIN",
  "ROLE_DEVELOPER",
  "ROLE_DIRECTOR",
  "ROLE_COOKER",
  "ROLE_SUPPLIER",
];

type RoleStrings = keyof typeof roleAdmin;

const CreateEmployee: React.FC<FoodCategoryType> = ({
  setOpenCreateGoodsProps,
  createFoodsCategoryState,
  setCreateFoodsCategoryState,
  createUserForm,
  statusCode,
  successStatus,
}): JSX.Element => {
  const [roleState, setRoleState] = useState("ROLE_ADMIN");
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCreateFoodsCategoryState({
        ...createFoodsCategoryState,
        [e.target.name]: e.target.value,
      });
    },
    [createFoodsCategoryState]
  );

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const result: RoleStrings = e.target.value;
    setRoleState(e.target.value);
    console.log("res", roleAdmin[result]);
    setCreateFoodsCategoryState((prev) => ({
      ...prev,
      role: result.toString(),
    }));
    // console.log("roledata", result.toString());
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleChangeSaveImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `employee/${imageUpload.name}`);
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
      role: roleState ?? "ROLE_ADMIN",
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

  console.log("createFoodsCategoryState", createFoodsCategoryState);

  return (
    <div
      className="fixed left-[25%] top-[50px] bg-white w-[100vh] h-[90vh] 
     overflow-hidden z-10 rounded-xl py-[32px] px-[40px] flex flex-col gap-2 overflow-y-scroll"
    >
      <div className="text-2xl font-medium ">Kategoriya malumotlari</div>
      <form onSubmit={createUserForm} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2 ">
          <div className=" text-md font-medium">Ismi</div>
          <input
            type="text"
            name="name"
            className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Ismi"
            value={createFoodsCategoryState.name}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium">Familiyasi</div>
          <input
            type="text"
            name="surname"
            className="outline-none border-[1.8px] border-primary placeholder:text-black placeholder:text-sm rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Familiyasi"
            value={createFoodsCategoryState.surname}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium">Telefon raqami</div>
          <input
            type="text"
            name="phone"
            className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Telefon raqami"
            value={createFoodsCategoryState.phone}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-md font-medium">Paroli</div>
          <input
            type="text"
            name="password"
            className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-full"
            placeholder="Paroli"
            value={createFoodsCategoryState.password}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Foydalanuvchi Toifasi</div>
          <select
            className="outline-none border-[1.8px] placeholder:text-black placeholder:text-sm border-primary rounded-lg p-2 visible focus:border-secondary w-[170px]"
            value={roleState}
            onChange={handleRoleChange}
          >
            {RoleData.map((item, index) => (
              <option key={index} value={item}>
                {roleAdmin[item]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 items-end w-full">
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
          disabled={createFoodsCategoryState.photoUrl ? false : true}
          type="submit"
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

export default CreateEmployee;
