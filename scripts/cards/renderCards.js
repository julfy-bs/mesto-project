import { initialArray } from './initialArray.js';
import Card from './Card.js';

export const renderCards = () => {
  initialArray.forEach(card => new Card(card))
}
