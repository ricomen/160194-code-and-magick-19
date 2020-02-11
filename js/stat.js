'use strict';

window.renderStatistics = function (ctx, names, times) {

  var TextProps = {
    FONT_SIZE: 16,
    FONT_NANE: 'PT Mono',
    LINE_HEIGHT: 20
  };

  var Colors = {
    WHITE: 'rgb(255,255,255)',
    BLACK: 'rgb(0,0,0)',
    SHADOW: 'rgba(0,0,0,.7)',
    RED: 'rgba(255, 0, 0, 1)',
  };

  var CloudProps = {
    BEGIN_X: 100,
    BEGIN_Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    SHADOW_OFFSET: 10,
    INNER_PADDING_X: 20,
    INNER_PADDING_Y: 30,
  };

  var HistogramProps = {
    HEIGHT: 150,
    COLUMN_WIDTH: 40,
    COLUMN_INTERVAL: 50,
  };

  var getRandomBlue = function () {
    return 'hsl(240, ' + Math.floor(Math.random() * 100) + '% , 50%)';
  };

  var renderCloud = function (cloudProps, colors, textProps) {
    var winnerTitle = 'Ура вы победили!';
    var resultSummaryTitle = 'Список результатов';
    var CLOUD_SHADOW_BEGIN_X = cloudProps.BEGIN_X + cloudProps.SHADOW_OFFSET;
    var CLOUD_SHADOW_BEGIN_Y = cloudProps.BEGIN_Y + cloudProps.SHADOW_OFFSET;
    var CLOUD_BEGIN_X = cloudProps.BEGIN_X;
    var CLOUD_BEGIN_Y = cloudProps.BEGIN_Y;
    var CLOUD_WIDTH = cloudProps.WIDTH;
    var CLOUD_HEIGHT = cloudProps.HEIGHT;
    var COLOR_SHADOW = colors.SHADOW;
    var COLOR_BLACK = colors.BLACK;
    var COLOR_WHITE = colors.WHITE;
    var TEXT_STYLE = textProps.FONT_SIZE + 'px ' + textProps.FONT_NANE;
    var LINE_HEIGHT = textProps.LINE_HEIGHT;
    var CLOUD_INNER_PADDING_X = cloudProps.INNER_PADDING_X;
    var CLOUD_INNER_PADDING_Y = cloudProps.INNER_PADDING_Y;
    var titleBeginX = CLOUD_BEGIN_X + CLOUD_INNER_PADDING_X;
    var titleBeginY = CLOUD_BEGIN_Y + CLOUD_INNER_PADDING_Y;

    var drawTitle = function (text, posX, posY) {
      ctx.fillText(text, posX, posY);
    };

    ctx.fillStyle = COLOR_SHADOW;
    ctx.fillRect(CLOUD_SHADOW_BEGIN_X, CLOUD_SHADOW_BEGIN_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.strokeStyle = COLOR_BLACK;
    ctx.strokeRect(CLOUD_BEGIN_X, CLOUD_BEGIN_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(CLOUD_BEGIN_X, CLOUD_BEGIN_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = COLOR_BLACK;
    ctx.font = TEXT_STYLE;
    drawTitle(winnerTitle, titleBeginX, titleBeginY);
    drawTitle(resultSummaryTitle, titleBeginX, titleBeginY + LINE_HEIGHT);
  };

  var getFastestTime = function (times) {
    var maxTime = times.reduce(function (maxValue, current) {
      return maxValue < current ? current : maxValue;
    });
    return maxTime;
  };

  var renderHistogram = function (cloudProps, histogramProps, colors, textProps) {
    var HISTOGRAM_BEGIN_X = cloudProps.BEGIN_X + cloudProps.INNER_PADDING_X;
    var HISTOGRAM_BEGIN_Y = cloudProps.BEGIN_Y + cloudProps.HEIGHT - cloudProps.INNER_PADDING_X;
    var HISTOGRAM_PADDING_X = 20;
    var HISTOGRAM_HEIGHT = histogramProps.HEIGHT;
    var COLOR_BLACK = colors.BLACK;
    var TEXT_STYLE = textProps.FONT_SIZE + 'px ' + textProps.FONT_NANE;
    var MAX_TIME = getFastestTime(times);
    var getHistogramColumnColor = function (name) {
      if (name === 'Вы') {
        return colors.RED;
      }
      return getRandomBlue();
    };

    var drawColumn = function (name, time, i) {
      time = Math.round(time);
      var COLUMN_COLOR = getHistogramColumnColor(name);
      var COLUMN_NUMBER = i;
      var LABEL_PADDING_Y = 10;
      var COLUMN_WIDTH = histogramProps.COLUMN_WIDTH;
      var COLUMN_INTERVAL = histogramProps.COLUMN_INTERVAL;
      var COLUMN_HEIGHT = Math.round(((time * HISTOGRAM_HEIGHT) / MAX_TIME));
      var COLUMN_BEGIN_X = HISTOGRAM_BEGIN_X + HISTOGRAM_PADDING_X + (COLUMN_WIDTH + COLUMN_INTERVAL) * COLUMN_NUMBER;
      var COLUMN_BEGIN_Y = HISTOGRAM_BEGIN_Y;
      var COLUMN_FILL_X = COLUMN_BEGIN_X;
      var COLUMN_FILL_Y = HISTOGRAM_BEGIN_Y - COLUMN_HEIGHT - LABEL_PADDING_Y;
      var LABEL_NAME_X = COLUMN_BEGIN_X;
      var LABEL_NAME_Y = COLUMN_BEGIN_Y + LABEL_PADDING_Y;
      var LABEL_TIME_X = COLUMN_BEGIN_X;
      var LABEL_TIME_Y = COLUMN_FILL_Y - LABEL_PADDING_Y;
      var LABEL_TIME = time;
      var LABEL_NAME = name;

      ctx.fillStyle = COLUMN_COLOR;
      ctx.fillRect(COLUMN_FILL_X, COLUMN_FILL_Y, COLUMN_WIDTH, COLUMN_HEIGHT);

      ctx.fillStyle = COLOR_BLACK;
      ctx.font = TEXT_STYLE;
      ctx.fillText(LABEL_TIME, LABEL_TIME_X, LABEL_TIME_Y);
      ctx.fillText(LABEL_NAME, LABEL_NAME_X, LABEL_NAME_Y);
    };

    names.forEach(function (item, i) {
      drawColumn(item, times[i], i);
    });

  };

  renderCloud(CloudProps, Colors, TextProps);
  renderHistogram(CloudProps, HistogramProps, Colors, TextProps);
};
