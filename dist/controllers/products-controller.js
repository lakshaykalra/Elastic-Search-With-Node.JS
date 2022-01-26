"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const services_1 = require("../services");
console.log('<<<<<<<services>>>>>', services_1.services);
function postProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('<<<<<<<<', req.body);
            const product = yield services_1.services.elasticService.storeData(req.body);
            return res.json({
                statusCode: 200,
                message: 'Product Saved',
                data: {}
            });
        }
        catch (e) {
            console.log('<<<<error in posting product>>>>>>', e);
            return res.json({
                statusCode: 400,
                message: 'Error'
            });
        }
    });
}
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield services_1.services.elasticService.searchData(req.query.name);
            return res.json({
                statusCode: 200,
                message: 'Product Saved',
                data: product
            });
        }
        catch (e) {
            console.log('<<<<error in posting product>>>>>>', e);
            return res.json({
                statusCode: 400,
                message: 'Error'
            });
        }
    });
}
function postBulkProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('<<<<<<<<', req.body);
            const product = yield services_1.services.elasticService.storeBulkData();
            return res.json({
                statusCode: 200,
                message: 'Bulk Product Saved',
                data: {}
            });
        }
        catch (e) {
            console.log('<<<<error in posting product>>>>>>', e);
            return res.json({
                statusCode: 400,
                message: 'Bulk Error'
            });
        }
    });
}
module.exports = {
    postProduct,
    getProduct,
    postBulkProducts
};
//# sourceMappingURL=products-controller.js.map