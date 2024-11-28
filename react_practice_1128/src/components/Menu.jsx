import Cart from "./Cart";

const categoryItems = [
  { category: "Burger", menuName: "1955버거버거", price: 1838 },
  { category: "Burger", menuName: "1935버거버거", price: 1833238 },
  { category: "Burger", menuName: "195555버거버거", price: 1838 },
  { category: "Beberage", menuName: "스프라이트", price: 1838 },
  { category: "Beberage", menuName: "콜라", price: 1838 },
  { category: "Dessert", menuName: "선데", price: 1838 },
];

const Menu = ({ category }) => {
  const Cart = {};

  const onClickMenu = (menu, price) => {
    if (Cart[menu]) Cart[menu].count++;
    else {
      Cart[menu] = { price: price, count: 1 };
    }
    console.log(Cart);
  };
  const filteredItem = categoryItems.filter((item) => {
    if (category === "Home") return true;
    return item.category === category;
  });

  const menu = filteredItem.map((item) => {
    return (
      <button
        onClick={() => onClickMenu(item.menuName, item.price)} // 여기서 쓸데없이 객체를 전달하려고 했었음
        key={item.menuName} // map에서 key는 꼭 하라.... 이다.
      >
        {item.menuName}
      </button>
    );
  });

  return (
    <div>
      {menu}
      {/* <Cart /> */}
    </div>
  );
};

export default Menu;
