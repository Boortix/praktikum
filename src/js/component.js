class Component {
  constructor(data) {
    this._element = this._getTemplate(data);
  }

  _getTemplate(data) {
    throw new Error('Необходимо переопределить метод в дочернем классе')
  }

  setView() {
    throw new Error('Необходимо переопределить метод в дочернем классе')
  }

  get node() {
    return this._element;
  }

  appendTo(container) {
    container.appendChild(this.node);
  }

}

export default Component;
