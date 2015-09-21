'use strict';

var VideoPlayer = function() {
  var player = this;

  // PUBLIC:
  player.load = function(playerSelector) {
    player._reset();
    player.$player = $(playerSelector);

    // initialize details:
    player.details.title = 'Big Trouble in Little China';
    player.details.time.elapsed = 0;
    player.details.time.total = 200;

    player.showChrome();
    player.play();
  };
  player.play = function() {
    player.state.status = 'playing';
    player.state.paused = false;
    player._startTimerInterval();
    player._draw();
  };
  player.pause = function() {
    player.state.paused = true;
    player._stopTimerInterval();
    player._draw();
  };
  player.stop = function() {
    player._stopTimerInterval();
    player.hideChrome();
    player._reset();
  };
  player.seek = function(interval) {
    player.details.time.elapsed += interval;
    if (player.details.time.elapsed < 0) {
      player.details.time.elapsed = 0;
    }
    if (player.details.time.elapsed > player.details.time.total) {
      player.details.time.elapsed = player.details.time.total;
    }
    player._draw();
  };
  player.showChrome = function() {
    player._draw();
    player.$player.show();
  };
  player.hideChrome = function() {
    player.$player.hide();
  };
  player.getState = function(state) {
    return player.state[state];
  };

  // PRIVATE:
  player._reset = function() {
    player._stopTimerInterval();
    player.state = {
      status: '',   // playing, loading, buffering, etc.
      paused: false
    };

    player.details = {
      title: '',
      time: {
        elapsed: 0,
        total: 0
      }
    };

    player.$player = null;
  };
  player._startTimerInterval = function() {
    if (!player._timer) {
      player._timer = setInterval(function(){
        player.details.time.elapsed += 1;
        if (player.details.time.elapsed >= player.details.time.total) {
          player.pause();
        }
        player._draw();
      }, 1000);
    }
  };
  player._stopTimerInterval = function() {
    clearInterval(player._timer);
    delete player._timer;
  };
  player._draw = function() {
    player.$player.find('.title').text(player.details.title);
    player.$player.find('.time .elapsed').text(player.details.time.elapsed);
    player.$player.find('.time .total').text(player.details.time.total);
    player.$player.find('.progress-bar .elapsed').css({width: ((player.details.time.elapsed / player.details.time.total) * 100) + '%' });
    player.$player.find('.indicator-icon i').attr('class', 'fa fa-' + (player.state.paused ? 'play' : 'pause'));
  };

  // initialize
  player._reset();

  return player;
  // return {
  //   state: player.state,
  //   details: player.details,
  //
  //   load: player.load,
  //   play: player.play,
  //   pause: player.pause,
  //   stop: player.stop,
  //   seek: player.seek,
  //   getState: player.getState,
  //   showChrome: player.showChrome,
  //   hideChrome: player.hideChrome
  // };
};
//})();
