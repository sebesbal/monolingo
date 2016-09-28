/* Flot plugin for drawing intersection points with labels. */
(function ($) {
    var options = {
        custompoints: {
            color: "black",
            fillColor: "white",
            type: 'circle',
            radius: 4,
            lineWidth: 2
        }
    };
    var parent;
    
    function init(plot) {

        $("<style>.customPointsTooltip { \
            position: absolute; \
            display: none; \
            border: 1px solid #ddd; \
            padding: 4px; \
            color: #000; \
            background-color: #fff; \
            opacity: 0.8; \
            display: block; \
            font-family: Verdana,Tahoma,Arial; \
            text-align: left;\
           }</style>").appendTo('body');

        plot.hooks.draw.push(function (plot, ctx) {
            var options = plot.getOptions().custompoints;

            parent = $(ctx.canvas).parent();

            if (exists(options.points) && options.points.length>0) {
                var origo = plot.p2c({x:0, y:0});
                var w = plot.width();
                var h = plot.height();

                origo.left = Math.max(0,origo.left);
                origo.top = Math.max(0,origo.top);
                origo.left = Math.min(w,origo.left);
                origo.top = Math.min(h,origo.top);

                ctx.save();
                var plotOffset = plot.getPlotOffset();
                ctx.translate(plotOffset.left, plotOffset.top);

                ctx.lineWidth = options.lineWidth;
                if (exists(options.fillColor)) {
                    ctx.fillStyle = options.fillColor;
                }
                if (exists(options.color)) {
                    ctx.strokeStyle = options.color;
                }
                var tooltips = [];
                for (var i=0; i<options.points.length; i++ )
                {
                    var p = options.points[i];
                    var pos = plot.p2c(p);

                    ctx.beginPath();
                    if (options.type=='circle') 
                    {
                        ctx.beginPath();
                        ctx.fillStyle = "white";
                        ctx.arc(pos.left, pos.top, options.radius*1.8, 0, Math.PI * 2, false);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(pos.left, pos.top, options.radius, 0, Math.PI * 2, false);
                    }
                    if (exists(options.fillColor)) {
                        ctx.fill();
                    }
                    if (exists(options.color)) {
                        ctx.stroke();
                    }     

                    tooltips.push({
                        x:pos.left+plotOffset.left,
                        y:pos.top+plotOffset.top,
                        //title:"x="+p.x+", y="+p.y
                        title:"("+p.x+", "+p.y+")"
                        //title:"x="+p.x+"<br>y="+p.y
                    });
                }

                ctx.restore();

                setupToolTips( tooltips, plot );
            }
        });
    }
    
    function setupToolTips( tooltips, plot ) {
        parent.find(".customPointsTooltip").remove();

        tooltips.sort(function(a, b) {
            return a.x-b.x;
        });

        var diff = 5;
        for (var i=0; i<tooltips.length; i++ )
        {
            var tooltip = tooltips[i];
            $("<div id='tooltip"+i+"' class='customPointsTooltip'/>").appendTo(parent);

            var tip = $("#tooltip"+i);
            tip.html(tooltip.title);
            if (tooltip.y+diff+tip.outerHeight()>plot.height()) {
                // above point
                tip.css({left: tooltip.x+diff, top: tooltip.y-diff-tip.outerHeight()});
            } else {
                // below point
                tip.css({left: tooltip.x+diff, top: tooltip.y+diff});
            }

        }
        if (tooltips.length==2) 
        {
            var tooltip = tooltips[0];
            var tip0 = $("#tooltip0");
            var tip1 = $("#tooltip1");
            var r0 = convertRect( tip0[0].getBoundingClientRect() );
            var r1 = convertRect( tip1[0].getBoundingClientRect() );
            //console.log(r0);
            //console.log(r1);
            //console.log(intersect(r0,r1));
            if (intersect(r0,r1)) {
                //console.log("INTERSECT!");
                var tip = $("#tooltip0");
                tip.css({left: tooltip.x-tip.outerWidth()-diff});
            }
        }
    }

    function convertRect(r) {   
        return {x:r.left, y:r.top, w:r.width, h:r.height};
    }

    function intersect(r1, r2) {   
        var r = {};
        var x = Math.max(r1.x, r2.x);
        var num1 = Math.min(r1.x + r1.w, r2.x + r2.w);
        var y = Math.max(r1.y, r2.y);
        var num2 = Math.min(r1.y + r1.h, r2.y + r2.h);
        if (num1 >= x && num2 >= y)
            //r = {x:x, y:y, w:num1 - x, h:num2 - y};
            return true;
        else
            //r = {x:0, y:0, w:0, h:0};
            return false;
        //return r;
    }    

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'custompoints',
        version: '1.0'
    });
})(jQuery);
