import './styles/pages/index.css';
import { initialArray } from './components/initialArray.js';
import { VALIDATION } from './components/enum.js';
import { createCard, prependCard } from './components/card.js';
import { addProfileListeners } from './components/profile.js';
import { enableValidation } from './components/validation.js';

addProfileListeners();

enableValidation({
  formSelector: VALIDATION.FORM_SELECTOR,
  inputSelector: VALIDATION.INPUT_SELECTOR,
  buttonSelector: VALIDATION.BUTTON_SELECTOR,
  errorSelector: VALIDATION.ERROR_SELECTOR,
  inputErrorClass: VALIDATION.INPUT_ERROR_CLASS,
  buttonDisabledClass: VALIDATION.BUTTON_DISABLED_CLASS,
  errorActiveClass: VALIDATION.ERROR_ACTIVE_CLASS
});



initialArray.forEach(card => {
  const cardClone = createCard(card.title, card.image);
  prependCard(cardClone);
});
