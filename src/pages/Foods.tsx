import { AddButton } from "../assets/logos/AddButton";
import { ThreeDot } from "../assets/logos/ThreeDot";
import { useEffect, useState } from "react";
import CreateFoodsCategory from "../components/menu/createFoodsMenu/createFoods";
import { Link, useParams } from "react-router-dom";
// import { Data } from "../data/data";
import apiToken from "../api/token";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { getAllFoods } from "../redux/restoreRedux/restoreSlice";
import { foodsType } from "../redux/restoreRedux/restoreSliceType";
import React from "react";

const Foods = () => {
  const token = useAppSelector((state) => state.restore.token);
  const foodsAllDataType = useAppSelector((state) => state.restore.foodsAll);
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);

  const [dataFood, setDataFood] = useState([]);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  console.log(id);

  const foodsAllData = foodsAllDataType[0] as unknown as foodsType[];

  useEffect(() => {
    getAllFoodsFunction();
  }, [0]);

  const getAllFoodsFunction = async () => {
    const res = await apiToken.get(`/foods/all-by-category-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("res", res);
    dispatch(getAllFoods(res.data));
  };

  console.log("dataFood", dataFood);

  console.log("foodsAllData", foodsAllData);
  return (
    <div>
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
          id={id}
        />
      )}
      <div className="grid grid-cols-3 gap-4">
        {foodsAllData?.map((item, index) => (
          <div
            // to={`/foods/s${item.id}`}
            key={index}
            className="w-full h-[200px] bg-secondary rounded-lg flex flex-col
           items-center justify-center gap-2 shadow-md relative"
          >
            <div className="absolute top-4 right-4 cursor-pointer">
              <ThreeDot />
            </div>
            <img src={item.photoUrl} alt="food" />
            <div className="font-semibold">{item.name}</div>
            <div className="font-semibold">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
