import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
});
api.getInitialCards()
   .then((cards) => {
      cardSection.setItems(cards);
      cardSection.renderItems();
    })
   .catch((err)=>{console.error(err)});
   
api.getUserInfo()
.then((result)=>{
   userInformation.setUserInfo({
     name: result.title,
     description: result.description,
   });
   userInformation.setAvatar(result.avatar);
 })
 .catch(console.error);
   
// Function to create card elements
function createCard(data) {
  const cardElement = new Card(data, constants.cardSelector, handleImageClick);
  return cardElement.getView();
}
// Section for rendering cards
const cardSection = new Section(
  {
    // items: constants.initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

// function renderCard(item) {
//   const cardElement = createCard(item);
//   cardSection.addItem(cardElement);
// }
// UserInfo
const userInformation = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

// PopupWithImage for image preview
const popupImage = new PopupWithImage("#modal-preview");
popupImage.setEventListeners();

// PopupWithForm
const addCardModal = new PopupWithForm("#add-modal", handleAddCardSubmit);
addCardModal.setEventListeners();

const profileEditModal = new PopupWithForm("#edit-modal", handleEditSubmit);
profileEditModal.setEventListeners();

const avatarModal=new PopupWithForm("avatar-modal",handleAvatarSubmit);
avatarModal.setEventListeners();

// Handlers
function handleImageClick(data) {
  popupImage.open(data);
}

function handleSubmit(request,modal,loadingText="Saving..."){
  modal.renderLoad(true,loadingText);
  request()
  .then(()=>{
    modal.close();
  })
  .catch((err)=>{
    console.error(err);
  })
  .finally(()=>{
    modal.renderLoad(false);
  });
}

function handleEditSubmit(data) {
  function makeRequest(){
    return api
    .editProfile(data.title,data.description)
    .then((res)=>{
      userInformation.setUserInfo({
      title: data.title,
      description: data.description,
      });
    profileEditModal.close();
    });
  handleSubmit(makeRequest,profileEditModal);
}}

function handleAddCardSubmit(data) {
  function makeRequest(){
    return api.addNewCard(data.title,data.url)
    .then((res)=>{
      cardSection.addItem(createCard(res));
      addCardModal.reset
      // const { title, link } = data;
      // const cardData = { name: title, link: link };
      // const cardElement = createCard(cardData);
      // cardSection.addItem(cardElement);
      // addCardModal.close();
    })
  }
  handleSubmit(makeRequest,addCardModal, "Creating...");
}

function handleAvatarSubmit(data){
  function makeRequest(){
    return api.updateAvatar(data.url)
    .then((res)=>{
      userInformation.setAvatar(res.avatar);
    });
  }
  handleSubmit(makeRequest,avatarModal);
}
// Event listeners for opening modals
constants.editButton.addEventListener("click", () => {
  const userData = userInformation.getUserInfo();
  constants.titleInput.value = userData.title;
  constants.descriptionInput.value = userData.description;
  profileEditModal.open();
  editFormValidator.resetValidation();
});

constants.addCardButton.addEventListener("click", () => {
  addCardModal.open();
});
avatarButton.addEventListener("click", () => {
  avatarModal.open();});

// Validation
const formValidators={};

const enableValidation=(options)=>{
  const formList=Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement)=>{
    const validator=new FormValidator(options,formElement);
    const formName=formElement.getAttribute("name");
    formValidators[formName]=validator;
    validator.enableValidation();
  });
}
enableValidation(options);

// editFormValidator.enableValidation();
// const editFormValidator = new FormValidator(
//   constants.validationOptions,
//   constants.editForm
// );
// editFormValidator.enableValidation();

// const addCardFormValidator = new FormValidator(
//   constants.validationOptions,
//   constants.addForm
// );
// addCardFormValidator.enableValidation();