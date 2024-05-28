import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// Function to create card elements
function createCard(data) {
  const cardElement = new Card(data, constants.cardSelector, handleImageClick);
  return cardElement.getView();
}
// Section for rendering cards
const cardSection = new Section(
  {
    items: constants.initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
cardSection.renderItems();

function renderCard(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}
// UserInfo
const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

// PopupWithForm
const addCardModal = new PopupWithForm("#add-modal", handleAddCardSubmit);
addCardModal.setEventListeners();

const profileEditModal = new PopupWithForm("#edit-modal", handleEditSubmit);
profileEditModal.setEventListeners();

// Handlers
function handleImageClick(data) {
  popupImage.open(data);
}

function handleEditSubmit(data) {
  userInformation.setUserInfo({
    title: data.title,
    description: data.description,
  });
  profileEditModal.close();
}

function handleAddCardSubmit(data) {
  const { title, link } = data;
  const cardData = { name: title, link: link };
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
  addCardModal.close();
}
// Event listeners for opening modals
constants.editButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const userData = userInformation.getUserInfo();
  constants.titleInput.value = userData.title;
  constants.descriptionInput.value = userData.description;
  profileEditModal.open();
});

constants.addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

// PopupWithImage for image preview
const popupImage = new PopupWithImage("#modal-preview");
popupImage.setEventListeners();

// Validation
const editFormValidator = new FormValidator(
  constants.validationOptions,
  constants.editForm
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  constants.validationOptions,
  constants.addForm
);
addCardFormValidator.enableValidation();
