import Component from './component';

const cardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');

function createCardElement(data) {
  const newCardElement = cardTemplate.cloneNode(true);
  newCardElement.querySelector('.place-card__image').style.backgroundImage = 'url(' + data.link + ')';
  newCardElement.querySelector('.place-card__name').textContent = data.name;
  return newCardElement;
}

class Card extends Component{
  constructor(data) {
    super(data);
    this._buttonElementToLike = this._element.querySelector('.place-card__like-icon');
    this.setView(data);
  }

  setView(data) {
    this.data = data;
    this._element.querySelector('.place-card__like-count').textContent = data.likes.length;
    this._element.querySelector('.place-card__delete-icon').style.display = data.currentUserId === data.owner._id ? 'block' : 'none';
    this.setLike();
  }

  restoreView() {
    this.setView(this.data);
  }
  _getTemplate(data) {
    return createCardElement(data)
  }

  get id() {
    return this.data._id;
  }

  get isLiked() {
    return Boolean(this.data.likes.find(item => item._id === this.data.currentUserId));
  }

  setLike() {
    this._buttonElementToLike.classList.toggle('place-card__like-icon_liked', this.isLiked)
  }

  remove() {
    this._element.remove();
  }

  setHandlers({
    removeHandlerCallback,
    openHandlerCallback,
    likeHandlerCallback
  }) {

    this._element.addEventListener('click', (e) => {
      e.stopPropagation();
      openHandlerCallback();
    });

    this._element.querySelector('.place-card__delete-icon').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.removeHandlerCallback(this);
    });

    this._buttonElementToLike.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      likeHandlerCallback(this)
    })
  }

}

export default Card;
