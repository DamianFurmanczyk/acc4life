"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RedirectService = void 0;
var core_1 = require("@angular/core");
var RedirectService = /** @class */ (function () {
    function RedirectService() {
    }
    RedirectService.prototype.post = function (obj, url) {
        var mapForm = document.createElement("form");
        mapForm.method = "POST";
        mapForm.action = url;
        Object.keys(obj).forEach(function (param) {
            var mapInput = document.createElement("input");
            mapInput.type = "hidden";
            mapInput.name = param;
            mapInput.setAttribute("value", obj[param]);
            mapForm.appendChild(mapInput);
        });
        document.body.appendChild(mapForm);
        mapForm.submit();
    };
    RedirectService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], RedirectService);
    return RedirectService;
}());
exports.RedirectService = RedirectService;
