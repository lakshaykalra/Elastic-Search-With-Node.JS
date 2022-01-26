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
const elasticsearch_1 = require("@elastic/elasticsearch");
const fs_1 = require("fs");
const client = new elasticsearch_1.Client({
    cloud: {
        id: 'Test:dXMtZWFzdDQuZ2NwLmVsYXN0aWMtY2xvdWQuY29tJDYwNDY5NGJlM2MyOTRlZjliMDgwZmFhNjU4ZDMyM2U1JGIxZGVmMDRiMWFjMTQzZTVhZjkwZTg2YWI5ODA5MzFi'
    },
    auth: {
        username: 'elastic',
        password: 'QWqq6AcQM1mHm92SdH8r2Qt4'
    }
});
function testElasticSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield client.info();
            console.log('<<<<<success<<', response);
        }
        catch (error) {
            console.log('<<<<<<<ERROR<>>', error);
        }
    });
}
function storeData(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client.index({
                index: 'products',
                body: JSON.stringify(productData)
            });
            return true;
        }
        catch (e) {
            console.log('<<<<ERROR IN STORING DATA IN ELASTIC>>>', e);
            throw e;
        }
    });
}
function searchData(search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield client.search({
                index: 'products',
                body: {
                    query: {
                        match: {
                            name: search
                        }
                    }
                }
            });
            return data;
        }
        catch (e) {
            console.log('<<<<ERROR IN STORING DATA IN ELASTIC>>>', e);
            throw e;
        }
    });
}
function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        // if index exists, return
        // if index doesn't exists, create mapping and create index
        const exists = yield client.indices.exists({ index: 'comments' });
        console.log('<<<<<<<<<<<<<<IS EXIST>>>>>>>>', exists);
        if (exists.body)
            return;
        else {
            return yield client.indices.create({
                index: 'comments',
                body: {
                    mappings: {
                        properties: {
                            userId: { type: 'integer' },
                            id: { type: 'integer' },
                            title: { type: 'text' },
                            completed: { type: 'boolean' }
                        }
                    }
                }
            });
        }
    });
}
function storeBulkData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prepare();
            let datasource = (0, fs_1.createReadStream)('./test.json');
            const result = yield client.helpers.bulk({
                datasource,
                onDocument(doc) {
                    return {
                        index: { _index: 'comments' }
                    };
                }
            });
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<', result);
        }
        catch (e) {
            console.log('<<<<<ERROR IN SAVING BULK DATA>>>>.', e);
        }
    });
}
module.exports = {
    storeData,
    searchData,
    storeBulkData
};
//# sourceMappingURL=elastic-service.js.map