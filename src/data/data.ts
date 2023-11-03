import Food1 from "../assets/image/menu-image/food1.png";
import Food2 from "../assets/image/menu-image/food2.png";
import Food3 from "../assets/image/menu-image/food3.png";
import Food4 from "../assets/image/menu-image/food4.png";
import Food5 from "../assets/image/menu-image/food5.png";
import Food6 from "../assets/image/menu-image/food6.png";

interface RestoreDataType {
  id: string;
  price: number;
  img: string;
  foodName: string;
  quantity: number;
}

export interface DataType {
  id: string;
  img: string;
  title: string;
  data: RestoreDataType[];
}

export const Data = [
  {
    id: "1",
    img: Food1,
    title: "O’zingiz tanlang",
    data: [
      {
        id: "11",
        price: 10,
        name: "Hamburger1",
        quantity: 0,
        // id: "string",
        // name: "string",
        // description: "string",
        // photoUrl: "string",
        // status: "ACTIVE",
        // foodType: "SIMPLE",
      },
      {
        id: "12",
        price: 14,
        foodName: "Lavash1",
        quantity: 0,
      },
      {
        id: "13",
        price: 20,
        foodName: "Donar1",
        quantity: 0,
      },
      {
        id: "14",
        price: 40,
        foodName: "Hot Dog",
        quantity: 0,
      },
    ],
  },
  {
    id: "2",
    img: Food2,
    title: "Tayyor taomlar",
    data: [
      {
        id: "21",
        price: 20,
        foodName: "Hamburger2",
        quantity: 0,
      },
      {
        id: "22",
        price: 60,
        foodName: "Lavash2",
        quantity: 0,
      },
      {
        id: "23",
        price: 45,
        foodName: "Donar2",
        quantity: 0,
      },
      {
        id: "24",
        price: 40,
        foodName: "Hot Dog",
        quantity: 0,
      },
    ],
  },
  {
    id: "3",
    img: Food3,
    title: "Salatlar",
    data: [
      {
        id: "31",
        img: Food3,
        price: 60,
        foodName: "Salat1",
        quantity: 0,
      },
      {
        id: "32",
        img: Food3,
        price: 10,
        foodName: "Salat2",
        quantity: 0,
      },
      {
        id: "33",
        img: Food3,
        price: 70,
        foodName: "Salat3",
        quantity: 0,
      },
      {
        id: "34",
        img: Food3,
        price: 40,
        foodName: "Salat4",
        quantity: 0,
      },
    ],
  },
  {
    id: "4",
    img: Food4,
    title: "Non va shirinliklar",
    data: [
      {
        id: "41",
        price: 10,
        foodName: "Hamburger4",
        quantity: 0,
      },
      {
        id: "42",
        price: 80,
        foodName: "Lavash4",
        quantity: 0,
      },
      {
        id: "43",
        price: 10,
        foodName: "Donar4",
        quantity: 0,
      },
      {
        id: "44",
        price: 40,
        foodName: "Hot Dog",
        quantity: 0,
      },
    ],
  },
  {
    id: "5",
    img: Food5,
    title: "Ichimliklar",
    data: [
      {
        id: "51",
        price: 10,
        foodName: "Hamburger5",
        quantity: 0,
      },
      {
        id: "52",
        price: 80,
        foodName: "Lavash5",
        quantity: 0,
      },
      {
        id: "53",
        price: 10,
        foodName: "Donar5",
        quantity: 0,
      },
      {
        id: "55",
        price: 40,
        foodName: "Hot Dog",
        quantity: 0,
      },
    ],
  },
  {
    id: "6",
    img: Food6,
    title: "Tayyor set",
    data: [
      {
        id: "61",
        price: 10,
        foodName: "Hamburger6",
        quantity: 0,
      },
      {
        id: "62",
        price: 80,
        foodName: "Lavash6",
        quantity: 0,
      },
      {
        id: "63",
        price: 10,
        foodName: "Donar6",
        quantity: 0,
      },
      {
        id: "64",
        price: 40,
        foodName: "Hot Dog",
        quantity: 0,
      },
    ],
  },
];
