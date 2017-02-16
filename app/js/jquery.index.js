"use strict";
( function(){


    $( function () {

        $.each( $( '.areas' ), function() {

            new AreasSlider ( $( this ) );

        } );

    } );

    var AreasSlider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find('.areas__items>div'),
            _bgBlock = _obj.find('.areas__bg'),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _items.parent().on( {
                    mouseleave: function() {

                        setTimeout( function() {
                            _bgBlock.removeClass('visible');
                            _bgBlock.find('>div').removeClass('visible');
                        }, 320 );

                        setTimeout( function() {
                            _bgBlock.find('>div').remove();
                        }, 700 );

                    }
                } );
                _items.on( {
                    mouseenter: function() {

                        var item = $(this),
                            curItem = item.find('.areas__item');


                        if( _window.width() >= 768 ) {

                            var bg = curItem.data('bg');

                        } else {

                            var bg = curItem.data('bg-mob');

                        }

                        _open( curItem, bg );

                    }
                } );
                _items.on( {
                    mouseleave: function() {

                        var item = $(this),
                            curItem = item.find('.areas__item');


                        _close( curItem );

                    }
                } );

            },
            _close = function ( elem ) {

                elem.removeClass('opened');
                _items.find('.areas__item-text').height(0);

            },
            _open = function ( elem, bg ) {

                var div = $('<div></div>');

                _items.removeClass('opened');
                _items.find('.areas__item-text').height(0);
                elem.addClass('opened');
                elem.find('.areas__item-text').height( elem.find('.areas__item-text>div').height() );

                div.css( {
                    'background-image': 'url("'+ bg +'")'
                } );
                _bgBlock.append(div);

                setTimeout( function() {
                    _bgBlock.find('>div').addClass('visible');
                    _bgBlock.addClass('visible');
                }, 300 );

            },
            _init = function () {
                _obj[0].areas = _self;
                _addEvents();

            };

        //public properties

        //public methods

        _init();
    };

} )();
