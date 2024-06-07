import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._modalButton = this._popupElement.querySelector(".modal__button");
    this._inputEl = this._popupForm.querySelectorAll(".modal__input");
  }
  handleDelete(action) {
    this._handleDeleted = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleted();
    });
  }
  renderLoad(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Loading...";
    } else {
      this._modalButton.textContent = "Yes";
    }
  }
}
