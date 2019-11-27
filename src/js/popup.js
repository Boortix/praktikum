import Component from './component';

const ESCAPE_CODE = 27;

class Popup extends Component{
  constructor(selector, container) {
    super(selector);
    this._container = container;
    this.setHandlers();
    this._onEscapeKeyPressHandler = this._onEscapeKeyPressHandler.bind(this);
  }

  _getTemplate(selector) {
    return document.querySelector(selector).content.querySelector('.popup').cloneNode(true)
  }

  open() {
    this._element.classList.add('popup_is-opened');
    this._container.appendChild(this._element);
    document.addEventListener('keyup', this._onEscapeKeyPressHandler)
  }

  close() {
    this._element.classList.remove('popup_is-opened');
    this._element.remove();
    document.removeEventListener('keyup', this._onEscapeKeyPressHandler)
  }

  setHandlers() {
    this._element.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
  }

  _onEscapeKeyPressHandler(e) {
    if (e.keyCode === ESCAPE_CODE) {
      this.close();
    }
  }
}

export default Popup;
