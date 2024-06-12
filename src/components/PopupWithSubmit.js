import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit, loadingText = "Deleting...") {
    super({ popupSelector });
    this._handleSubmit = handleSubmit;
    this._modalButton = this._popupElement.querySelector(".modal__button");
    this._modalButtonText = this._modalButton.textContent;
    this._loadingText = loadingText;
  }
  _setSubmitAction(submitHandler) {
    this._handleSubmit = submitHandler;
  }
  showLoading() {
    this._modalButton.textContent = this._loadingText;
  }
  hideLoading() {
    this._modalButton.textContent = this._modalButtonText;
  }
  setEventListeners() {
    super.setEventListeners();
    this._modalButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
  open(handleSubmit) {
    this._handleSubmit = handleSubmit;
    super.open();
  }
}
