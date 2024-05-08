import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// Constants
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
const card = new Card(cardData, "#card-template");
card.getView();

const editButton = document.querySelector("#edit-button");
const addCardButton = document.querySelector("#add-button");
const editModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-modal");
const editCloseButton = editModal.querySelector("#modal-close");
const addCardCloseButton = addCardModal.querySelector("#modal-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const editForm = document.forms["modal-edit-form"];
const addCardForm = document.forms["modal-add-form"];
const previewImageModal = document.querySelector(".modal__preview");
const allModals = document.querySelectorAll(".modal");
// Validation
const validationOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editFormValidator = new FormValidator(validationOptions, editForm);
const addCardFormValidator = new FormValidator(validationOptions, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
// Cards
const cardListEl = document.querySelector("#card-list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardTitleInput = document.querySelector("#add-title-input");
const cardUrlInput = document.querySelector("#link-input");
// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
}
function renderCard(cardData, cardList) {
  // const card = new Card(cardData, "#card-template");
  // cardList.prepend(card.getView());
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.alt = `Image of ${cardData.name}`;
  cardImageEl.src = cardData.link;
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  // Like and Delete Buttons
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  // Preview
  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    const cardImagePrev = document.querySelector(".modal__image-preview");
    cardImagePrev.alt = `Image of ${cardData.name}`;
    cardImagePrev.src = cardData.link;
    const cardTitlePrev = document.querySelector(".modal__image-title");
    cardTitlePrev.textContent = cardData.name;
  });
  return cardElement;
}
// Event Handlers
function handleEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
}
// Event Listeners
editButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});
editCloseButton.addEventListener("click", () => closeModal(editModal));
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

const previewCloseButton = document.querySelector("#preview-close");
previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

editForm.addEventListener("submit", handleEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function closeWithEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}
allModals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});
