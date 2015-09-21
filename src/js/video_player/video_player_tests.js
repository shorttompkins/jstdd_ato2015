'use strict';

describe('VideoPlayer', function () {
  var player, $player;
  beforeEach(function () {
    player = new VideoPlayer();
  });

  describe('load', function () {
    beforeEach(function () {
      spyOn(player, '_reset');
      $player = {};
      spyOn($.fn, 'init').and.callFake(function(selector){
        if(selector === '#testing') {
          return $player;
        }
      });
      spyOn(player, 'showChrome');
      spyOn(player, 'play');

      player.load('#testing');
    });

    it('should call _reset', function () {
      expect(player._reset).toHaveBeenCalled();
    });
    it('should define $player', function () {
      expect(player.$player).toBe($player);
    });
    it('should define player.details specifics', function () {
      expect(player.details.title).toEqual('Big Trouble in Little China');
      expect(player.details.time.elapsed).toEqual(0);
      expect(player.details.time.total).toEqual(200);
    });
    it('should call showChrome', function () {
      expect(player.showChrome).toHaveBeenCalled();
    });
    it('should call play', function () {
      expect(player.play).toHaveBeenCalled();
    });
  });

  describe('play', function () {
    beforeEach(function () {
      spyOn(player, '_startTimerInterval');
      spyOn(player, '_draw');
      player.play();
    });
    it('should set state.status to "playing"', function () {
      expect(player.state.status).toEqual('playing');
    });
    it('should set state.paused to false', function () {
      expect(player.state.paused).toBe(false);
    });
    it('should call _startTimerInterval', function () {
      expect(player._startTimerInterval).toHaveBeenCalled();
    });
    it('should call _draw', function () {
      expect(player._draw).toHaveBeenCalled();
    });
  });

  describe('pause', function () {
    beforeEach(function () {
      spyOn(player, '_stopTimerInterval');
      spyOn(player, '_draw');
      player.pause();
    });
    it('should set state.paused to true', function () {
      expect(player.state.paused).toBe(true);
    });
    it('should call _stopTimerInterval', function () {
      expect(player._stopTimerInterval).toHaveBeenCalled();
    });
    it('should call _draw', function () {
      expect(player._draw).toHaveBeenCalled();
    });
  });


});
