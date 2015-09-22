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

  describe('stop', function () {
    beforeEach(function () {
      spyOn(player, '_stopTimerInterval');
      spyOn(player, 'hideChrome');
      spyOn(player, '_reset');
      player.stop();
    });
    it('should _stopTimerInterval', function () {
      expect(player._stopTimerInterval).toHaveBeenCalled();
    });
    it('should hideChrome', function () {
      expect(player.hideChrome).toHaveBeenCalled();
    });
    it('should _reset', function () {
      expect(player._reset).toHaveBeenCalled();
    });
  });

  describe('seek', function () {
    beforeEach(function () {
      spyOn(player, '_draw');
      player.details.time.elapsed = 0;
      player.details.time.total = 100;
    });
    it('should increment time.elapsed', function () {
      player.seek(90);
      expect(player.details.time.elapsed).toEqual(90);
    });
    it('should decrement time.elapsed', function () {
      player.details.time.elapsed = 50;
      player.seek(-20);
      expect(player.details.time.elapsed).toEqual(30);
    });
    it('should not exceed time.total', function () {
      player.seek(500);
      expect(player.details.time.elapsed).toEqual(player.details.time.total);
    });
    it('should not go below 0', function () {
      player.seek(-500);
      expect(player.details.time.elapsed).toEqual(0);
    });
    it('should call _draw', function () {
      player.seek(90);
      expect(player._draw).toHaveBeenCalled();
    });
  });

  describe('showChrome', function () {
    beforeEach(function () {
      $player = {
        show: jasmine.createSpy('show')
      };
      spyOn($.fn, 'init').and.callFake(function(selector){
        if(selector === '#testing') {
          return $player;
        }
      });
      spyOn(player, '_draw');
      player.$player = $player;
      player.showChrome();
    });
    it('should call _draw', function () {
      expect(player._draw).toHaveBeenCalled();
    });
    it('should call $player.show', function () {
      expect($player.show).toHaveBeenCalled();
    });
  });

  describe('hideChrome', function () {
    beforeEach(function () {
      $player = {
        hide: jasmine.createSpy('hide')
      };
      spyOn($.fn, 'init').and.callFake(function(selector){
        if(selector === '#testing') {
          return $player;
        }
      });
      player.$player = $player;
      player.hideChrome();
    });
    it('should call $player.hide', function () {
      expect($player.hide).toHaveBeenCalled();
    });
  });

  describe('getState', function () {
    beforeEach(function () {
      player.state = {
        test: 'testing 1 2 3',
        another: 'another test',
        third: 'last test'
      };
    });
    it('should return state.value', function () {
      expect(player.getState('test')).toEqual('testing 1 2 3');
      expect(player.getState('another')).toEqual('another test');
      expect(player.getState('third')).toEqual('last test');
    });
  });

  describe('_reset', function () {
    beforeEach(function () {
      spyOn(player, '_stopTimerInterval');
      player._reset();
    });
    describe('state', function () {
      it('should define status', function () {
        expect(player.state.status).toBeDefined();
        expect(player.state.status).toEqual('');
      });
      it('should define paused', function () {
        expect(player.state.paused).toBeDefined();
        expect(player.state.paused).toBe(false);
      });
    });
    describe('details', function () {
      it('should define title', function () {
        expect(player.details.title).toBeDefined();
        expect(player.details.title).toEqual('');
      });
      it('should define time', function () {
        expect(player.details.time).toBeDefined();
      });
      describe('time', function () {
        it('should define elapsed', function () {
          expect(player.details.time.elapsed).toBeDefined();
          expect(player.details.time.elapsed).toEqual(0);
        });
        it('should define total', function () {
          expect(player.details.time.total).toBeDefined();
          expect(player.details.time.total).toEqual(0);
        });
      });
    });
    it('should null $player', function () {
      expect(player.$player).toBeDefined();
      expect(player.$player).toBe(null);
    });
  });

  describe('_startTimerInterval', function () {
    beforeEach(function () {
      spyOn(player, '_draw');
      spyOn(player, 'pause');
      spyOn(window, 'setInterval').and.callFake(function(cb) {
        cb();
        return 321;
      });
      player._startTimerInterval();
    });
    it('should define _timer', function () {
      expect(player._timer).toEqual(321);
    });
    it('should increment time.elapsed by 1', function () {
      expect(player.details.time.elapsed).toEqual(1);
    });
    it('should pause when elapsed >= total', function () {
      player.details.time.elapsed = 99;
      player.details.time.total = 100;
      player._startTimerInterval();
      expect(player.pause).toHaveBeenCalled();
    });
    it('should call _draw every time', function () {
      expect(player._draw).toHaveBeenCalled();
    });
    it('should repeat every 1000 ms', function () {
      expect(window.setInterval).toHaveBeenCalledWith(jasmine.any(Function), 1000);
    });
  });

  describe('_stopTimerInterval', function () {
    beforeEach(function () {
      spyOn(window, 'clearInterval');
      player._timer = 123;
      player._stopTimerInterval();
    });
    it('should call clearInterval', function () {
      expect(window.clearInterval).toHaveBeenCalledWith(123);
    });
    it('should delete _timer', function () {
      expect(player._timer).not.toBeDefined();
    });
  });

  describe('_draw', function () {
    var textSpy, cssSpy, attrSpy;
    beforeEach(function () {
      textSpy = jasmine.createSpy('text');
      cssSpy = jasmine.createSpy('css');
      attrSpy = jasmine.createSpy('attr');
      $player = {
        find: jasmine.createSpy('find').and.callFake(function(selector){
          if (selector === '.title' || selector === '.time .elapsed' || selector === '.time .total') {
            return { text: textSpy };
          } else if (selector === '.progress-bar .elapsed') {
            return { css: cssSpy };
          } else if (selector === '.indicator-icon i') {
            return { attr: attrSpy };
          }
        })
      };
      player.$player = $player;
      player.details.title = 'Test Title';
      player.details.time.elapsed = 21;
      player.details.time.total = 100;
    });
    it('should set .title', function () {
      player._draw();
      expect(textSpy.calls.argsFor(0)[0]).toEqual('Test Title');
    });
    it('should set .time .elapsed', function () {
      player._draw();
      expect(textSpy.calls.argsFor(1)[0]).toEqual(21);
    });
    it('should set .time .total', function () {
      player._draw();
      expect(textSpy.calls.argsFor(2)[0]).toEqual(100);
    });
    it('should set .progress-bar .elapsed', function () {
      player._draw();
      expect(cssSpy.calls.argsFor(0)[0]).toEqual({width: '21%'});
    });
    describe('.indicator-icon i', function () {
      it('should set to pause when playing', function () {
        player.state.paused = false;
        player._draw();
        expect(attrSpy.calls.argsFor(0)[0]).toEqual('class');
        expect(attrSpy.calls.argsFor(0)[1]).toEqual('fa fa-pause');
      });
      it('should set to play when paused', function () {
        player.state.paused = true;
        player._draw();
        expect(attrSpy.calls.argsFor(0)[0]).toEqual('class');
        expect(attrSpy.calls.argsFor(0)[1]).toEqual('fa fa-play');
      });
    });
  });

});
