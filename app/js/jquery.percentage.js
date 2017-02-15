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
            _time = ( 130/_percent ) * 10,
            _value = parseInt( _obj.find('>span>span').text() ),
            _interval = setInterval( function() {} ),
            _window = $(window);
        var loader = document.querySelector('.improve__percent-indicator'),
            start = null,
            time = 5000,
            max_value = 100
            ;


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

                _interval = setInterval( function() {

                    _draw();

                }, _time );

            },
            step = function step(timestamp) {
                var progress;

                // Get the start time
                if (start === null) {
                    start = timestamp;
                }

                // Calculate the progress
                progress = timestamp - start;

                // If not progressed
                if (progress < time) {

                    if ( Math.round((progress / time * max_value).toPrecision(2)) <= _percent ) {

                        loader.dataset.value = Math.round((progress / time * max_value).toPrecision(2));
                        $(loader).find('>span>span').text( Math.round((progress / time * max_value).toPrecision(2)) );
                        $(loader).css( {
                            width: Math.round((progress / time * max_value).toPrecision(2)) + '%'
                        } );
                        requestAnimationFrame(step);

                    } else {

                        loader.dataset.value = _percent;
                        $(loader).find('>span>span').text( _percent );
                        $(loader).css( {
                            width: _percent + '%'
                        } );

                    }


                    // Finished
                } else {
                    loader.dataset.value = _percent;
                    $(loader).find('>span>span').text( _percent );
                    $(loader).css( {
                        width: _percent + '%'
                    } );
                    start = null;
                    requestAnimationFrame(step);
                }
            },
            _draw = function () {

                if( _canAnimate && _canDraw ) {

                    if ( _value >= _percent ) {

                        _value = _percent-1;
                        clearInterval( _interval );
                        _canAnimate = false;

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

                if( visiblePercent > .15 ){

                    _canDraw = true;
                    //_animate();
                    requestAnimationFrame(step);

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
