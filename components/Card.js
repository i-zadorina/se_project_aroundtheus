export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    // ".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    //   image preview
    // this._cardImageElement
    //   .querySelector(".modal__preview")
    //   .addEventListener("click", () => {
    //     this._handleImageClick();
    //   });
  }
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
  }
  //   _handleImageClick() {
  //     openModal(previewImageModal);
  //     const cardImagePrev = document.querySelector(".modal__image-preview");
  //     cardImagePrev.alt = `Image of ${this._name}`;
  //     cardImagePrev.src = this._link;
  //     const cardTitlePrev = document.querySelector(".modal__image-title");
  //     cardTitlePrev.textContent = this._name;
  //   }
  getView() {
    // get the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
