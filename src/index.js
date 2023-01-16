import './styles/pages/index.css';
import { initialArray } from './components/initialArray.js';
import { createCard, prependCard } from './components/card.js';
import { addProfileListeners } from './components/profile.js';

addProfileListeners();

initialArray.forEach(card => {
  const cardClone = createCard(card.title, card.image);
  prependCard(cardClone);
});
