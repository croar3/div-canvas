var DivCanvas = class {
    constructor (elmnt, row, col, l) {
        this.eid = elmnt;
        this.cursor = [0, 0];
        for (var i=0;i<row;i++) {
            $('#'+elmnt).append('<div class="row" data-y="'+(i+1)+'"></div>');
        }
        $('div.row').each(function(j) {
            for (var i=0;i<col;i++) {
                $(this).append('<div class="pixel" data-y="'+(j+1)+'" data-x="'+(i+1)+'" data-l="'+l+'"></div>');
            }
        });
    }
    getPixelElmnt(x, y) {
        return $('.pixel[data-x='+x+'][data-y='+y+']');
    }
    getPixelL(x, y) {
        return this.getPixelElmnt(x, y).data('l');
    }
    drawPixel(x, y, l) {
        this.getPixelElmnt(x, y).css('background', 'rgb('+l+','+l+','+l+')');
        this.getPixelElmnt(x, y).data('l', l);
    }
    drawPoint(x, y) {
        var xd = x % 1;
        var xn = Math.floor(x);
        var yd = y % 1;
        var yn = Math.floor(y);

        var levx1 = (1-xd)*(1-yd);
        var levx2 = xd*(1-yd);
        var levy1 = (1-xd)*yd;
        var levy2 = xd*yd;;

        var lx1 = Math.round(levx1 * 0 + (1-levx1) * this.getPixelL(xn, yn));
        var lx2 = Math.round(levx2 * 0 + (1-levx2) * this.getPixelL(xn+1, yn));
        var ly1 = Math.round(levy1 * 0 + (1-levy1) * this.getPixelL(xn, yn+1));
        var ly2 = Math.round(levy2 * 0 + (1-levy2) * this.getPixelL(xn+1, yn+1));

        this.drawPixel(xn, yn, lx1);
        this.drawPixel(xn+1, yn, lx2);
        this.drawPixel(xn, yn+1, ly1);
        this.drawPixel(xn+1, yn+1, ly2);
        return ''+levx1+','+levx2+','+levy1+','+levy2;
    }
    line(x1, y1, x2, y2) {
        this.drawPoint(x1,y1);
        var dx = x2-x1;
        var dy = y2-y1;
        if (Math.abs(dx)>Math.abs(dy)) {
            var steps = Math.abs(dx);
        }
        else {
            var steps = Math.abs(dy);
        }
        var xi = dx / steps;
        var yi = dy / steps;
        var cx = x1;
        var cy = y1;
        for (var i = 0; i < steps; i++) {
            cx += xi;
            cy += yi;
            this.drawPoint(cx,cy);
        }
    }
    move(x, y) {
        this.cursor = [x, y];
    }
    lineTo(x, y) {
        this.line(this.cursor[0], this.cursor[1], x, y);
        this.cursor = [x, y];
    }
}