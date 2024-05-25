import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// Get view cards
function createCard(cardData) {
  const cardElement = new Card(cardData, cardSelector, handleImageClick);
  return cardElement.getView();
}
//UserInfo
const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});
//PopupWithForm
const addCardForm = new PopupWithForm("#add-modal", handleAddCardSubmit);
addCardForm.setEventListeners();
const profileEditForm = new PopupWithForm("#edit-modal", handleEditSubmit);
profileEditForm.setEventListeners();
//Handlers
function handleImageClick(name, link) {
  popupImage.open({ name, link });
}
function handleEditSubmit(data) {
  userInformation.setUserInfo({
    title: data.name,
    description: data.description,
  });
  profileEditForm.close();
}
function handleAddCardSubmit(data) {
  cardSection.addItem(createCard({ name: data.title, link: data.link }));
  addCardForm.setEventListeners();
}
// Listeners/Handlers
constants.editButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const userData = userInformation.getUserInfo();
  constants.titleInput.value = userData.title;
  constants.descriptionInput.value = userData.description;
  profileEditForm.open();
});

constants.addCardButton.addEventListener("click", () => {
  addCardForm.open();
});
//PopupWithImage - Image preview
const popupImage = new PopupWithImage("#modal-preview");
popupImage.setEventListeners();
// Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// Validation
const editFormValidator = new FormValidator(
  constants.validationOptions,
  constants.editForm
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  constants.validationOptions,
  constants.addCardForm
);
addCardFormValidator.enableValidation();
// Constants
// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };
// const cardListEl = document.querySelector("#card-list");
// const addCardModal = document.querySelector("#add-modal");
// const previewImageModal = document.querySelector(".modal__preview");
// const cardImagePrev = document.querySelector(".modal__image-preview");
// const cardTitlePrev = document.querySelector(".modal__image-title");
// const allModals = document.querySelectorAll(".modal");
// const closeButtons = document.querySelectorAll(".modal__close");
// const editModal = document.querySelector("#edit-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// Functions
// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeWithEscape);
// }
// Close modals
// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeWithEscape);
// }
// function closeWithEscape(e) {
//   if (e.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_opened");
//     closeModal(modalOpened);
//   }
// }
// allModals.forEach((modal) => {
//   modal.addEventListener("click", (e) => {
//     if (e.target.classList.contains("modal_opened")) {
//       closeModal(modal);
//     }
//   });
// });
// closeButtons.forEach((button) => {
//   const popup = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(popup));
// });
// // Section
// const cardSection = new Section(
//   { items: initialCards, renderer: createCard },
//   ".cards__list"
// );
// cardSection.renderItems();
// // EventListeners
// function handleEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = titleInput.value;
//   profileDescription.textContent = descriptionInput.value;
//   closeModal(editModal);
// }
//editButton.addEventListener("click", () => {
//   titleInput.value = profileTitle.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   editFormValidator.resetValidation();
//   openModal(editModal);
// });

// editForm.addEventListener("submit", handleEditSubmit);
// addCardForm.addEventListener("submit", handleAddCardSubmit);
