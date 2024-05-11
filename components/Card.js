export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // ".card__like-button"
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // image preview
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }
  _handleLikeIcon() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._element = null;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }
  getView() {
    // get the card view
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.alt = `Image of ${this._name}`;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
