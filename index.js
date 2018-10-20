var variants = {
  NO_ANSWERS: [
    'чё самый умный?',
    'чё охуел?',
    'чё?',
    'прикинь тут дибил какой-то пишет',
    'да вы заебали!',
    'семки есть?',
    'ты вообще кто по жизни?',
    'да кто вы такие все?',
    'мне похуй',
    'слышь, как эту херабору закрыть?',
  ],
  TRIGGERS: [
    [/^пох(у[йи])?$/i, 'похуй пидору чулки!'],
    [/^к[оа]роч[ье]?$/i, 'у кого короче, тот дома сидит!'],
    [/^ч[еоё]$/i, 'хуй в очо!'],
    [/^300$/i, 'отсоси у тракториста!'],
    [/^трист[ао]$/i, 'отсоси у тракториста!'],
    [/^нет$/i, 'пидора ответ!'],
    [/^да$/i, 'манда!'],
    [/^хо(чу|тим|тят|тел|тела)$/i, 'хотеть не вредно!'],
    [/^я$/i, 'головка от хуя!'],
  ],
  QUESTIONS: [
    '?', 'кто', 'что', 'какой', 'который', 'где', 'когда', 'почему', 'зачем', 'куда', 'откуда', 'сколько', 'чей', 'как'
  ],
  ANSWER_TO_QUESTION: [
    'а тебя ебёт?',
    'тебе чё делать нехуй?',
  ],
  VOWELS: ['а', 'е', 'ё', 'и', 'о', 'у', 'э', 'ю', 'я'],
  VOWEL_TO_RHYME: {
    'а': 'хуя',
    'е': 'хуе',
    'ё': 'хуё',
    'и': 'хуи',
    'о': 'хуё',
    'у': 'хую',
    'э': 'хуе',
    'ю': 'хую',
    'я': 'хуя',
  }
};

// Todo: Ебанутая функция. Надо переписать...
function wordType(word) {
  var groups = {
    1: ['ее', 'ие', 'ые', 'ое', 'ими', 'ыми', 'ей', 'ий', 'ый', 'ой', 'ем', 'им', 'ым', 'ом',
      'его', 'ого', 'ему', 'ому', 'их', 'ых', 'ую', 'юю', 'ая', 'яя', 'ою', 'ею'],
    2: ['ивш', 'ывш', 'ующ', 'ем', 'нн', 'вш', 'ющ', 'ущи', 'ющи', 'ящий', 'щих', 'щие', 'ляя'],
    3: ['ила', 'ыла', 'ена', 'ейте', 'уйте', 'ите', 'или', 'ыли', 'ей', 'уй', 'ил', 'ыл', 'им', 'ым', 'ен',
      'ило', 'ыло', 'ено', 'ят', 'ует', 'уют', 'ит', 'ыт', 'ены', 'ить', 'ыть', 'ишь', 'ую', 'ю', 'ла', 'на', 'ете', 'йте',
      'ли', 'й', 'л', 'ем', 'н', 'ло', 'ет', 'ют', 'ны', 'ть', 'ешь', 'нно'],
    4: ['а', 'ев', 'ов', 'ье', 'иями', 'ями', 'ами', 'еи', 'ии', 'и', 'ией', 'ей', 'ой', 'ий', 'й', 'иям', 'ям', 'ием', 'ем',
      'ам', 'ом', 'о', 'у', 'ах', 'иях', 'ях', 'ы', 'ь', 'ию', 'ью', 'ю', 'ия', 'ья', 'я', 'ок', 'мва', 'яна', 'ровать',
      'ег', 'ги', 'га', 'сть', 'сти'],
    5: ['чно', 'еко', 'соко', 'боко', 'роко', 'имо', 'мно', 'жно', 'жко', 'ело', 'тно', 'льно', 'здо', 'зко', 'шо', 'хо', 'но'],
    6: ['чуть', 'много', 'мало', 'еро', 'вое', 'рое', 'еро', 'сти', 'одной', 'двух', 'рех', 'еми', 'яти', 'ьми', 'ати',
      'дного', 'сто', 'ста', 'тысяча', 'тысячи', 'две', 'три', 'одна', 'умя', 'тью', 'мя', 'тью', 'мью', 'тью', 'одним'],
    7: ['более', 'менее', 'очень', 'крайне', 'скоре', 'некотор', 'кажд', 'други', 'котор', 'когд', 'однак',
      'если', 'чтоб', 'хот', 'смотря', 'как', 'также', 'так', 'зато', 'что', 'или', 'потом', 'эт', 'тог', 'тоже', 'словно',
      'ежели', 'кабы', 'коли', 'ничем', 'чем'],
    8: ['в', 'на', 'по', 'из']
  };

  var res = [];
  for (var gk in groups) {
    if (groups.hasOwnProperty(gk)) {
      groups[gk].forEach(function (part) {
        if (!res[gk]) res[gk] = 0;
        if (
          (word.substr(word.length - part.length) === part && res[gk] < part.length) // любая часть речи, окончания
          || (gk === 2 && word.indexOf(part) >= (Math.round(2 * word.length) / 5)) // причастие, от 40% и правее от длины слова
          || (word.substr(0, part.length) === part && res[gk] < part.length && gk === 7) // союз, от начала слОва
          || word === part // полное совпадение
        ) {
          if (word !== part) res[gk] = part.length;
          else res[gk] = 99;
        }
      });
    }
  }

  return res;
}

/**
 * Returns list words from text.
 */
var getWords = function (text) {
  var regex = /[а-яА-Я]+/g;
  if (typeof text !== 'string') return [];

  var tokens = [];
  while ((m = regex.exec(text)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match) => {
      tokens.push(match.toLowerCase());
    });
  }
  return tokens.filter((token) => typeof token === 'string');
};

/**
 * Checks text for trigger words and yields possible replies.
 */
function getByWordTrigger(text) {
  for (var word of getWords(text)) {
    for (var [regexp, answer] of variants.TRIGGERS) {
      if (word.match(regexp)) {
        return answer;
      }
    }
  }
}

/**
 * Checks if text is a question and returns answer.
 */
var getAnswerToQuestion = function (text) {
  var questions = variants.QUESTIONS.filter(function (question) {
    return (text.toLowerCase().indexOf(question) > -1);
  });
  if (questions.length) return variants.ANSWER_TO_QUESTION;
  return [];
};

/**
 * Returns first syllable of a words.
 */
var getFirstSyllable = function (word) {
  var result = [];
  var readVowel = false;
  for (var letter of word) {
    var isVowel = variants.VOWELS.indexOf(letter) !== -1;
    if (readVowel && !isVowel) {
      break;
    }
    if (isVowel) {
      readVowel = true;
    }
    result.push(letter);
  }
  return result.join('');
};

/**
 * Returns possible rhyme for noun and adjective.
 */
var getRhyme = function (word) {
  if (!wordType(word)[3]){
    return;
  }
  var syllable = getFirstSyllable(word);
  if (!syllable || syllable === word) {
    return;
  }
  var prefix = variants.VOWEL_TO_RHYME[syllable.substr(-1)];
  var postfix = word.substr(syllable.length);

  return `${prefix}${postfix}`;
};

/**
 * Returns all possible rhymes for text.
 */
var getRhymes = function (text) {
  return getWords(text).map(getRhyme).filter(function (el) {return el != null;}).reverse();
};

/**
 * Returns all possible replies to text.
 */
var getReplies = function (text) {
  var first = getByWordTrigger(text);
  var second = getAnswerToQuestion(text);
  var third = getRhymes(text);
  var answers = [];
  if (first) answers = answers.concat(first);
  if (second && !answers.length) answers = answers.concat(second);
  if (third && !answers.length) answers = answers.concat(third);
  if (answers.length) {
    return answers;
  } else {
    return variants.NO_ANSWERS;
  }
};

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
var answersPool = [];

var addVovanMessage = function () {
  var answer = answersPool.splice(Math.floor(Math.random() * answersPool.length), 1);
  document.getElementsByClassName('lol-messages__wrapper')[0].insertAdjacentHTML('beforeend', messageTemplate(true, answer[0]));
  document.getElementsByClassName('lol-messages__typing')[0].style.setProperty('display', 'none');
};
var setVovanTyping = function () {
  document.getElementsByClassName('lol-messages__typing')[0].style.setProperty('display', 'block');
};
var newMessage = function () {
  var input = document.getElementsByClassName('lol-footer__input')[0];
  if (!input.value || input.value === '') return;

  answersPool = getReplies(input.value);
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
  document.body.insertAdjacentHTML('beforeend', '<link href="http://rootfox.cc/funny/lol-chat/index.css" rel="stylesheet" type="text/css">');
  document.getElementsByClassName('lol-button')[0].addEventListener('click', function () {
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
