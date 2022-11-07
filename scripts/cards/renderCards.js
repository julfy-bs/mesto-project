import { createCard } from '../helpers/createCard.js';
import { initialArray } from './initialArray.js';

export const renderCards = () => {
  initialArray.forEach(item => createCard(item))
}
