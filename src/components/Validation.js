export default class Validation {
  constructor({
                formSelector,
                inputSelector,
                buttonSelector,
                errorSelector,
                inputErrorClass,
                buttonDisabledClass,
                errorActiveClass
              }) {
    this._formsList = Array.from(document.querySelectorAll(formSelector));
    this._inputSelector = inputSelector;
    this._buttonSelector = buttonSelector;
    this._errorSelector = errorSelector;
    this._inputErrorClass = inputErrorClass;
    this._buttonDisabledClass = buttonDisabledClass;
    this._errorActiveClass = errorActiveClass;
    this._enableValidation();
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

  _enableValidation() {
    this._formsList.forEach(form => this._setFormEventListeners(
      form,
      this._inputSelector,
      this._buttonSelector,
      this._errorSelector,
      this._inputErrorClass,
      this._buttonDisabledClass,
      this._errorActiveClass,
    ));
  };
}

// const showInputError = (formElement, inputElement, errorElement, errorMessage, inputErrorClass, errorActiveClass) => {
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorActiveClass);
//   inputElement.classList.add(inputErrorClass);
//   inputElement.setAttribute('aria-describedby', `${errorActiveClass}`);
// };
//
// const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorActiveClass) => {
//   errorElement.classList.remove(errorActiveClass);
//   errorElement.textContent = '';
//   inputElement.classList.remove(inputErrorClass);
//   inputElement.removeAttribute('aria-describedby');
// };
//
// const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass, errorActiveClass) => {
//   const errorElement = inputElement.parentNode.querySelector(errorClass);
//
//   inputElement.validity.patternMismatch
//     ? inputElement.setCustomValidity(inputElement.dataset.invalidMessage)
//     : inputElement.setCustomValidity('');
//
//   !inputElement.validity.valid
//     ? showInputError(formElement, inputElement, errorElement, inputElement.validationMessage, inputErrorClass, errorActiveClass)
//     : hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorActiveClass);
// };
//
// const hasInvalidInput = (inputsList) => {
//   return inputsList.some(inputElement => !inputElement.validity.valid);
// };
//
// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.setAttribute('disabled', 'disabled');
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.removeAttribute('disabled', 'disabled');
//   }
// };
//
// const setFormEventListeners = (formElement, inputSelector, buttonSelector, errorSelector, inputErrorClass, buttonInactiveClass, errorActiveClass) => {
//   const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(buttonSelector);
//   toggleButtonState(inputsList, buttonElement, buttonInactiveClass);
//   inputsList.forEach(inputElement => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, errorSelector, inputErrorClass, errorActiveClass);
//       toggleButtonState(inputsList, buttonElement, buttonInactiveClass);
//     });
//   });
//   formElement.addEventListener('reset', () => {
//     setTimeout(() => toggleButtonState(inputsList, buttonElement, buttonInactiveClass), 0);
//   });
// };
//
// const enableValidation = (validationConfig) => {
//   const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
//   formsList.forEach(form => setFormEventListeners(
//     form,
//     validationConfig.inputSelector,
//     validationConfig.buttonSelector,
//     validationConfig.errorSelector,
//     validationConfig.inputErrorClass,
//     validationConfig.buttonDisabledClass,
//     validationConfig.errorActiveClass,
//   ));
// };
//
// export {
//   enableValidation
// };
