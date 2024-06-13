export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  ) {
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteCard;
  }
  getCardId() {
    return this._id;
  }
  _setEventListeners() {
    // ".card__like-button"
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    // image preview
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  renderLikes() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
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
    this._cardImage.alt = this.name;
    this._cardImage.src = this.link;
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this.name;
    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
