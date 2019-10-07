class Section {
  constructor({selector, handlers = [] }) {
    this._element = document.querySelector(selector) || document.createElement('div');
    this._setHandlers(handlers)
  }

  _setHandlers(handlers) {
    handlers.forEach(({selector, eventType, callback}) => {
      Array.from(this._element.querySelectorAll(selector)).forEach(element => {
        element.addEventListener(eventType, (e) => {
          e.preventDefault();
          callback()
        })
      })
    })
  }
}

export default Section