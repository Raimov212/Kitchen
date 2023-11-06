import { FC } from "react";
import { DataEmployeeType } from "./createEmployeeType";

const EmployeeItem: FC<DataEmployeeType> = ({
  data,
  openSettings,
  openDeleteModal,
  setOpenSettings,
  setOpenDeleteModal,
  handleClickDelete,
}): JSX.Element => {
  console.log("data", data);
  return (
    <div className="w-full h-full">
      <table>
        <thead>
          <tr className="text-secondary font-light ">
            <th>Rasmi</th>
            <th>Ismi</th>
            <th>Familiyasi</th>
            <th>Telefon raqami</th>
            <th>Xodimlarning toifasi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
              <td>
                <div className="flex items-center relative justify-center">
                  <p
                    onClick={() => setOpenSettings(openSettings ? "" : item.id)}
                    className="cursor-pointer"
                  >
                    ...
                  </p>
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
                      <div className="text-white">
                        Malumotni o'chirmoqchimiz
                      </div>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeItem;
