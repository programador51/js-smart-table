"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.DefaultTable = void 0;
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var Table_1 = require("./Table");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.faArrowLeft, free_solid_svg_icons_1.faAngleDoubleLeft, free_solid_svg_icons_1.faArrowRight, free_solid_svg_icons_1.faAngleDoubleRight, free_solid_svg_icons_1.faExclamationCircle, free_solid_svg_icons_1.faSearch);
fontawesome_svg_core_1.dom.watch();
var DefaultTable = /** @class */ (function (_super) {
    __extends(DefaultTable, _super);
    function DefaultTable(tableConfiguration) {
        var _this = _super.call(this, tableConfiguration) || this;
        _this.paginationHTML = '';
        _this.sortWay = '';
        _this.columnOrdering = '';
        _this.setColumnOrdering();
        return _this;
    }
    DefaultTable.prototype.setSort = function () {
        if (this.tableConfiguration.sort.sortASC === true) {
            this.sortWay = 'ASC';
        }
        else {
            this.sortWay = 'DESC';
        }
    };
    DefaultTable.prototype.setColumnOrdering = function () {
        var _this = this;
        this.tableConfiguration.headerConfig.map(function (element) {
            if (element.sortThis === true) {
                _this.columnOrdering = element.columnNameDB;
            }
        });
    };
    DefaultTable.prototype.validateInput = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var atrActualPage, atrPages, atrData, page, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setSort();
                        atrActualPage = this.tableConfiguration.attributesResponse.actualPage;
                        atrPages = this.tableConfiguration.attributesResponse.pages;
                        atrData = this.tableConfiguration.attributesResponse.data;
                        page = parseInt(input, 10);
                        if (isNaN(page)) {
                            return [2 /*return*/, false];
                        }
                        if (page > this.tableConfiguration.pages) {
                            return [2 /*return*/, false];
                        }
                        if (page === 0)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.tableConfiguration.paginationFn(page, this.sortWay, this.tableConfiguration.sort.sortingColumn)];
                    case 1:
                        data = _a.sent();
                        this.updateInformation(data[atrActualPage], data[atrPages], data[atrData]);
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTable.prototype.sortingWay = function () {
        if (this.tableConfiguration.sort.sortASC === true) {
            return 'ASC';
        }
        else {
            return 'DESC';
        }
    };
    DefaultTable.prototype.setURLQuerys = function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var sort, column, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.tableConfiguration.urlParams = values;
                        sort = this.sortingWay();
                        column = this.tableConfiguration.sort.sortingColumn;
                        this.getURLQuery();
                        return [4 /*yield*/, this.tableConfiguration.paginationFn(1, sort, column, this.tableConfiguration.stringQuery)];
                    case 1:
                        data = _a.sent();
                        this.tableConfiguration.rows = data[this.tableConfiguration.attributesResponse.data];
                        this.tableConfiguration.pages = data[this.tableConfiguration.attributesResponse.pages];
                        this.tableConfiguration.actualPage = 1;
                        this.printTable();
                        this.printPagination();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTable.prototype.updateInformation = function (actualPage, pages, data) {
        this.tableConfiguration.pages = pages;
        this.tableConfiguration.actualPage = actualPage;
        this.tableConfiguration.rows = data;
        this.printTable();
        this.printPagination();
    };
    DefaultTable.prototype.printPagination = function () {
        var _this = this;
        var atrActualPage = this.tableConfiguration.attributesResponse.actualPage;
        var atrPages = this.tableConfiguration.attributesResponse.pages;
        var atrData = this.tableConfiguration.attributesResponse.data;
        this.paginationHTML = "\n        <div class=\"w-50\">\n            <input id=\"searchPage-" + this.tableConfiguration.idTable + "\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"Ir a pagina\">\n            <div id=\"searchPageBtn-" + this.tableConfiguration.idTable + "\" class=\"default-pagination-search\"><i class=\"fas fa-search\"></i></div>\n        </div>\n        <div id=\"pagination-" + this.tableConfiguration.idTable + "-buttons\" class=\"w-50\">\n\n        <div class=\"default-firstPage\"><i class=\"fas fa-angle-double-left\"></i></div>\n        <div class=\"default-previousPage\"><i class=\"fas fa-arrow-left\"></i></div>\n            \n             <div>\n               <span class=\"default-actualPage\">" + this.tableConfiguration.actualPage + "</span>\n               <span> - </span>\n               <span class=\"default-totalPage\">" + this.tableConfiguration.pages + "</span>\n             </div>\n\n             <div class=\"default-nextPage\"><i class=\"fas fa-arrow-right\"></i></div>\n             <div class=\"default-lastPage\"><i class=\"fas fa-angle-double-right\"></i></div>\n     ";
        document.getElementById(this.tableConfiguration.idPagination).innerHTML = this.paginationHTML;
        document.getElementById("searchPageBtn-" + this.tableConfiguration.idTable).addEventListener('click', function () {
            var input = document.getElementById("searchPage-" + _this.tableConfiguration.idTable).value;
            _this.validateInput(input);
        });
        document.getElementById("searchPage-" + this.tableConfiguration.idTable).addEventListener('keyup', function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    this.validateInput(e.target.value);
                }
                return [2 /*return*/];
            });
        }); });
        document.getElementById("pagination-" + this.tableConfiguration.idTable + "-buttons").querySelectorAll('div').forEach(function (button, i) {
            if (i === 0) {
                button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.setSort();
                                return [4 /*yield*/, this.tableConfiguration.paginationFn(1, this.sortWay, this.tableConfiguration.sort.sortingColumn)];
                            case 1:
                                data = _a.sent();
                                this.updateInformation(data[atrActualPage], data[atrPages], data[atrData]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (i === 1) {
                button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                    var page, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                page = this.tableConfiguration.actualPage - 1;
                                this.setSort();
                                if (page === 0)
                                    return [2 /*return*/];
                                return [4 /*yield*/, this.tableConfiguration.paginationFn(page, this.sortWay, this.tableConfiguration.sort.sortingColumn)];
                            case 1:
                                data = _a.sent();
                                this.updateInformation(data[atrActualPage], data[atrPages], data[atrData]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (i === 3) {
                button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                    var page, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                page = this.tableConfiguration.actualPage + 1;
                                this.setSort();
                                if (page > this.tableConfiguration.pages)
                                    return [2 /*return*/];
                                return [4 /*yield*/, this.tableConfiguration.paginationFn(page, this.sortWay, this.tableConfiguration.sort.sortingColumn)];
                            case 1:
                                data = _a.sent();
                                this.updateInformation(data[atrActualPage], data[atrPages], data[atrData]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (i === 4) {
                button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                    var lastPage, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                lastPage = this.tableConfiguration.pages;
                                this.setSort();
                                return [4 /*yield*/, this.tableConfiguration.paginationFn(lastPage, this.sortWay, this.tableConfiguration.sort.sortingColumn)];
                            case 1:
                                data = _a.sent();
                                this.updateInformation(data[atrActualPage], data[atrPages], data[atrData]);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    };
    return DefaultTable;
}(Table_1["default"]));
exports.DefaultTable = DefaultTable;
