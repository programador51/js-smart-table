"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/**
 * Table
 */
var Table = /** @class */ (function () {
    function Table(tableConfiguration) {
        this.tableContent = '';
        this.htmlIdselectedRow = '';
        this.tableConfiguration = tableConfiguration;
    }
    Table.prototype.view = function () {
        console.log(this.tableConfiguration);
    };
    Table.prototype.setStyle = function () {
        var style = this.tableConfiguration.styleTable;
        if (style !== undefined) {
            document.getElementById(this.tableConfiguration.idTable).classList.add(style);
        }
    };
    Table.prototype.selectionFunctionality = function () {
        var _this = this;
        document.querySelectorAll("#" + this.tableConfiguration.idTable + " tbody tr").forEach(function (row) {
            row.addEventListener('click', function (e) {
                _this.quitHover();
                var element = e.target.parentNode;
                _this.htmlIdselectedRow = element.id;
                _this.setHover();
                if (_this.tableConfiguration.cbSelection === undefined) {
                    return;
                }
                var idInfo = _this.htmlIdselectedRow.substr(_this.tableConfiguration.idTable.length + 1, _this.htmlIdselectedRow.length);
                _this.infoRow = _this.updateInfoRow(idInfo);
                _this.tableConfiguration.cbSelection(e);
            });
        });
    };
    Table.prototype.updateInfoRow = function (id) {
        var _this = this;
        var info = this.tableConfiguration.rows.find(function (data) { return data[_this.tableConfiguration.idRows].toString() === id; });
        return info;
    };
    Table.prototype.quitHover = function () {
        var element = document.getElementById(this.htmlIdselectedRow);
        element.classList.remove('selectedRow');
    };
    Table.prototype.setHover = function () {
        var element = document.getElementById(this.htmlIdselectedRow);
        element.classList.add('selectedRow');
    };
    Table.prototype.getURLQuery = function () {
        var _this = this;
        if (this.tableConfiguration.urlParams !== undefined) {
            var stringURLParams_1 = '';
            var params = Object.keys(this.tableConfiguration.urlParams);
            params.map(function (param) {
                var query = "&" + param;
                var queryValue = _this.tableConfiguration.urlParams[param];
                stringURLParams_1 += query + "=" + queryValue;
            });
            this.tableConfiguration = __assign(__assign({}, this.tableConfiguration), { stringQuery: stringURLParams_1 });
        }
    };
    Table.prototype.printTable = function () {
        this.setStyle();
        this.generateHeader();
        this.generateBody();
        this.getURLQuery();
        this.view();
    };
    Table.prototype.generateBody = function () {
        var _this = this;
        this.tableContent += "<tbody>";
        this.tableContent += "<tr \n        class=\"selectedRow\" \n        id=\"" + this.tableConfiguration.idTable + "-programador51\"></tr>";
        this.tableConfiguration.rows.map(function (data) {
            var idRow = _this.tableConfiguration.idTable;
            if (_this.tableConfiguration.idRows !== undefined) {
                idRow += "-" + data[_this.tableConfiguration.idRows];
            }
            var tr = "<tr id=\"" + idRow + "\">";
            _this.tableConfiguration.headerConfig.map(function (info, i) {
                var aditionalCSS = '';
                if (info.css !== undefined) {
                    aditionalCSS = info.css;
                }
                tr += "<td class=\"" + aditionalCSS + "\">" + data[info.attributeToPrint] + "</td>";
            });
            tr += "</tr>";
            _this.tableContent += tr;
        });
        this.printOnDOM(this.tableConfiguration.idTable);
        this.htmlIdselectedRow = this.tableConfiguration.idTable + "-programador51";
        this.selectionFunctionality();
        this.sortFunctionality();
    };
    Table.prototype.sortFunctionality = function () {
        var _this = this;
        var th = document.querySelectorAll("#" + this.tableConfiguration.idTable + " th");
        if (this.tableConfiguration.sort.sqlSort === true) {
            th.forEach(function (header) {
                header.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var target, sizeId, attributeToPrint, columnDB, column, actualPage, sortWay, response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                target = e.target.id;
                                this.tableConfiguration.headerConfig.map(function (element) {
                                    element.sortThis = false;
                                });
                                sizeId = target.length;
                                attributeToPrint = target.substr(7, sizeId);
                                columnDB = this.tableConfiguration.headerConfig.find(function (column) { return column.attributeToPrint === attributeToPrint; });
                                column = (columnDB === null || columnDB === void 0 ? void 0 : columnDB.columnNameDB);
                                this.tableConfiguration.sort.sortingColumn = column;
                                columnDB.sortThis = true;
                                this.tableConfiguration.headerConfig;
                                actualPage = this.tableConfiguration.actualPage;
                                if (this.tableConfiguration.sort.sortASC === true) {
                                    this.tableConfiguration.sort.sortASC = !this.tableConfiguration.sort.sortASC;
                                    sortWay = 'DESC';
                                }
                                else {
                                    this.tableConfiguration.sort.sortASC = !this.tableConfiguration.sort.sortASC;
                                    sortWay = 'ASC';
                                }
                                return [4 /*yield*/, this.tableConfiguration.paginationFn(actualPage, sortWay, column)];
                            case 1:
                                response = _a.sent();
                                this.tableConfiguration.pages = response[this.tableConfiguration.attributesResponse.pages];
                                this.tableConfiguration.rows = response[this.tableConfiguration.attributesResponse.data];
                                this.printTable();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        else {
            th.forEach(function (header) {
                header.addEventListener('click', function () {
                    alert('Ordenando en el lado del cliente - [Funcionalidad pendiente]');
                });
            });
        }
    };
    Table.prototype.generateHeader = function () {
        var _this = this;
        var header = "<thead><tr>";
        this.tableConfiguration.headerConfig.map(function (element) {
            var cssSort = '';
            if (element.sortThis === true) {
                _this.tableConfiguration.sort.sortingColumn = element.columnNameDB;
                if (_this.tableConfiguration.sort.sortASC === true) {
                    cssSort = 'sort-ASC';
                }
                else {
                    cssSort = 'sort-DESC';
                }
            }
            if (element.css === undefined) {
                element.css = '';
            }
            var th = "<th id=\"header-" + element.columnNameDB + "\" \n        class=\"" + element.css + " " + (element.sortThis === true ? "" + cssSort : '') + "\" \n        scope=\"col\">" + element.text + "</th>";
            header += th;
        });
        header += "</tr></thead>";
        this.tableContent += header;
    };
    Table.prototype.printOnDOM = function (id) {
        var table = document.getElementById(id);
        table.innerHTML = this.tableContent;
        this.tableContent = '';
    };
    return Table;
}());
exports["default"] = Table;
