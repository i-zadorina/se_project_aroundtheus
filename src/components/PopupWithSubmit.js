import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor({popupSelector}) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleDeleteSubmit=handleDeleteSubmit;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteSubmit();
    });
  }
}