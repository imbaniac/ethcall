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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryEach = exports.tryAll = exports.all = void 0;
var bytes_1 = require("@ethersproject/bytes");
var contracts_1 = require("@ethersproject/contracts");
var abi_1 = __importDefault(require("./abi"));
var deploylessMulticall_json_1 = __importDefault(require("./abi/deploylessMulticall.json"));
var deploylessMulticall2_json_1 = __importDefault(require("./abi/deploylessMulticall2.json"));
var deploylessMulticall3_json_1 = __importDefault(require("./abi/deploylessMulticall3.json"));
var multicall_json_1 = __importDefault(require("./abi/multicall.json"));
var multicall2_json_1 = __importDefault(require("./abi/multicall2.json"));
var multicall3_json_1 = __importDefault(require("./abi/multicall3.json"));
var multicall_1 = require("./multicall");
var FILECOIN_ID = 314;
var VALID_FILECOIN_ADDRESS = '0x1d21dd40f184963cc919ef8400ac4ea2c5ba18d0';
function all(provider, multicall, calls, block) {
    return __awaiter(this, void 0, void 0, function () {
        var contract, callRequests, currentNetwork, overrides, response, _a, callCount, callResult, i, name_1, outputs, returnData, params, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contract = multicall
                        ? new contracts_1.Contract(multicall.address, multicall_json_1.default, provider)
                        : null;
                    callRequests = calls.map(function (call) {
                        var callData = abi_1.default.encode(call.name, call.inputs, call.params);
                        return {
                            target: call.contract.address,
                            callData: callData,
                        };
                    });
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    currentNetwork = _b.sent();
                    overrides = __assign({ blockTag: block }, (currentNetwork.chainId === FILECOIN_ID && {
                        from: VALID_FILECOIN_ADDRESS,
                    }));
                    if (!contract) return [3 /*break*/, 3];
                    return [4 /*yield*/, contract.aggregate(callRequests, overrides)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, callDeployless(provider, callRequests, block)];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    response = _a;
                    callCount = calls.length;
                    callResult = [];
                    for (i = 0; i < callCount; i++) {
                        name_1 = calls[i].name;
                        outputs = calls[i].outputs;
                        returnData = response.returnData[i];
                        params = abi_1.default.decode(name_1, outputs, returnData);
                        result = outputs.length === 1 ? params[0] : params;
                        callResult.push(result);
                    }
                    return [2 /*return*/, callResult];
            }
        });
    });
}
exports.all = all;
function tryAll(provider, multicall2, calls, block) {
    return __awaiter(this, void 0, void 0, function () {
        var contract, callRequests, currentNetwork, overrides, response, _a, callCount, callResult, i, name_2, outputs, result, params, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contract = multicall2
                        ? new contracts_1.Contract(multicall2.address, multicall2_json_1.default, provider)
                        : null;
                    callRequests = calls.map(function (call) {
                        var callData = abi_1.default.encode(call.name, call.inputs, call.params);
                        return {
                            target: call.contract.address,
                            callData: callData,
                        };
                    });
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    currentNetwork = _b.sent();
                    overrides = __assign({ blockTag: block }, (currentNetwork.chainId === FILECOIN_ID && {
                        from: VALID_FILECOIN_ADDRESS,
                    }));
                    if (!contract) return [3 /*break*/, 3];
                    return [4 /*yield*/, contract.tryAggregate(false, callRequests, overrides)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, callDeployless2(provider, callRequests, block)];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    response = _a;
                    callCount = calls.length;
                    callResult = [];
                    for (i = 0; i < callCount; i++) {
                        name_2 = calls[i].name;
                        outputs = calls[i].outputs;
                        result = response[i];
                        if (!result.success) {
                            callResult.push(null);
                        }
                        else {
                            try {
                                params = abi_1.default.decode(name_2, outputs, result.returnData);
                                data = outputs.length === 1 ? params[0] : params;
                                callResult.push(data);
                            }
                            catch (e) {
                                // Failed to decode the data: most likely calling non-existing contract
                                callResult.push(null);
                            }
                        }
                    }
                    return [2 /*return*/, callResult];
            }
        });
    });
}
exports.tryAll = tryAll;
function tryEach(provider, multicall3, calls, block) {
    return __awaiter(this, void 0, void 0, function () {
        var contract, callRequests, currentNetwork, overrides, response, _a, callCount, callResult, i, name_3, outputs, result, params, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contract = multicall3
                        ? new contracts_1.Contract(multicall3.address, multicall3_json_1.default, provider)
                        : null;
                    callRequests = calls.map(function (call) {
                        var callData = abi_1.default.encode(call.name, call.inputs, call.params);
                        return {
                            target: call.contract.address,
                            allowFailure: call.canFail,
                            callData: callData,
                        };
                    });
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    currentNetwork = _b.sent();
                    overrides = __assign({ blockTag: block }, (currentNetwork.chainId === FILECOIN_ID && {
                        from: VALID_FILECOIN_ADDRESS,
                    }));
                    if (!contract) return [3 /*break*/, 3];
                    return [4 /*yield*/, contract.aggregate3(callRequests, overrides)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, callDeployless3(provider, callRequests, block)];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    response = _a;
                    callCount = calls.length;
                    callResult = [];
                    for (i = 0; i < callCount; i++) {
                        name_3 = calls[i].name;
                        outputs = calls[i].outputs;
                        result = response[i];
                        if (!result.success) {
                            callResult.push(null);
                        }
                        else {
                            try {
                                params = abi_1.default.decode(name_3, outputs, result.returnData);
                                data = outputs.length === 1 ? params[0] : params;
                                callResult.push(data);
                            }
                            catch (e) {
                                // Failed to decode the data: most likely calling non-existing contract
                                callResult.push(null);
                            }
                        }
                    }
                    return [2 /*return*/, callResult];
            }
        });
    });
}
exports.tryEach = tryEach;
function callDeployless(provider, callRequests, block) {
    return __awaiter(this, void 0, void 0, function () {
        var inputAbi, constructor, inputs, args, data, currentNetwork, callData, outputAbi, outputFunc, name, outputs, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputAbi = deploylessMulticall_json_1.default;
                    constructor = inputAbi.find(function (f) { return f.type === 'constructor'; });
                    inputs = (constructor === null || constructor === void 0 ? void 0 : constructor.inputs) || [];
                    args = abi_1.default.encodeConstructor(inputs, [callRequests]);
                    data = (0, bytes_1.hexConcat)([multicall_1.deploylessMulticallBytecode, args]);
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    currentNetwork = _a.sent();
                    return [4 /*yield*/, provider.call(__assign({ data: data }, (currentNetwork.chainId === FILECOIN_ID && {
                            from: VALID_FILECOIN_ADDRESS,
                        })), block)];
                case 2:
                    callData = _a.sent();
                    outputAbi = multicall_json_1.default;
                    outputFunc = outputAbi.find(function (f) { return f.type === 'function' && f.name === 'aggregate'; });
                    name = (outputFunc === null || outputFunc === void 0 ? void 0 : outputFunc.name) || '';
                    outputs = (outputFunc === null || outputFunc === void 0 ? void 0 : outputFunc.outputs) || [];
                    response = abi_1.default.decode(name, outputs, callData);
                    return [2 /*return*/, response];
            }
        });
    });
}
function callDeployless2(provider, callRequests, block) {
    return __awaiter(this, void 0, void 0, function () {
        var inputAbi, constructor, inputs, args, data, currentNetwork, callData, outputAbi, outputFunc, name, outputs, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputAbi = deploylessMulticall2_json_1.default;
                    constructor = inputAbi.find(function (f) { return f.type === 'constructor'; });
                    inputs = (constructor === null || constructor === void 0 ? void 0 : constructor.inputs) || [];
                    args = abi_1.default.encodeConstructor(inputs, [false, callRequests]);
                    data = (0, bytes_1.hexConcat)([multicall_1.deploylessMulticall2Bytecode, args]);
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    currentNetwork = _a.sent();
                    return [4 /*yield*/, provider.call(__assign({ data: data }, (currentNetwork.chainId === FILECOIN_ID && {
                            from: VALID_FILECOIN_ADDRESS,
                        })), block)];
                case 2:
                    callData = _a.sent();
                    outputAbi = multicall2_json_1.default;
                    outputFunc = outputAbi.find(function (f) { return f.type === 'function' && f.name === 'tryAggregate'; });
                    name = (outputFunc === null || outputFunc === void 0 ? void 0 : outputFunc.name) || '';
                    outputs = (outputFunc === null || outputFunc === void 0 ? void 0 : outputFunc.outputs) || [];
                    response = abi_1.default.decode(name, outputs, callData)[0];
                    return [2 /*return*/, response];
            }
        });
    });
}
function callDeployless3(provider, callRequests, block) {
    return __awaiter(this, void 0, void 0, function () {
        var inputAbi, constructor, inputs, args, data, currentNetwork, callData, outputAbi, outputFunc, name, outputs, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputAbi = deploylessMulticall3_json_1.default;
                    constructor = inputAbi.find(function (f) { return f.type === 'constructor'; });
                    inputs = (constructor === null || constructor === void 0 ? void 0 : constructor.inputs) || [];
                    args = abi_1.default.encodeConstructor(inputs, [callRequests]);
                    data = (0, bytes_1.hexConcat)([multicall_1.deploylessMulticall3Bytecode, args]);
                    return [4 /*yield*/, provider.getNetwork()];
                case 1:
                    currentNetwork = _a.sent();
                    return [4 /*yield*/, provider.call(__assign({ data: data }, (currentNetwork.chainId === FILECOIN_ID && {
                            from: VALID_FILECOIN_ADDRESS,
                        })), block)];
                case 2:
                    callData = _a.sent();
                    outputAbi = multicall3_json_1.default;
                    outputFunc = outputAbi.find(function (f) { return f.type === 'function' && f.name === 'aggregate3'; });
                    name = (outputFunc === null || outputFunc === void 0 ? void 0 : outputFunc.name) || '';
                    outputs = (outputFunc === null || outputFunc === void 0 ? void 0 : outputFunc.outputs) || [];
                    response = abi_1.default.decode(name, outputs, callData)[0];
                    return [2 /*return*/, response];
            }
        });
    });
}
//# sourceMappingURL=call.js.map