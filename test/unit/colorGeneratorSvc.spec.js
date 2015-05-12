'use strict';

describe('ColorService', function() {

    var _colorService;
    beforeEach(module('worldCup'));

    beforeEach(function(){
          var matchers = {
            toBeOfType: function(typeString) {
              return typeof this.actual == typeString;
            },
            toBeHEXColor: function(){
                return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.actual);
            }
          };

          this.addMatchers(matchers);
    });

    beforeEach(inject(function($injector) {
        _colorService = $injector.get('colorGenerator');
    }));

    afterEach(function() {
        _colorService = undefined;
    });


    it('should has getColor property', function() {
        expect(_colorService.getColor).toBeDefined();
        expect(_colorService.getColor).toBeOfType('function');
    });

    it('getColor should return color in HEX format', function() {
        expect(_colorService.getColor()).toBeHEXColor();
    });
});
