import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// Initials
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

// Constants
const cardSelector = "#card-template";
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
const cardListEl = document.querySelector("#card-list");
const editButton = document.querySelector("#edit-button");
const addCardButton = document.querySelector("#add-button");
const editModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const editForm = document.forms["modal-edit-form"];
const addCardForm = document.forms["modal-add-form"];
const previewImageModal = document.querySelector(".modal__preview");
const cardImagePrev = document.querySelector(".modal__image-preview");
const cardTitlePrev = document.querySelector(".modal__image-title");
const allModals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal__close");
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
// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEscape);
}

function handleEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = document.querySelector("#add-title-input").value;
  const link = document.querySelector("#link-input").value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
  addCardFormValidator.disableButton();
}

function handleImageClick(name, link) {
  openModal(previewImageModal);
  cardImagePrev.src = link;
  cardImagePrev.alt = `Image of ${name}`;
  cardTitlePrev.textContent = name;
}
// Close modals
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
}
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
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
// Listeners/Handlers
editButton.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  // addCardFormValidator.resetValidation();
});

editForm.addEventListener("submit", handleEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Get view cards
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}
function renderCard(cardData, cardList) {
  const cardElement = createCard(cardData);
  cardList.prepend(cardElement);
}
initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});
