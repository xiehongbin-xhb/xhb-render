(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canvas = exports.gl = exports.init = void 0;
let gl = null;
exports.gl = gl;
let canvas = null;
exports.canvas = canvas;
function init(canvasId) {
    if (canvasId != null) {
        exports.canvas = canvas = document.getElementById(canvasId);
        if (canvas === undefined) {
            console.error("cannot find a canvas named:" + canvasId);
            return;
        }
    }
    else {
        exports.canvas = canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
    }
    canvas.width = Math.floor(canvas.clientWidth * window.devicePixelRatio);
    canvas.height = Math.floor(canvas.clientHeight * window.devicePixelRatio);
    let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context = null;
    for (let i = 0; i < names.length; ++i) {
        try {
            context = canvas.getContext(names[i]);
        }
        catch (e) { }
        if (context) {
            break;
        }
    }
    exports.gl = gl = context;
    gl.viewport(0, 0, canvas.width, canvas.height);
}
exports.init = init;
;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_1 = require("./core/gl");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return gl_1.init; } });
Object.defineProperty(exports, "gl", { enumerable: true, get: function () { return gl_1.gl; } });
Object.defineProperty(exports, "canvas", { enumerable: true, get: function () { return gl_1.canvas; } });

},{"./core/gl":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS9nbC50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLElBQUksRUFBRSxHQUEyQixJQUFJLENBQUM7QUErQnZCLGdCQUFFO0FBOUJqQixJQUFJLE1BQU0sR0FBc0IsSUFBSSxDQUFDO0FBOEJsQix3QkFBTTtBQTVCekIsU0FBUyxJQUFJLENBQUMsUUFBZ0I7SUFDMUIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1FBQ2xCLGlCQUFBLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBc0IsQ0FBQztRQUNoRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUN4RCxPQUFPO1NBQ1Y7S0FDSjtTQUFNO1FBQ0gsaUJBQUEsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFFRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUUxRSxJQUFJLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ25DLElBQUk7WUFDQSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQTJCLENBQUM7U0FDbkU7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO1FBQ2YsSUFBSSxPQUFPLEVBQUU7WUFDVCxNQUFNO1NBQ1Q7S0FDSjtJQUNELGFBQUEsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNiLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBQ1Esb0JBQUk7QUFEWixDQUFDOzs7OztBQzlCRixnQ0FBNkM7QUFBcEMsMEZBQUEsSUFBSSxPQUFBO0FBQUUsd0ZBQUEsRUFBRSxPQUFBO0FBQUUsNEZBQUEsTUFBTSxPQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID0gbnVsbDtcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdChjYW52YXNJZDogc3RyaW5nKSB7XG4gICAgaWYgKGNhbnZhc0lkICE9IG51bGwpIHtcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICBpZiAoY2FudmFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjYW5ub3QgZmluZCBhIGNhbnZhcyBuYW1lZDpcIiArIGNhbnZhc0lkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICB9XG5cbiAgICBjYW52YXMud2lkdGggPSBNYXRoLmZsb29yKGNhbnZhcy5jbGllbnRXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcihjYW52YXMuY2xpZW50SGVpZ2h0ICogd2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuXG4gICAgbGV0IG5hbWVzID0gW1wid2ViZ2xcIiwgXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgXCJ3ZWJraXQtM2RcIiwgXCJtb3otd2ViZ2xcIl07XG4gICAgbGV0IGNvbnRleHQgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChuYW1lc1tpXSkgYXMgV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnbCA9IGNvbnRleHQ7XG4gICAgZ2wudmlld3BvcnQoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn07XG5leHBvcnQgeyBpbml0LCBnbCwgY2FudmFzIH07IiwiZXhwb3J0IHsgaW5pdCwgZ2wsIGNhbnZhcyB9IGZyb20gXCIuL2NvcmUvZ2xcIjtcblxuIl19
