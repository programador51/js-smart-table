"use strict";
// Just for testing purposes
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAssignatures = void 0;
/**
 * How must looks like the functions that fetchs data from the API
 *
 * @async
 * @function paginationFn
 * @param {number} page - The page requested of the information
 * @param {string} order - ASC or DESC the data
 * @param {string} columnOrdering - Which column it's gonna be counted for the sorting (must match with the column table of the table on DB)
 * @param {string|undefined} additionalQuery - In case you want set more url params, you need to pass the array
 * @returns {object}
 */
function getAssignatures(page, order, columnOrdering, additionalQuery) {
    if (page === void 0) { page = 1; }
    if (order === void 0) { order = "ASC"; }
    return __awaiter(this, void 0, void 0, function () {
        var query, assignatures;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(additionalQuery === undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("http://localhost:4000/api/paso1/materias?pagina=" + page + "&orden=" + order + "&columna=" + columnOrdering)];
                case 1:
                    query = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch("http://localhost:4000/api/paso1/materias?pagina=" + page + "&orden=" + order + "&columna=" + columnOrdering + additionalQuery)];
                case 3:
                    query = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, query.json()];
                case 5:
                    assignatures = _a.sent();
                    return [2 /*return*/, assignatures.data];
            }
        });
    });
}
exports.getAssignatures = getAssignatures;
/**
 * How must look the function for the property cbSelection
 * @function cbSelection
 * @param {Event} e - Event for the clicked row.
 */
// function printAssignature(e:Event){
//     console.log(Users.infoRow);
//     document.getElementById('plan')!.innerText = Users.infoRow.plan;
//     document.getElementById('materia')!.innerText = Users.infoRow.nombreMateria;
//     document.getElementById('salon')!.innerText = Users.infoRow.salon;
// }
