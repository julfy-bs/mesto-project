export default class Validation {
  constructor(
    formSelector,
    {
      inputSelector,
      buttonSelector,
      errorSelector,
      inputErrorClass,
      buttonDisabledClass,
      errorActiveClass
    }) {
    this._form = document.querySelector(formSelector);
    this._inputSelector = inputSelector;
    this._buttonSelector = buttonSelector;
    this._errorSelector = errorSelector;
    this._inputErrorClass = inputErrorClass;
    this._buttonDisabledClass = buttonDisabledClass;
    this._errorActiveClass = errorActiveClass;
  }

  _showInputError(formElement, inputElement, errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveClass);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.setAttribute('aria-describedby', `${this._errorActiveClass}`);
  };

  _hideInputError(formElement, inputElement, errorElement) {
    errorElement.classList.remove(this._errorActiveClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.removeAttribute('aria-describedby');
  };

  _checkInputValidity(formElement, inputElement) {
    const errorElement = inputElement.parentNode.querySelector(this._errorSelector);

    inputElement.validity.patternMismatch
      ? inputElement.setCustomValidity(inputElement.dataset.invalidMessage)
      : inputElement.setCustomValidity('');

    !inputElement.validity.valid
      ? this._showInputError(formElement, inputElement, errorElement, inputElement.validationMessage)
      : this._hideInputError(formElement, inputElement, errorElement);
  };

  _hasInvalidInput(inputsList) {
    return inputsList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._buttonDisabledClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._buttonDisabledClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  };

  _setFormEventListeners(formElement) {
    const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._buttonSelector);
    this._toggleButtonState(inputsList, buttonElement);
    inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputsList, buttonElement);
      });
    });
    formElement.addEventListener('reset', () => {
      setTimeout(() => this._toggleButtonState(inputsList, buttonElement), 0);
    });
  };

  enableValidation() {
    this._setFormEventListeners(
      this._form,
      this._inputSelector,
      this._buttonSelector,
      this._errorSelector,
      this._inputErrorClass,
      this._buttonDisabledClass,
      this._errorActiveClass,
    );
  };
}
