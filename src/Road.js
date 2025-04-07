"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var Roads = /** @class */ (function () {
    /**
     * @param x est le canvas width / 2, ou le milieu du canvas
     * @param width est le canvas widht * 0.9 ou 90% de la largeur du canvas
     * @param laneCount le lanecount est le nombre de voies sur la route
     */
    function Roads(x, width, laneCount) {
        if (laneCount === void 0) { laneCount = 4; }
        this.x = x;
        this.width = width;
        this.laneCount = laneCount; //nombre de voies
        this.left = x - width / 2;
        this.right = x + width / 2;
        var infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
        var topLeft = { x: this.left, y: this.top };
        var topRight = { x: this.right, y: this.top };
        var bottomLeft = { x: this.left, y: this.bottom };
        var bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }
    ;
    Roads.prototype.getLaneCenter = function (laneIndex) {
        var laneWidth = this.width / this.laneCount;
        return (this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth);
    };
    ;
    /**
     * @param ctx le context du canvas 2d
     * @function lerp donne une valeur entre 2 autres valeurs
     * ici elle est utilisée pour trouver
     */
    Roads.prototype.draw = function (ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        for (var i = 1; i <= this.laneCount - 1; i++) {
            var x = (0, Utils_1.lerp)(this.left, this.right, i / this.laneCount);
            ctx.setLineDash([20, 20]); //premiere valeur longeur du trait, deuxieme valeur
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.borders.forEach(function (border) {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    };
    ;
    return Roads;
}());
;
exports.default = Roads;
