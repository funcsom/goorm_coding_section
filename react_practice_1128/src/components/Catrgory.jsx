import { useState } from "react";
import Menu from "./Menu";

const Category = () => {
  const [category, setCategory] = useState("");
  const onClickButton = (e) => {
    setCategory(e.target.id);
  };
  return (
    <div>
      카테고리
      <button id="Home" onClick={onClickButton}>
        홈
      </button>
      <button id="Recommanded-Menu" onClick={onClickButton}>
        추천 메뉴
      </button>
      <button id="Burger" onClick={onClickButton}>
        버거
      </button>
      <button id="Beberage" onClick={onClickButton}>
        음료
      </button>
      <button id="Dessert" onClick={onClickButton}>
        디저트
      </button>
      <Menu category={category} />
    </div>
  );
};

export default Category;
