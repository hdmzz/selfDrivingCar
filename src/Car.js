"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Car_instances, _Car_assessDamage, _Car_move;
Object.defineProperty(exports, "__esModule", { value: true });
var Controls_1 = require("./Controls");
var Sensor_1 = require("./Sensor");
var Utils_1 = require("./Utils");
var Car = /** @class */ (function () {
    function Car(x, y, width, height, controlType, maxspeed) {
        if (maxspeed === void 0) { maxspeed = 3; }
        _Car_instances.add(this);
        this.sensor = null;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxspeed;
        this.friction = 0.05;
        this.angle = 0;
        ;
        this.polygon = [];
        this.damaged = false;
        this.controls = new Controls_1.default(controlType);
        if (controlType != "DUMMY") {
            this.sensor = new Sensor_1.default(this);
        }
        this.createPolygon();
    }
    ;
    Car.prototype.createPolygon = function () {
        var points = [];
        var rad = Math.hypot(this.width, this.height) / 2;
        var alpha = Math.atan2(this.width, this.height);
        //right up corner
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        //left up corner
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        //right down corner
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        //left down corner
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });
        return points;
    };
    Car.prototype.update = function (roadBorders, traffic) {
        if (!this.damaged) {
            __classPrivateFieldGet(this, _Car_instances, "m", _Car_move).call(this);
            this.polygon = this.createPolygon();
            this.damaged = __classPrivateFieldGet(this, _Car_instances, "m", _Car_assessDamage).call(this, roadBorders, traffic);
        }
        ;
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
        }
        ;
    };
    ;
    ;
    Car.prototype.draw = function (ctx, color) {
        if (color === void 0) { color = "blue"; }
        ctx.fillStyle = this.damaged ? "gray" : color;
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (var i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();
        if (this.sensor) {
            this.sensor.draw(ctx);
        }
        ;
    };
    ;
    return Car;
}());
_Car_instances = new WeakSet(), _Car_assessDamage = function _Car_assessDamage(roadBorders, traffic) {
    for (var i = 0; i < roadBorders.length; i++) {
        if ((0, Utils_1.polysIntersect)(this.polygon, roadBorders[i])) {
            return true;
        }
        ;
    }
    ;
    for (var i = 0; i < traffic.length; i++) {
        if ((0, Utils_1.polysIntersect)(this.polygon, traffic[i].polygon)) {
            return true;
        }
        ;
    }
    ;
    return false;
}, _Car_move = function _Car_move() {
    if (this.controls.forward) {
        this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
        this.speed -= this.acceleration;
    }
    if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
        this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
        this.speed -= this.friction;
    }
    if (this.speed < 0) {
        this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
    }
    if (this.speed != 0) {
        var flip = this.speed > 0 ? 1 : -1;
        if (this.controls.left) {
            this.angle += 0.03 * flip;
        }
        if (this.controls.right) {
            this.angle -= 0.03 * flip;
        }
    }
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
};
;
exports.default = Car;
