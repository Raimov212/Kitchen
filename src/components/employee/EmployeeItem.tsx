import { FC } from "react";
import { DataEmployeeType } from "./createEmployeeType";

const EmployeeItem: FC<DataEmployeeType> = ({ data }): JSX.Element => {
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
                <div className="flex items-center justify-center">
                  <p className="cursor-pointer">...</p>
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
