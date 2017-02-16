var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;


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
            _value = parseInt( _obj.find('>span>span').text() ),
            _interval = setInterval( function() {} ),
            _window = $(window),
            _start = null,
            _time = 5000,
            max_value = 100;


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

                if( _canAnimate ) {
                    requestAnimationFrame(step);
                }


            },
            step = function step(timestamp) {
                var progress;

                if ( _start === null ) {

                    _start = timestamp;

                }
                progress = timestamp - _start;

                if (progress < _time) {

                    if ( Math.round((progress / _time * max_value).toPrecision(2)) <= _percent ) {

                        _obj.find('>span>span').text( Math.round((progress / _time * max_value).toPrecision(2)) );
                        _obj.css( {
                            width: Math.round((progress / _time * max_value).toPrecision(2)) + '%'
                        } );
                        requestAnimationFrame(step);

                    } else {

                        _obj.find('>span>span').text( _percent );
                        _obj.css( {
                            width: _percent + '%'
                        } );
                        _canAnimate = false;
                        _canDraw = false;

                    }

                } else {

                    _obj.find('>span>span').text( _percent );
                    _obj.css( {
                        width: _percent + '%'
                    } );
                    _start = null;
                    requestAnimationFrame(step);
                    _canAnimate = false;
                    _canDraw = false;
                }
            },
            _draw = function () {

                if( _canAnimate && _canDraw ) {

                    if ( _value >= _percent ) {

                        _value = _percent-1;
                        clearInterval( _interval );
                        _canAnimate = false;
                        _canDraw = false;

                    } else {

                        _value += 1;
                        _obj.find('>span>span').text( _value );
                        _obj.css( {
                            width: _value + '%'
                        } );

                    }

                }

            },
            _checkScroll = function(){
                var curScroll = _window.scrollTop(),
                    windowH = _window.height(),
                    topPos = _obj.eq(0).offset().top,
                    topInWindow = topPos - curScroll,
                    visiblePercent = 1-(topInWindow/windowH);

                if( visiblePercent > 0 ){

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
