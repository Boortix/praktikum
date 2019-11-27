import './pages/index.css';
import PopupWithForm from './js/popup-with-form';
import PicturePopup from './js/picture-popup';
import UserInfoSection from './js/user-info-section';
import CardListSection from './js/card-list-section';
import Api from './js/api';
const rootElement = document.querySelector('.root');

const api = new Api({
  address: NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk',
  groupId: `cohort2`,
  token: `f0d9d003-6e12-4170-8406-7ec8709120f4`,
});

api.getAppInfo()
  .then(([cardsInfo, userInfo]) => {
    const newCardPopup = new PopupWithForm('#new-card-popup-template', rootElement);
    const userInfoPopup = new PopupWithForm('#user-info-popup-template', rootElement);
    const picturePopup = new PicturePopup('#picture-popup-template', rootElement);
    const avatarPopup = new PopupWithForm('#avatar-popup-template', rootElement);

    userInfoPopup.setSubmitCallback((info) => {
      api.setUserInfo(info)
        .then(data => userInfoSection.setView(data))
        .catch(e => userInfoSection.setView());
    });

    avatarPopup.setSubmitCallback((info) => {
      api.setUserAvatar(info)
        .then(data => userInfoSection.setView(data))
        .catch(e => userInfoSection.restoreView());
    });

    newCardPopup.setSubmitCallback((newCardInfo) => {
      api.addNewCard(newCardInfo)
        .then(data => {
          cardsInfo.push(data);
          cardListSection.setView(getCardData(data));
        })
    });

    const userInfoSection = new UserInfoSection();
    userInfoSection.setHandlers({
      editButtonClickCallback: () => userInfoPopup.open(userInfoSection.getInfo()),
      addButtonClickCallback: () => newCardPopup.open(),
      avatarImgClickCallback: () => avatarPopup.open(userInfoSection.getInfo())
    });
    userInfoSection.appendTo(document.querySelector('.profile.root__section'));

    const cardListSection = new CardListSection();
    cardListSection.appendTo(document.querySelector('.root'));
    function getCardData(cardInfo) {
      return {
        data: {...cardInfo, currentUserId: userInfo._id},
        handlers: {
          removeHandlerCallback: (card) => {
            api.deleteCard(card.id)
              .then(() => {
                cardsInfo = cardsInfo.filter(item => {
                  return item._id !== cardInfo._id;
                });
                card.remove()
              })
          },
          openHandlerCallback: () => {
            picturePopup.open(cardInfo.link);
            return picturePopup
          },
          likeHandlerCallback: (card) => {
            api.changeLikeCardStatus(card.id, !card.isLiked)
              .then(data => {
                const index = cardsInfo.findIndex(item => item._id === card.id);
                cardsInfo.splice(index, 1, data);
                card.setView({...data, currentUserId: userInfo._id});
              })
          }
        }
      }
    }

    cardListSection.setView(cardsInfo.map(item => getCardData(item)));
    userInfoSection.setView(userInfo);
  });

