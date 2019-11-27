import {createElement} from '../helpers';

function getCardListSectionMarkup() {
  return `<div class="places-list root__section"></div>`;
}

export function getCardListSectionTemplate() {
  return createElement(getCardListSectionMarkup());
}
