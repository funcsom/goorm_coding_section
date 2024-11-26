// name: { price: "3000", count: 1 } <- 구조
const cart = {};

// 각각의 요소를 querySelector로 가져옴
const category = document.querySelector("#categories");
const menu = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart");
const totalDisplay = document.querySelector("#total");

// 각각의 메뉴를 객체 형식으로 묶어서 category, name, price 를 key로 가지도록 부여
const menuCategories = [
  { category: "Drinks", name: "Coffee", price: 3000 },
  { category: "Drinks", name: "Tea", price: 2500 },
  { category: "Deserts", name: "Cake", price: 4500 },
];

// 카테고리 탭에서 "버튼 태그"를 눌렀을 때,
category.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const categoryName = event.target.getAttribute("data-name");
    // event 객체를 불러와 해당 태그의 attribute를 가져오는 getAttribute() 메서드를 이용.
    // categoryName이라는 상수에 해당 attribute를 대입하고,
    if (categoryName === "Home") {
      renderMenu(); // Home 카테고리라면, 모든 menu를 렌더링할 수 있도록 비워둠
    } else {
      renderMenu(categoryName); // 해당 카테고리네임을 렌더할 수 있게 renderMenu()에 전달
    }
  }
});

//
menu.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.name;
  const price = target.dataset.price;
  console.log(name);

  if (!name) return;

  if (target.classList) {
    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price: Number(price), count: 1 };
    }
  }
  console.log(cart);
  updateCart();
});

//
cartDisplay.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.name;

  if (!name) return;

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

// Menu를 카테고리에 따라 렌더하기 위해
function renderMenu(categoryName) {
  menu.innerHTML = "";

  const filteredMenu = categoryName
    ? menuCategories.filter((item) => item.category === categoryName)
    : menuCategories;

  console.log(filteredMenu);
  filteredMenu.forEach(({ name, price }) => {
    const menuItem = document.createElement("button");
    menuItem.textContent = `${name} - (${price.toLocaleString()}원)`;
    menuItem.classList.add(`${name}`);
    menuItem.dataset.name = name;
    menuItem.dataset.price = price;

    menu.appendChild(menuItem);
  });
  console.log(cart);
  updateCart();
}

// Cart의 UI를 업데이트하는 함수
function updateCart() {
  cartDisplay.innerHTML = "";
  let total = 0;

  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count;

    const item = document.createElement("div");
    item.textContent = `${name} x ${count} (${(
      price * count
    ).toLocaleString()}원)`;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("increase");
    plusBtn.dataset.name = name;

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.classList.add("decrease");
    minusBtn.dataset.name = name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete");
    deleteBtn.dataset.name = name;

    item.prepend(minusBtn);
    item.append(plusBtn);
    item.append(deleteBtn);

    cartDisplay.appendChild(item);
  }

  totalDisplay.textContent = total.toLocaleString();
}

// 1. 각각의 항목에 +, - 버튼을 붙일 수 있도록 해보기
// 2. delete 버튼 생성하기
// 3. tab으로 항목 구분하기
