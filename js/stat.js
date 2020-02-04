'use strict';

window.renderStatistics = function (ctx, names, times) {

  var TEXT = {
    font: '16px PT Mono',
    padding: 20
  };

  var COLOR = {
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',
    shadow: 'rgba(0,0,0,.7)',
    red: 'rgba(255, 0, 0, 1)',
    randomBlue: function () {
      return 'hsl(240, ' + Math.floor(Math.random() * 100) + '% , 50%)';
    }
  };

  var CLOUD = {
    beginX: 100,
    beginY: 10,
    width: 420,
    height: 270,
    shadowOffset: 10,
    titleRowFirst: 'Ура вы победили!',
    titleRowSecond: 'Список результатов',
    innerPaddingX: 20,
    innerPaddingY: 30,
    render: function () {

      ctx.fillStyle = COLOR.shadow;
      ctx.fillRect(this.beginX + this.shadowOffset, this.beginY + this.shadowOffset, this.width, this.height);

      ctx.strokeStyle = COLOR.black;
      ctx.strokeRect(this.beginX, this.beginY, this.width, this.height);

      ctx.fillStyle = COLOR.white;
      ctx.fillRect(this.beginX, this.beginY, this.width, this.height);

      ctx.fillStyle = COLOR.black;
      ctx.font = TEXT.font;
      ctx.fillText(this.titleRowFirst, this.beginX + this.innerPaddingX, this.beginY + this.innerPaddingY);
      ctx.fillText(this.titleRowSecond, this.beginX + this.innerPaddingX, this.beginY + this.innerPaddingY + TEXT.padding);

    },
  };


  var HISTOGRAM = {
    height: 150,
    columnWidth: 40,
    columnInterval: 50,
    columnNumber: 0,
    names: names,
    times: times,
    maxTime: function () {
      var maxTime = 0;
      for (var i = 0; i < this.times.length; i++) {
        if (maxTime < times[i]) {
          maxTime = times[i];
        }
      }
      return maxTime;
    },

    columnColor: function (name) {
      if (name === 'Вы') {
        return COLOR.red;
      }
      return COLOR.randomBlue();
    },

    drawColumn: function (name, time) {

      time = Math.round(time);
      var colTextPadding = 10;
      var colHeight = time * this.height / this.maxTime();
      var colBeginY = CLOUD.beginY + CLOUD.height - CLOUD.innerPaddingY - colHeight - colTextPadding;
      var colBeginX = CLOUD.beginX + CLOUD.innerPaddingX + (this.columnWidth + this.columnInterval) * this.columnNumber;
      var colTimeBeginY = colBeginY - colTextPadding;
      var colNameBeginY = CLOUD.beginY + CLOUD.height - CLOUD.innerPaddingY + colTextPadding;
      var colColor = this.columnColor(name);
      var colTextColor = COLOR.black;

      ctx.fillStyle = colColor;
      ctx.fillRect(colBeginX, colBeginY, this.columnWidth, colHeight);

      ctx.fillStyle = colTextColor;
      ctx.fillText(time, colBeginX, colTimeBeginY);
      ctx.fillText(name, colBeginX, colNameBeginY);

      this.columnNumber++;

    },
    render: function () {

      for (var i = 0; i < this.names.length; i++) {
        this.drawColumn(names[i], times[i]);
      }

    }
  };

  CLOUD.render();
  HISTOGRAM.render();
};
