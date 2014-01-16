/**
 * jquery.fcolumn.js - Fix table's first column
 * 
 * Copyright (c) 2014 Ryan Yonzon, hello@ryanyonzon.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function ($) {

    function createClassId() {
        return Math.random().toString(36).slice(2);
    }

    function addRequiredClass(obj, group, cell, fixed_class, offset_class) {
        // add class to the first column
        obj.find(group).find('tr').each(function() {
            $(this).find(cell + ':first').each(function() {
                $(this).addClass(fixed_class);
            });
        });
        // add offset cells
        obj.find(group).find('tr').each(function() {
            $(this).find(cell + ':first').each(function() {
                $(this).after('<' + cell + ' class="' + offset_class + '"></' + cell + '>');
            });
        });
    }

    function fixMaxHeight(obj, group, cell) {
        max = 0;
        obj.find(group).find('tr').each(function() {
            $(this).find(cell).each(function() {
                max = Math.max($(this).height(), max);
                // fix cell's height
                $(this).parents('tr:first').find(cell + ':first').height(max);
                // ...and also offset cells
                $(this).parents('tr:first').find(cell + ':nth-child(2)').height(max);
            });
        });        
    }    

    $.fn.fcolumn = function(options) {

        // settings
        var settings = $.extend({
            // defaults
            background: '#fff',
            width: "100px"
        }, options);

        // create class ID(s)
        var wrapper = createClassId();
        var fixed = createClassId();
        var offset = createClassId();

        // wrap the table!
        this.wrap('<div class="' + wrapper + '"></div>');

        // add required classes
        addRequiredClass(this, 'thead', 'th', fixed, offset);
        addRequiredClass(this, 'tbody', 'td', fixed, offset);

        // ...then fix cell's height
        fixMaxHeight(this, 'thead', 'th');
        fixMaxHeight(this, 'tbody', 'td');

        // finally set the style
        $("." + wrapper).css({"overflow": "auto"});
        $("." + fixed).css({"position": "absolute", "min-width": settings.width, "width": settings.width, "background-color": settings.background});
        $("." + offset).css({"min-width": settings.width, "width": settings.width});

        return this;

    };

}(jQuery));