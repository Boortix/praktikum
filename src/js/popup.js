const ESCAPE_CODE = 27;

class Popup {
  constructor(selector, container) {
    this._container = container;
    this._template = document.querySelector(selector).content.querySelector('.popup');
    this._element = this._template.cloneNode(true);
    this._setHandlers();
    this._onEscapeKeyPressHandler = this._onEscapeKeyPressHandler.bind(this);
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

  _setHandlers() {
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