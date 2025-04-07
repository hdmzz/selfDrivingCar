"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Sensor_instances, _Sensor_getReadings, _Sensor_castRays;
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var Sensor = /** @class */ (function () {
    function Sensor(car) {
        _Sensor_instances.add(this);
        this.car = car;
        this.rayCount = 10;
        this.rayLenght = 150;
        this.raySpread = Math.PI / 2; //90deg en radian
        this.rays = [];
        this.readings = [];
    }
    ;
    Sensor.prototype.update = function (roadBorders, traffic) {
        __classPrivateFieldGet(this, _Sensor_instances, "m", _Sensor_castRays).call(this);
        this.readings = [];
        for (var i = 0; i < this.rayCount; i++) {
            this.readings.push(__classPrivateFieldGet(this, _Sensor_instances, "m", _Sensor_getReadings).call(this, this.rays[i], roadBorders, traffic));
        }
        ;
    };
    ;
    ;
    ;
    Sensor.prototype.draw = function (ctx) {
        //ray structure [start, end]
        for (var i = 0; i < this.rayCount; i++) {
            var end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
        ;
    };
    return Sensor;
}());
_Sensor_instances = new WeakSet(), _Sensor_getReadings = function _Sensor_getReadings(ray, roadBorders, traffic) {
    var touches = [];
    for (var i = 0; i < roadBorders.length; i++) {
        var touch = (0, Utils_1.getIntersection)(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]);
        if (touch) {
            touches.push(touch);
        }
        ;
    }
    ;
    for (var i = 0; i < traffic.length; i++) {
        for (var j = 0; j < traffic[i].polygon.length; j++) {
            var touch = (0, Utils_1.getIntersection)(ray[0], ray[1], traffic[i].polygon[j], traffic[i].polygon[(j + 1) % traffic[i].polygon.length]);
            if (touch) {
                touches.push(touch);
            }
            ;
        }
        ;
    }
    ;
    if (touches.length == 0) {
        return null;
    }
    else {
        var offset = touches.map(function (e) { return e.offset; });
        var minOffset_1 = Math.min.apply(Math, offset);
        return touches.find(function (e) { return e.offset == minOffset_1; });
    }
    ;
}, _Sensor_castRays = function _Sensor_castRays() {
    this.rays = [];
    for (var i = 0; i < this.rayCount; i++) {
        //pour chaque rayon, il faut definir l'angle de départ et l'angle d'arrivée si le nombre de rayon est egal à 1 alors il faut que l'angle de départ 
        var rayAngle = (0, Utils_1.lerp)(this.raySpread / 2, -this.raySpread / 2, this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)) + this.car.angle;
        var start = { x: this.car.x, y: this.car.y };
        var end = {
            x: this.car.x - (Math.sin(rayAngle) * this.rayLenght), //Il faut penser à la trigonométrie avec le cercle et les valeur des angles en radian pi/2, pi/4, pi/3...
            y: this.car.y - (Math.cos(rayAngle) * this.rayLenght) //et les,valeurs de sin et cos en fonction de l'angle pour trouver les coordonnées des points
            //le point de fin du rayon est donc le point de départ MOINS la valeur de sin ou cos en fonction de l'angle, MOINS car le rayon est tracé vers le haut de l'écran
            //PLUS orienterai le rayon vers le bas de l'écran
        };
        this.rays.push([start, end]);
    }
    ;
};
;
exports.default = Sensor;
