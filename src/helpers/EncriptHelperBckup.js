"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrip = void 0;
const edge_js_1 = __importDefault(require("edge-js"));
// const myFunction = edge.func('async (input) => { return (int)input + 7; }');
// myFunction(5, function (error, result) {
//     console.log(`el resultado es ${result}`);
// });
// const result = myFunction(8, true);
exports.encrip = edge_js_1.default.func({
    source: function () {
        /*
        async (dynamic input) =>
        {
            var soma = new SiacWebDll.ClassGeneral().encrip(input.sTexto, input.sProceso);
            return soma;
        }
    */
    },
    references: ["SiacWebDll.dll"]
});
//# sourceMappingURL=EncriptHelper.js.map