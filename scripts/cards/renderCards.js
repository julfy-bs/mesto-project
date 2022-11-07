import { createCard } from '../helpers/createCard.js';
import { cardsArray } from './cardsArray.js';

export const renderCards = () => {
  cardsArray.forEach(item => createCard(item))
}
