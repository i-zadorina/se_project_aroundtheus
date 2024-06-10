import "./index.css";
import * as constants from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

let cardSection;
// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7f5d30ae-91c6-4c4a-9270-9bbdbc1bcd50",
    "Content-Type": "application/json",
  },
});
// Rendering cards
function createCard(data) {
  const cardElement = new Card(
    data,
    constants.cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
  return cardElement.getView();
}
// UserInfo and Cards
const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  // UserInfo
  .then(([userData, cards]) => {
    userInformation.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInformation.setAvatar(userData.avatar);
    // Cards
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardEl = createCard(cardData);
          cardSection.addItem(cardEl);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });
// PopupWithImage and image preview
const popupImage = new PopupWithImage("#modal-preview");
popupImage.setEventListeners();

function handleImageClick(data) {
  popupImage.open(data);
}
// Likes
function handleLikeClick(cardId) {
  if (cardId._isLiked) {
    api
      .removeLike(cardId._id)
      .then(() => {
        cardId._renderLikes();
        cardId._isLiked = false;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addLike(cardId._id)
      .then(() => {
        cardId._renderLikes();
        cardId._isLiked = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
// PopupWithForm
const avatarModal = new PopupWithForm("#avatar-modal", handleAvatarSubmit);
avatarModal.setEventListeners();

const profileEditModal = new PopupWithForm("#edit-modal", handleEditSubmit);
profileEditModal.setEventListeners();

const addCardModal = new PopupWithForm("#add-modal", handleAddCardSubmit);
addCardModal.setEventListeners();
// Handlers
function handleAvatarSubmit({ link }) {
  avatarModal.renderLoad(true);
  api
    .updateAvatar(link)
    .then((res) => {
      userInformation.setAvatar(res.avatar);
      avatarModal.close();
      constants.avatarForm.reset();
      avatarFormValidator.toggleBtnState();
    })
    .catch((err) => {
      console.error("Oops...Failed to update avatar:", err);
    })
    .finally(() => {
      avatarModal.renderLoad(false);
    });
}
function handleEditSubmit(data) {
  profileEditModal.renderLoad(true);
  api
    .updateProfile({ name: data.title, about: data.description })
    .then(() => {
      userInformation.setUserInfo({
        name: data.title,
        description: data.description,
      });
      profileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditModal.renderLoad(false);
    });
}
function handleAddCardSubmit(data) {
  const name = data.title;
  const link = data.link;
  addCardModal.renderLoad(true);
  api
    .addNewCard({ name, link })
    .then((res) => {
      const cardElement = createCard(res);
      cardSection.addItem(cardElement);
      addCardModal.close();
      constants.addForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardModal.renderLoad(false);
    });
}
// Event listeners for opening modals
constants.editButton.addEventListener("click", () => {
  const userData = userInformation.getUserInfo();
  constants.titleInput.value = userData.name;
  constants.descriptionInput.value = userData.description;
  profileEditModal.open();
  // editFormValidator.resetValidation();
});

constants.addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

constants.avatarButton.addEventListener("click", () => {
  avatarModal.open();
});
// Delete cards
const deleteModal = new PopupWithSubmit("#delete-card-modal", (card) =>
  handleDeleteClick(card)
);
deleteModal.setEventListeners();

function handleDeleteClick(card) {
  deleteModal.open(() => {
    deleteModal.showLoading();
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        deleteModal.close();
      })
      .catch((err) => {
        console.error("Failed deleting card:", err);
      })
      .finally(() => {
        deleteModal.hideLoading();
      });
  });
}
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

const avatarFormValidator = new FormValidator(
  constants.validationOptions,
  constants.avatarForm
);
avatarFormValidator.enableValidation();
