var firstMessagePool = [
  'ахаха, ну ты лошара!',
  'слышь чё доебался',
  'прикинь тут дибил какой-то пишет',
  'тебе чё делать нехуй?',
  'да вы заебали!',
  'семки есть?',
  'как звать? с какого района?',
  'ты вообще кто по жизни?',
  'да кто вы такие все?',
  'да мне похуй',
  'твои проблемы - ты и решай',
  'отвечаешь?',
  'слышь, как эту херабору закрыть?',
  'да хули ты мне лечишь?',
];

var notFirstMessages = [
  'бля не туда написал, не обессудь',
];

var answersPool = [];

var vovanAnsweredFirstQuestion = false;

var messageTemplate = function (isVovan, message) {
  var time = (new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours()) + ':' + new Date().getMinutes();
  var messageClass = 'lol-messages__message';
  if (!isVovan) messageClass += ' lol-messages__message-user';
  var template = '<div class="' + messageClass + '">' +
    '<div class="lol-messages__message__avatar">';
  if (isVovan) template += '<img src="https://memepedia.ru/wp-content/uploads/2017/04/%D0%B5%D0%B1%D0%B0%D1%82%D1%8C-%D1%82%D1%8B-%D0%BB%D0%BE%D1%85-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB.jpg">';
  return template +
    '</div>' +
    '<div class="lol-messages__message__time">' + time + '</div>' +
    '<div class="lol-messages__message__body">' + message + '</div>' +
    '</div>';
};

var chatTemplate = '' +
  '<div class="lol" style="display: none;">' +
  '    <div class="lol-wrapper">' +
  '        <div class="lol-header">' +
  '            <div class="lol-header__avatar">' +
  '                <img' +
  '                    src="https://memepedia.ru/wp-content/uploads/2017/04/%D0%B5%D0%B1%D0%B0%D1%82%D1%8C-%D1%82%D1%8B-%D0%BB%D0%BE%D1%85-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB.jpg">' +
  '            </div>' +
  '            <div class="lol-header__close"></div>' +
  '            <div class="lol-header__minimize"></div>' +
  '        </div>' +
  '' +
  '        <div class="lol-messages">' +
  '            <div class="lol-messages__wrapper"></div>' +
  '            <div class="lol-messages__typing">' +
  '                <div class="lol-messages__typing__icon"></div>' +
  '                <div class="lol-messages__typing__Label">Вован is typing...</div>' +
  '            </div>' +
  '        </div>' +
  '' +
  '        <div class="lol-footer">' +
  '            <div class="lol-footer__wrapper">' +
  '                <input class="lol-footer__input"/>' +
  '' +
  '                <div class="lol-footer__button__wrapper">' +
  '                    <div class="lol-footer__button"></div>' +
  '                </div>' +
  '            </div>' +
  '        </div>' +
  '    </div>' +
  '</div>';

var typingTimeout = null;
var answerTimeout = null;
var addVovanMessage = function() {
  document.getElementsByClassName('lol-messages__wrapper')[0].insertAdjacentHTML('beforeend', messageTemplate(true, answersPool[Math.floor(Math.random() * answersPool.length)]));
  document.getElementsByClassName('lol-messages__typing')[0].style.setProperty('display', 'none');
  vovanAnsweredFirstQuestion = true;
};
var setVovanTyping = function() {
  document.getElementsByClassName('lol-messages__typing')[0].style.setProperty('display', 'block');
};
var newMessage = function() {
  var input = document.getElementsByClassName('lol-footer__input')[0];
  if (!input.value || input.value === '') return;
  document.getElementsByClassName('lol-messages__wrapper')[0].insertAdjacentHTML('beforeend', messageTemplate(false, input.value));
  input.value = '';

  if (typingTimeout) clearTimeout(typingTimeout);
  if (answerTimeout) clearTimeout(answerTimeout);

  typingTimeout = setTimeout(setVovanTyping, 5000);
  answerTimeout = setTimeout(addVovanMessage, 10000);
};

document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML('beforeend', '<div class="lol-container"><div class="lol-button" style="display: none;">Задать вопрос</div></div>');
  document.getElementsByClassName('lol-container')[0].insertAdjacentHTML('beforeend', chatTemplate);
  document.body.insertAdjacentHTML('beforeend', '<link href="http://rootfox.cc/lol-chat/index.css" rel="stylesheet" type="text/css">');
  document.getElementsByClassName('lol-button')[0].addEventListener('click', function () {
    if (!vovanAnsweredFirstQuestion){
      answersPool = firstMessagePool.concat(notFirstMessages);
    } else {
      answersPool = firstMessagePool.concat([]);
    }
    document.getElementsByClassName('lol-button')[0].style.setProperty('display', 'none', 'important');
    document.getElementsByClassName('lol')[0].style.setProperty('display', 'block');
    document.getElementsByClassName('lol-container')[0].className = 'lol-container opened';
    document.getElementsByClassName('lol-messages__wrapper')[0].insertAdjacentHTML('beforeend', messageTemplate(true, 'Здравствуйте, меня зовут Владимир. Расскажите о вашей проблеме и мы постараемся её решить. Что случилось?'));
  });
  document.getElementsByClassName('lol-header__close')[0].addEventListener('click', function (e) {
    document.getElementsByClassName('lol-button')[0].style.setProperty('display', 'none');
    document.getElementsByClassName('lol')[0].style.setProperty('display', 'none');
    document.getElementsByClassName('lol-container')[0].className = 'lol-container';
    document.getElementsByClassName('lol-messages__wrapper')[0].innerHTML = '';
    vovanAnsweredFirstQuestion = false;
  });
  document.getElementsByClassName('lol-header__minimize')[0].addEventListener('click', function (e) {

  });
  document.getElementsByClassName('lol-footer__input')[0].addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      newMessage();
    }
  });
  document.getElementsByClassName('lol-footer__button')[0].addEventListener('click', function (e) {
    newMessage();
  });
});
