"use strict";
( function(){

    $( function () {

        new Preloader( $('.preloader') );

    } );

    var Preloader = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _html = $('html'),
            _preloader = obj,
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        _showSite();


                    }
                } );

            },
            _init = function () {

                _body[0].preloader = _self;
                _addEvents();

            },
            _showSite = function() {

                _preloader.addClass( 'preloader_loaded' );

                setTimeout(function(){

                    _html.css( {
                        'overflow-y': 'auto'
                    } );

                    _preloader.remove();
                    $('.site').addClass( 'site__loaded' );

                }, 500);
            };

        //public properties

        //public methods


        _init();
    };

} )();