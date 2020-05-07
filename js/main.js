"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const logInInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("user");

const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
};
valid();

const toggleModal = function () {
  modal.classList.toggle("is-open");
};

function toogleModalAuth() {
  logInInput.style.borderColor = "";
  modalAuth.classList.toggle("is-open");
}

function autorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("user");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }

  console.log("Авторизован");

  userName.textContent = login;

  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function notAutorized() {
  console.log("Не авторизован");
  function logIn(event) {
    event.preventDefault();

    if (valid(logInInput.value.trim)) {
      login = logInInput.value;
      localStorage.setItem("user", login);
      toogleModalAuth();
      buttonAuth.removeEventListener("click", toogleModalAuth);
      closeAuth.removeEventListener("click", toogleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset();
      checkAuth();
    } else {
      logInInput.style.borderColor = "red";
      logInInput.value = "";
    }
  }

  buttonAuth.addEventListener("click", toogleModalAuth);
  closeAuth.addEventListener("click", toogleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

function createCardRestaurant() {
  const card = `
  <a class="card card-restaurant">
    <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Тануки</h3>
        <span class="card-tag tag">60 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 1 200 ₽</div>
        <div class="category">Суши, роллы</div>
        </div>
    </div>
  </a>
`;

  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML(
    "beforeend",
    `
  <img src="img/pizza-plus/pizza-classic.jpg"
    alt="image"
    class="card-image"
  />
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Классика</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">
        Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина,
        салями, грибы.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">510 ₽</strong>
    </div>
  </div>
  `
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest(".card-restaurant");

  if (restaurant) {
    if (login) {
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
      cardsMenu.textContent = "";
      createCardGood();
      createCardGood();
      createCardGood();
    } else {
      toogleModalAuth();
    }
  }
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});
 
checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

new Swiper(".swiper-container", {
  loop: true,
  autoplay: true,
  slidesPerView: 1,
  slidesPerColumn: 1,
});
