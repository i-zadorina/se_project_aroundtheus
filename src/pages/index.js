import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// Function to create card elements
function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    constants.cardSelector,
    handleImageClick
  );
  return cardElement.getView();
}

// UserInfo
const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

// PopupWithForm
const addCardForm = new PopupWithForm("#add-modal", handleAddCardSubmit);
addCardForm.setEventListeners();

const profileEditForm = new PopupWithForm("#edit-modal", handleEditSubmit);
profileEditForm.setEventListeners();

// Handlers
function handleImageClick(name, link) {
  popupImage.open({ name, link });
}

function handleEditSubmit(data) {
  userInformation.setUserInfo({
    title: data.title,
    description: data.description,
  });
  profileEditForm.close();
}

function handleAddCardSubmit(data) {
  cardSection.addItem(createCard({ name: data.title, link: data.link }));
  addCardForm.close();
}

// Event listeners for opening modals
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

// PopupWithImage for image preview
const popupImage = new PopupWithImage("#modal-preview");
popupImage.setEventListeners();

// Section for rendering cards
const cardSection = new Section(
  {
    items: constants.initialCards,
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
