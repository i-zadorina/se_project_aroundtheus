import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImageElement = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._popupImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }
  open({ name, link }) {
    this._popupImageElement.src = link;
    this._popupImageElement.alt = `Image of ${name}`;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}
