import Card from '../card';
import {getCardListSectionTemplate} from './template'
import Component from '../component';

function createCardElements(info) {
  return [].concat(info).reduce((fragment, {data, handlers}) => {
    const card = new Card(data);
    card.setHandlers(handlers);
    fragment.appendChild(card.node);
    return fragment;
  }, document.createDocumentFragment());
}

class CardListSection extends Component {
  _getTemplate() {
    return getCardListSectionTemplate();
  }

  setView(data, erase) {
    if (erase) {
      this._element.innerHTML = '';
    }
    this._element.appendChild(createCardElements(data));
  }

}


export default CardListSection
