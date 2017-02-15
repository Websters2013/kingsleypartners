window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

"use strict";
( function(){


    $( function () {

        $.each( $( '.improve__percent-indicator' ), function() {

            new ProjectPercent ( $( this ) );

        } );

    } );

    var ProjectPercent = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _canAnimate = true,
            _canDraw = false,
            _percent = parseInt( _obj.data('percent') ),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _window.on( {
                    scroll: function () {

                        setTimeout( function() {

                            _checkScroll();

                        }, 1000 );

                    },

                    load: function(){

                        setTimeout( function() {

                            _checkScroll();

                        }, 1000 );

                    }
                } );
            },
            _animate = function () {

                requestAnimationFrame( _animate );
                _draw();
            },
            _draw = function () {

                if( _canAnimate && _canDraw ) {

                    var percent = _obj.find('>span>span').text();

                    if( percent < _percent ) {

                        percent++;

                        _obj.find('>span>span').text( percent );
                        _obj.css( {
                            width: percent + '%'
                        } );

                    } else {
                        _canAnimate = false;
                    }

                }

            },
            _checkScroll = function(){
                var curScroll = _window.scrollTop(),
                    windowH = _window.height(),
                    topPos = _obj.eq(0).offset().top,
                    topInWindow = topPos - curScroll,
                    visiblePercent = 1-(topInWindow/windowH);

                if( visiblePercent > .15 ){

                    _canDraw = true;
                    _animate();

                }
            },
            _init = function () {
                _obj[0].percentage = _self;
                _addEvents();

            };

        //public properties

        //public methods

        _init();
    };

} )();
