import { ChangeEvent, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import apiToken from "../../../api/token";
import { storage } from "../../../data/firebase";
import { useAppSelector } from "../../../hook/redux";
import { AddImgButton } from "../../../assets/logos/AddImgButton";

const AdvertisingCreate = () => {
  const token = useAppSelector((state) => state.restore.token);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [advertisingImageUrl, setAdvertisingImageUrl] = useState<string>("");
  const [errorsStatusCode, setErrorStatusCode] = useState<string | null>("");
  const [successStatus, setSuccessStatus] = useState<string | null>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleChangeSaveImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `advertising/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      return setAdvertisingImageUrl(url);
    });
  };

  const postImageUrl = async () => {
    try {
      const res = await apiToken.post("/banners/create", advertisingImageUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        setSuccessStatus("Rasm Yuklandi");
      } else {
        setErrorStatusCode("Rasm Yuklanmadi");
      }
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("advertisingImageUrl", advertisingImageUrl);

  return (
    <div
      className="fixed left-[25%] top-[250px] bg-white w-[100vh] h-[30vh] 
    overflow-hidden z-10 rounded-xl py-[32px] px-[40px] flex flex-col items-center gap-4 "
    >
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
        onClick={postImageUrl}
        disabled={advertisingImageUrl ? false : true}
        className={`rounded-lg py-2 te px-11 bg-primary text-white w-[200px] h-auto `}
      >
        Saqlash
      </button>
      <div className="flex flex-col">
        <div className="text-green-500 font-normal text-center">
          {successStatus}
        </div>
        <div className="text-red-500 font-normal text-center">
          {errorsStatusCode}
        </div>
      </div>
    </div>
  );
};

export default AdvertisingCreate;
