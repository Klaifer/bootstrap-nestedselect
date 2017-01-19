/*! version : 0.1
 =========================================================
 bootstrap-nestedselect
https://github.com/Klaifer/bootstrap-nestedselect
 Copyright (c) 2017 Klaifer Garcia
 =========================================================
 */

/*
 The MIT License (MIT)
 
 Copyright (c) 2015 Jonathan Peterson
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

(function ($) {
    $.fn.nestedselect = function (jsondata) {
        return this.each(function () {
            if (typeof jsondata !== 'object') {
                console.log("Incompatible data type");
                return this;
            }

            addpanel(this, jsondata);
            updateOccurrenceSelector(this)
            return this;
        });
    };

    $.fn.getbreadcrumbs = function() {
        var breadcrumbs = [];
        $(this).children(".panel-body").find(".active").each(function (index) {
            breadcrumbs.push($(this).text());
        });
        return (breadcrumbs);
    };
    
    $.fn.lastselected = function() {
        var breadcrumbs = $(this).getbreadcrumbs();
        return (breadcrumbs[breadcrumbs.length -1]);
    };

    function addpanel(element, jsondata) {
        if (!$(element).parents('.panel').length)
            $(element).addClass("panel panel-default");

        if ($(element).hasClass("panel panel-default")) {
            $(element).data("jsondata", jsondata);
            if (!$(element).children(".panel-body").length)
                $(element).append('<div class="panel-body"></div>');
        }
    };

    function updateOccurrenceSelector(element, breadcrumbs) {
        var holder = $(element).children(".panel-body");

        if (!holder.length)
            return;

        holder.html(getSelectorOptions($(element).data("jsondata"), breadcrumbs));
        addPostValue(element, breadcrumbs);

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var breadcrumbs = $(element).getbreadcrumbs();
            updateOccurrenceSelector(element, breadcrumbs);
        });
    };

    function addPostValue(element, breadcrumbs){
        if (!$(element).children('input').length)
            return;

        var valueholder = $(element).children('input');        
        
        if (breadcrumbs === undefined)
            breadcrumbs = "";
        
        valueholder.val(breadcrumbs);
    }

    function getSelectorOptions(subselect, breadcrumbs) {        
        var block = '<div class="col-sm-2"><ul class="nav nav-pills nav-stacked nested-block"><content/></ul></div>';
        var categ = '<li role="presentation"><a data-toggle="tab"><content/></a></li>';
        var actcateg = '<li class="active" role="presentation"><a data-toggle="tab" class="right-arrow"><content/></a></li>';
        var singlevalue = '<li role="presentation" class="nested-last"><content/></li>';

        var content = "";
        var levels = 0;
        if (breadcrumbs)
            for (var i = 0; i < breadcrumbs.length; i++) {
                actual = breadcrumbs[i];

                if (subselect[actual] === undefined)
                    continue;

                subcontent = "";
                levels++;

                for (var cat in subselect)
                    if (cat === actual)
                        subcontent += actcateg.replace("<content/>", cat);
                    else
                        subcontent += categ.replace("<content/>", cat);

                content += block.replace("<content/>", subcontent);
                subselect = subselect[actual];
            }

        //last category
        subcontent = "";
        if (typeof subselect === "string") {
            remaning_space = 12 - levels * 2;
            if (remaning_space < 2)
                remaning_space = 2;
            block = block.replace("col-sm-2", "col-sm-" + remaning_space);

            subcontent += singlevalue.replace("<content/>", subselect);
        } else
            for (var cat in subselect)
                subcontent += categ.replace("<content/>", cat);
        content += block.replace("<content/>", subcontent);
        
        return(content);
    };

}(jQuery));


