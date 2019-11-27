import Component from '../component';
import {getUserInfoSectionTemplate} from './template';

class UserInfoSection extends Component {
  constructor(...args) {
    super(...args);
    this._nameElement = this._element.querySelector('.user-info__name');
    this._aboutElement = this._element.querySelector('.user-info__job');
    this._avatarElement = this._element.querySelector('.user-info__photo');
    this.data = {}
  }

  _getTemplate() {
    return getUserInfoSectionTemplate();
  }

  setView(info) {
    if (info.name) this._nameElement.textContent = info.name;
    if (info.about) this._aboutElement.textContent = info.about;
    if (info.avatar) this._avatarElement.style.backgroundImage = `url(${info.avatar})`;
  }

  restoreView() {
    this.setView(this.data);
  }

  getInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.style.backgroundImage.slice(5, -2)
    }
  }

  setHandlers({
      editButtonClickCallback,
      addButtonClickCallback,
      avatarImgClickCallback
    })
  {
    this._element.querySelector('.user-info__button_edit').addEventListener('click', () => {
      editButtonClickCallback();
    });
    this._element.querySelector('.user-info__button_add').addEventListener('click', () => {
      addButtonClickCallback();
    });
    this._element.querySelector('.user-info__photo').addEventListener('click', () => {
      avatarImgClickCallback();
    });
  }
}

export default UserInfoSection
