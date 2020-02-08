'use strict';
var setup = document.querySelector('.setup');
var wizardTpl = document.querySelector('#similar-wizard-template').content;
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');

var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var getRandomItemFromArray = function (arr) {
  var index = Math.floor(Math.random() * Math.floor(arr.length));
  return arr[index];
};

var getWizardData = function () {
  return {
    name: getRandomItemFromArray(firstNames) + ' ' + getRandomItemFromArray(secondNames),
    coatColor: getRandomItemFromArray(coatColors),
    eyesColor: getRandomItemFromArray(eyesColors),
  };
};

var wizards = new Array(4);
for (var i = 0; i < wizards.length; i++) {
  wizards.push(getWizardData());
}

var getWizardsContent = function () {
  var fragment = new DocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    var wizardItem = wizardTpl.cloneNode(true);
    var wizardItemName = wizardItem.querySelector('.setup-similar-label');
    var wizardItemCoatColor = wizardItem.querySelector('.wizard-coat');
    var wizardItemEyesColor = wizardItem.querySelector('.wizard-eyes');

    wizardItemName.textContent = wizards[i].name;
    wizardItemCoatColor.setAttribute('fill', wizards[i].coatColor);
    wizardItemEyesColor.setAttribute('fill', wizards[i].eyesColor);
    fragment.appendChild(wizardItem);
  }
  return fragment;
};

setupSimilarList.appendChild(getWizardsContent());
