import Section from './section';
import Card from './card'
function createCardElements(info) {
  return [].concat(info).reduce((fragment, cardData) => {
    const card = new Card(cardData);
    fragment.appendChild(card.node);
    return fragment;
  }, document.createDocumentFragment());
}

class CardListSection extends Section {
  constructor(...args) {
    super(...args);
    this._cardContainerElement = this._element;
  }

  setData(data, erase) {
    if (erase) {
      this._cardContainerElement.innerHTML = '';
    }
    this._cardContainerElement.appendChild(createCardElements(data));
  }
}

window.CardListSection = CardListSection;

export default CardListSection