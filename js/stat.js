'use strict';
window.renderStatistics = function (ctx, names, times) {
  var CLOUD_BEGIN_X = 100;
  var CLOUD_BEGIN_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var HISTOGRAM_HEIGHT = 150;
  var HISTOGRAM_COLUMN_WIDTH = 40;
  var HISTOGRAM_COLUMN_GAP = 50;

  // CLOUD_SHADOW
  ctx.fillStyle = 'rgba(0,0,0,.7)';
  ctx.fillRect(CLOUD_BEGIN_X + 10, CLOUD_BEGIN_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  // CLOUD
  ctx.strokeStyle = '#000';
  ctx.strokeRect(CLOUD_BEGIN_X, CLOUD_BEGIN_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(CLOUD_BEGIN_X, CLOUD_BEGIN_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  // CLOUD_TITLE
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_BEGIN_X + 20, CLOUD_BEGIN_Y + 40);
  ctx.fillText('Список результатов: ', CLOUD_BEGIN_X + 20, CLOUD_BEGIN_Y + 60);

  // HISTOGRAM_COLUMN
  var makeColumn = function (column) {
    var columnNameX = column.beginX;
    var columnNameY = column.beginY + HISTOGRAM_HEIGHT + 20;
    var columnTimeX = column.beginX;
    var columnTimeY = column.beginY + HISTOGRAM_HEIGHT - column.height - 10;
    var columnBeginX = column.beginX;
    var columnBeginY = column.beginY + HISTOGRAM_HEIGHT - column.height;
    var columnColor = column.name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(Math.random() * 100) + '% , 50%)';

    ctx.fillStyle = columnColor;
    ctx.fillRect(columnBeginX, columnBeginY, HISTOGRAM_COLUMN_WIDTH, column.height);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(column.time, columnTimeX, columnTimeY);
    ctx.fillText(column.name, columnNameX, columnNameY);
  };

  // HISTOGRAM
  var createHistogram = function () {

    var column = {
      beginX: CLOUD_BEGIN_X + 40,
      beginY: CLOUD_BEGIN_Y + 90,
      height: '',
      name: '',
      time: '',
    };

    var maxTime = 0;

    for (var i = 0; i < times.length; i++) {
      if (maxTime < times[i]) {
        maxTime = times[i];
      }
    }

    for (var j = 0; j < names.length; j++) {
      column.name = names[j];
      column.time = Math.round(times[j]);
      column.height = (times[j] * HISTOGRAM_HEIGHT) / maxTime;
      makeColumn(column);
      column.beginX += HISTOGRAM_COLUMN_WIDTH + HISTOGRAM_COLUMN_GAP;
    }
  };

  createHistogram();
};
