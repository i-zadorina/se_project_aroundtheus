export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this._isLiked = data._isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }
  getCardId() {
    return this._id;
  }
  _setEventListeners() {
    // ".card__like-button"
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._likeBtn.addEventListener("click", () => {
      console.log("Like button clicked", this);
      this._handleLikeClick(this);
    });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        console.log("Delete button clicked", this);
        this._handleDeleteClick(this);
      });
    // image preview
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  _renderLikes() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  removeCard() {
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
    //get likes
    this._renderLikes();
    // return the card
    return this._cardElement;
  }
}
