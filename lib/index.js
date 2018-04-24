"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_master_1 = require("./template-master");
var path = require("path");
var tm = new template_master_1.default(path.join(__dirname, '../templates'));
tm.register('component', 'src/components');
tm.register('model', 'src/models');
tm.register('store', 'src/stores');
exports.default = tm;
//# sourceMappingURL=index.js.map