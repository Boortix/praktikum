import {createElement} from '../helpers';

function getUserInfoSectionMarkup() {
  return `
      <div class="user-info">
        <div class="user-info__photo"></div>
        <div class="user-info__data">
          <h1 class="user-info__name">Loading...</h1>
          <p class="user-info__job">Loading...</p>
          <button  class="button user-info__button user-info__button_edit">Edit</button>
        </div>
        <button class="button user-info__button user-info__button_add">+</button>
      </div>`;
}


export function getUserInfoSectionTemplate() {
  return createElement(getUserInfoSectionMarkup());
}
