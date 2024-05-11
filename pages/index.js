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
const editCloseButton = editModal.querySelector("#modal-close");
const addCardCloseButton = addCardModal.querySelector("#modal-close");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const editForm = document.forms["modal-edit-form"];
const addCardForm = document.forms["modal-add-form"];
const allModals = document.querySelectorAll(".modal");
const previewImageModal = document.querySelector(".modal__preview");
const cardImagePrev = document.querySelector(".modal__image-preview");
const cardTitlePrev = document.querySelector(".modal__image-title");
const previewCloseButton = document.querySelector("#preview-close");
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

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
}

function handleEditSubmit(e) {
  e.preventDefault();
  document.querySelector(".profile__title").textContent = titleInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;
  closeModal(editModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = document.querySelector("#add-title-input").value;
  const link = document.querySelector("#link-input").value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
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
// Listeners/Handlers
editButton.addEventListener("click", () => {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  document.querySelector("#title-input").value = profileTitle.textContent;
  document.querySelector("#description-input").value =
    profileDescription.textContent;
  openModal(editModal);
});

editCloseButton.addEventListener("click", () => closeModal(editModal));
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

editForm.addEventListener("submit", handleEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

function handleImageClick() {
  cardImagePrev.src = cardData.link;
  cardImagePrev.alt = `Image of ${cardData.name}`;
  cardTitlePrev.textContent = cardData.name;
  openModal(previewImageModal);
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardSelector, handleImageClick);
  cardListEl.appendChild(card.getView());
});

function renderCard(cardData, cardList) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  cardList.prepend(card.getView());
}
