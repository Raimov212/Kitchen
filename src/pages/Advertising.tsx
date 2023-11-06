import { useEffect, useState } from "react";
import apiToken from "../api/token";
import { AddButton } from "../assets/logos/AddButton";
import AdvertisingCreate from "../components/advertising/createAdvertising/createAdvetising";
import { useAppSelector } from "../hook/redux";
import "../components/employee/Employee.css";
import { ThreeDot } from "../assets/logos/ThreeDot";

interface AdvertisingDataType {
  id: string;
  photoUrl: string;
}

const Advertising = () => {
  const token = useAppSelector((state) => state.restore.token);
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<string>("");
  const [advertisingData, setAdvertisingData] = useState<AdvertisingDataType[]>(
    []
  );

  const getAdvertising = async () => {
    try {
      const res = await apiToken.get("/banners/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setAdvertisingData(res.data);
        setOpenCreateUsers(false);
      }
      console.log("res", res);
      // console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = async (id: string) => {
    const res = await apiToken.delete(`/banners/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setOpenDeleteModal((prev) => !prev);
      getAdvertising();
      setOpenDeleteModal(false);
    }
    console.log("res", res);
  };

  useEffect(() => {
    getAdvertising();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl font-medium">Reklama</div>
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
      <div className="grid grid-cols-3 w-full gap-4">
        {advertisingData?.map((item) => (
          <div className="border-[1px] border-gray-400 relative" key={item.id}>
            <img
              src={item.photoUrl
                .split("")
                .slice(1, item.photoUrl.length - 1)
                .join("")}
              className="w-[400px] h-[200px] object-cover"
              alt=""
            />
            <button
              onClick={() => setOpenSettings(openSettings ? "" : item.id)}
              className="absolute top-4 right-4 cursor-pointer"
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
          </div>
        ))}
      </div>

      {openCreateUsers && <AdvertisingCreate />}
    </div>
  );
};

export default Advertising;
