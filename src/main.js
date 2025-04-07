"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = require("./Car");
var Road_1 = require("./Road");
var canvas = document.getElementById("myCanvas");
canvas.width = 200;
var ctx = canvas.getContext("2d");
if (ctx === null) {
    alert("No context here!");
}
else {
    var road_1 = new Road_1.default(canvas.width / 2, canvas.width * 0.9);
    var traffic_1 = [
        new Car_1.default(road_1.getLaneCenter(1), 100, 30, 50, "DUMMY", 2),
    ];
    var car_1 = new Car_1.default(road_1.getLaneCenter(2), 100, 30, 50, "KEYS");
    animate();
    function animate() {
        for (var i = 0; i < traffic_1.length; i++) {
            traffic_1[i].update(road_1.borders, []);
        }
        car_1.update(road_1.borders, traffic_1);
        canvas.height = window.innerHeight;
        ctx === null || ctx === void 0 ? void 0 : ctx.save();
        ctx === null || ctx === void 0 ? void 0 : ctx.translate(0, -car_1.y + canvas.height * 0.7);
        road_1.draw(ctx);
        for (var i = 0; i < traffic_1.length; i++) {
            traffic_1[i].draw(ctx, "red");
        }
        car_1.draw(ctx); //si la voiture est draw en dernier, les rayons seront sur les autres voitures mais si dessinee avant alors les rayons passent en dessous
        ctx === null || ctx === void 0 ? void 0 : ctx.restore();
        requestAnimationFrame(animate);
    }
    ;
}
;
