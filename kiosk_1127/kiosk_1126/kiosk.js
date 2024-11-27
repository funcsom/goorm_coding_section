// 단락의 가장 위 주석은 실행 시점, 아래의 코드 프리뷰를 나타냄
// 단락의 중간 주석은 바로 위 코드 단위의 기능에 대해 서술

// page structure

// Category id="category"
// | Home | Drinks | Dessert |
//
// Menu
// 선택한 카테고리에 해당하는 메뉴 나열 (동적 렌더링)
//
// Cart
// 메뉴 선택 시 이곳에 업데이트됨. + 버튼, - 버튼, delete 버튼 생성 (동적 렌더링)
//
// Total 금액 표시

// name: { price: "3000", count: 1 } <- 구조
const cart = {};

// 각각의 요소를 JS에서 제어하기 위해 querySelector 이용
const category = document.querySelector("#category");
const menu = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart");
const totalDisplay = document.querySelector("#total");

// 각각의 메뉴를 객체 형식으로 묶어서 category, name, price 를 key로 가지도록 부여
// DB에서 해당 배열만 받아온다면, js나 html의 큰 수정 없이 코드 유지 가능
const menuCategories = [
  { category: "Burger", name: "더블1955®버거", price: 10300 },
  { category: "Burger", name: "더블맥스파이시®상하이버거", price: 10300 },
  { category: "Burger", name: "토마토치즈비프버거", price: 10300 },
  { category: "Burger", name: "맥크리스피디럭스버거", price: 10300 },
  { category: "Burger", name: "맥크리스피클래식버거", price: 10300 },
  { category: "Burger", name: "트리플치즈버거", price: 10300 },
  { category: "Burger", name: "슈비버거", price: 10300 },
  { category: "Burger", name: "슈슈버거", price: 10300 },
  { category: "Drink", name: "콜라", price: 2500 },
  { category: "Drink", name: "제로콜라", price: 2500 },
  { category: "Drink", name: "스프라이트", price: 2500 },
  { category: "Dessert", name: "썬데", price: 4500 },
];

category.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const categoryName = event.target.getAttribute("data-name");
    if (categoryName === "Home") {
      renderMenu();
    } else {
      renderMenu(categoryName);
    }
  }
});

function renderMenu(categoryName) {
  menu.innerHTML = "";

  const filteredMenu = categoryName
    ? menuCategories.filter((item) => item.category === categoryName)
    : menuCategories;

  filteredMenu.forEach(({ name, price }) => {
    const menuItem = document.createElement("button");
    menuItem.textContent = `${name} - (${price.toLocaleString()}원)`;
    menuItem.classList.add(name);
    menuItem.dataset.name = name;
    menuItem.dataset.price = price;

    console.log(price);

    // 저장 시점에
    console.log(typeof menuItem.dataset.price);

    setTimeout(() => {
      console.log("After DOM update:", typeof menuItem.dataset.price); // 올바른 값 확인 가능
    }, 3000);
    menu.appendChild(menuItem);
  });
}

menu.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.name;
  const price = target.dataset.price;

  console.log(typeof target.dataset.price);
  if (!name) return;

  if (target.classList) {
    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price: Number(price), count: 1 };
    }
  }

  updateCart();
});

cartDisplay.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.name;

  if (target.classList.contains("increase")) {
    cart[name].count++;
  } else if (target.classList.contains("decrease")) {
    cart[name].count--;
    if (cart[name].count <= 0) {
      delete cart[name];
    }
  } else if (target.classList.contains("delete")) {
    delete cart[name];
  }

  updateCart();
});

function updateCart() {
  cartDisplay.innerHTML = "";
  let total = 0;

  for (const name in cart) {
    const { price, count } = cart[name];

    total += price * count;

    const item = document.createElement("div");
    item.textContent = `${name} (${price.toLocaleString()}원)`;

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.classList.add("increase");
    increaseBtn.dataset.name = name;

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.classList.add("decrease");
    decreaseBtn.dataset.name = name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete");
    deleteBtn.dataset.name = name;

    const c = document.createElement("span");
    c.textContent = count;

    item.append(decreaseBtn);
    item.append(c);
    item.append(increaseBtn);
    item.append(deleteBtn);

    cartDisplay.appendChild(item);
  }

  totalDisplay.textContent = total.toLocaleString();
}
