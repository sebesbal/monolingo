/* Flot plugin for highlighting the main axis at the origio. The axis are draw on the appropriate sides if they are not in the visible region. */
(function ($) {
    var options = {
        customaxis: {
            color: "rgba(0, 0, 0, 1.0)",
            lineWidth: 1
        }
    };
    
    function init(plot) {
        plot.hooks.drawBackground.push(function (plot, ctx) {
            var options = plot.getOptions().customaxis;
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

            //ctx.fillStyle="rgba(0,255,0,.2)";
            //ctx.fillRect(0,0,w,h);

            ctx.lineWidth=options.lineWidth;
            ctx.strokeStyle=options.color;
            ctx.beginPath();
            ctx.moveTo(0,origo.top);
            ctx.lineTo(w,origo.top);
            ctx.moveTo(origo.left,0);
            ctx.lineTo(origo.left,h);
            ctx.stroke();

            ctx.restore();
        });
    }
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'customaxis',
        version: '1.0'
    });
})(jQuery);
