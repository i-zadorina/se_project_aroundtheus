class FormValidator {
  constructor(options, formElement) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._form = formElement;
  }
  _showInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }
  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }
  toggleBtnState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
      return;
    }
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }
  disableButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }
  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this.toggleBtnState();
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.disableButton();
    });
    this._setEventListeners();
  }
  resetValidation() {
    this.toggleBtnState();
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
}

export default FormValidator;
