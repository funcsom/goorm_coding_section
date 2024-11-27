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
  { category: "Drinks", name: "Coffee", price: 3000 },
  { category: "Drinks", name: "Tea", price: 2500 },
  { category: "Desserts", name: "Cake", price: 4500 },
];

// 카테고리 탭에서 특정 카테고리 선택 시 ("버튼 태그"를 눌렀을 때) 작동
// 선택한 카테고리의 메뉴들을 렌더링하는 함수 renderMenu() 호출
category.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const categoryName = event.target.getAttribute("data-name");
    // PointerEvent 객체를 불러와 해당 요소의 attribute를 가져오는 getAttribute() 메서드 이용
    // categoryName이라는 상수에 해당 attribute를 저장
    if (categoryName === "Home") {
      renderMenu(); // Home 카테고리라면, 모든 menu를 렌더링할 수 있도록 비워둠 - from-1)
    } else {
      renderMenu(categoryName); // Home이 아닌 카테고리라면, categoryName을 renderMenu()에 전달하여 해당 카테고리만을 render할 수 있도록 함
    }
  }
});

// category.addEventListener()을 호출 시 실행
// Menu 섹션에서 카테고리의 선택에 따라 어떤 메뉴를 렌더할 지 결정하는 함수
function renderMenu(categoryName) {
  menu.innerHTML = ""; // 메뉴 div의 자식 요소 초기화

  const filteredMenu = categoryName
    ? menuCategories.filter((item) => item.category === categoryName)
    : menuCategories;
  // categoryName 인수의 전달 여부에 따라 필터링된 메뉴를 렌더할 지, 필터링되지 않은 메뉴를 렌더할 지 - to-1)
  // filter 메서드를 이용하여 콜백함수가 참이되는 조건 (즉, 전달된 categoryName과 menuCategories의 category 프로퍼티의 value값이 일치하는지를 비교)을 만족하는 item 객체만 filteredMenu에 배열 형태로 저장

  filteredMenu.forEach(({ name, price }) => {
    const menuItem = document.createElement("button");
    menuItem.textContent = `${name} - (${price.toLocaleString()}원)`;
    menuItem.classList.add(name);
    menuItem.dataset.name = name;
    menuItem.dataset.price = price;
    menu.appendChild(menuItem);
  });
  // filteredMenu의 배열 값을 돌며, name과 price 프로퍼티를 가져와 버튼 형태로 렌더링
  // classList.add()를 통해 메뉴 버튼의 class를 지정
  // dataset.name과 dataset.price를 통해 해당 버튼의 속성을 지정
  // 만든 메뉴버튼을 차례로 menu html요소의 자식으로 렌더링
}

// Menu 섹션에서 메뉴 선택 시 (특정 메뉴 버튼 클릭) 작동
// 특정 메뉴 클릭 시, 해당 메뉴를 카트에 렌더링하기 위해서 updateCart() 함수 호출
menu.addEventListener("click", (event) => {
  const target = event.target;
  const name = target.dataset.name;
  const price = target.dataset.price;

  if (!name) return;
  // 해당 div의 빈 곳을 클릭하면 undefined가 나오는 것을 방지하기 위한 코드!

  if (target.classList) {
    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price: Number(price), count: 1 };
    }
  }
  // cart 객체 프로퍼티를 수정 (기존에 cart 객체 안에 일치하는 name 프로퍼티가 있으면 count를 1 올리고, 없으면 전달받은 name을 키로 갖는 프로퍼티 생성)

  updateCart(); // cart 객체를 다시 불러와 새로 렌더링
});

// Cart 섹션에서 cart에 담긴 메뉴 내 +, -, delete 버튼 클릭 시 작동
// +, -, delete 버튼 클릭 시, 변경된 메뉴 개수를 Cart 섹션에 렌더링하기 위해서 updateCart() 함수 호출
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
  // 버튼의 클래스에 따라 cart 객체를 update

  updateCart(); // cart 객체를 다시 불러와 새로 렌더링
});

// Cart의 UI를 업데이트하는 함수
// cart 객체를 불러와 format에 맞게 렌더링
// 객체를 하나하나 불러와 DOM 요소로 반환하고, 그 사이사이에 +, -, delete 버튼을 추가 (버튼에 class를 지정하여 클릭 시에 반응하도록 함.)
function updateCart() {
  cartDisplay.innerHTML = "";
  let total = 0;
  console.log(cart);

  for (const name in cart) {
    const { price, count } = cart[name];
    // cart[name]을 통해 value 객체를 불러와 구조분해할당으로 각각 price, count에 할당

    total += price * count;
    // total에 누적으로 더함

    const item = document.createElement("div");
    item.textContent = `${name} x ${count} (${(
      price * count
    ).toLocaleString()}원)`;
    // 해당 menu에 대해서 총 가격 제시

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.classList.add("increase");
    increaseBtn.dataset.name = name;

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.classList.add("decrease");
    decreaseBtn.dataset.name = name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete");
    deleteBtn.dataset.name = name;
    // 하나의 menu 항목에 3가지의 버튼 생성

    item.append(decreaseBtn);
    item.append(increaseBtn);
    item.append(deleteBtn);

    cartDisplay.appendChild(item);
    // item 요소에 button을 더하고, item을 cartDisplay 요소의 자식으로 추가
  }

  totalDisplay.textContent = total.toLocaleString();
  // totalDisplay span에 총 가격 렌더링
}

// 전체적인 구조는, 누르는 곳에서 함수를 호출하면 되는듯?
// 함수에서는 요소를 렌더링하고
// 클릭이벤트에서는 렌더링된 요소의 class로 구별해서 데이터를 변경
