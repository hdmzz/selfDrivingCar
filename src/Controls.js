"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Controls_instances, _Controls_addKeyBoardListener;
Object.defineProperty(exports, "__esModule", { value: true });
var Controls = /** @class */ (function () {
    function Controls(controlType) {
        _Controls_instances.add(this);
        this.forward = false;
        this.reverse = false;
        this.right = false;
        this.left = false;
        switch (controlType) {
            case "KEYS":
                __classPrivateFieldGet(this, _Controls_instances, "m", _Controls_addKeyBoardListener).call(this);
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
        ;
    }
    ;
    ;
    return Controls;
}());
_Controls_instances = new WeakSet(), _Controls_addKeyBoardListener = function _Controls_addKeyBoardListener() {
    var _this = this;
    document.onkeydown = function (event) {
        switch (event.key) {
            case "ArrowUp":
                _this.forward = true;
                break;
            case "ArrowDown":
                _this.reverse = true;
                break;
            case "ArrowLeft":
                _this.left = true;
                break;
            case "ArrowRight":
                _this.right = true;
                break;
        }
        ;
    };
    document.onkeyup = function (event) {
        switch (event.key) {
            case "ArrowUp":
                _this.forward = false;
                break;
            case "ArrowDown":
                _this.reverse = false;
                break;
            case "ArrowLeft":
                _this.left = false;
                break;
            case "ArrowRight":
                _this.right = false;
                break;
        }
        ;
    };
};
;
exports.default = Controls;
