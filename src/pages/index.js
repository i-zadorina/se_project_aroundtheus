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

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46b2bf9b-75ca-4b5b-87f8-420e1eddb0ec",
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

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

let cardSection;

// UserInfo
const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

api
  .getUserInfo()
  .then((res) => {
    userInformation.setUserInfo({
      name: res.name,
      description: res.description,
    });
    userInformation.setAvatar(res.avatar);
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
function handleAvatarSubmit(data) {
  avatarModal.renderLoad(true);
  api
    .updateAvatar({ avatar: data.link })
    .then((res) => {
      userInformation.setAvatar(res.avatar);
      avatarModal.close();
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
  constants.titleInput.value = userData.title;
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
const deleteModal = new PopupWithSubmit(
  "#delete-card-modal",
  handleDeleteClick
);

function handleDeleteClick(card) {
  deleteModal.open();
  deleteModal.handleDelete(() => {
    deleteModal.renderLoad(true);
    console.log("Loading...");
    api
      .deleteCard(card.getCardId())
      .then(() => {
        console.log("Card deleted");
        card.removeCard();
      })
      .catch((err) => {
        console.error("Failed deleting card:", err);
      })
      .finally(() => {
        deleteModal.renderLoad(false);
      });
  });
}
deleteModal.setEventListeners();
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
