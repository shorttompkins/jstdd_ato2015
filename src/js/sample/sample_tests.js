/* globals sum */
'use strict';

describe('Sample', function() {
  beforeEach(function () {
    spyOn(window, 'alert');
  });
  it('should sum 2 numbers', function() {
    expect(sum(1,1)).toEqual(2);
    expect(sum(2,3)).toEqual(5);
  });
  it('should alert the return value', function() {
    sum(2, 2);
    expect(window.alert).toHaveBeenCalledWith(4);
  });
});
