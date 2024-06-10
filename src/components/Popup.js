export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("keydown", this._handleClick);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  _handleClick(e) {
    if (e.target.classList.contains("modal")) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal_opened") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
