"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var glob = require("glob");
// 使用 {% virable %} 作为模板变量
_.templateSettings.interpolate = /{%([\s\S]+?)%}/g;
var TemplateMaster = /** @class */ (function () {
    function TemplateMaster(templateDir) {
        this.templateMap = new Map();
        this.templateDir = templateDir;
    }
    // 注册模板
    TemplateMaster.prototype.register = function (templateName, target) {
        if (!fs.existsSync(path.join(this.templateDir, templateName))) {
            console.log("Register Failed: " + templateName + " does not exsist in path: " + this.templateDir);
            return;
        }
        this.templateMap.set(templateName, target || "src/" + templateName);
    };
    // 对外接口
    TemplateMaster.prototype.createFrom = function (template, name, targetPath) {
        var _this = this;
        if (!this.templateMap.has(template)) {
            console.log("Failed: " + template + " template does not exsist. Please register it first.");
            return;
        }
        if (!targetPath) {
            targetPath = this.templateMap.get(template);
        }
        var templateDir = path.join(this.templateDir, template);
        var shouldBeCreated = glob.sync('**/*.template', {
            cwd: templateDir,
            nosort: true,
            nodir: true,
        });
        shouldBeCreated.forEach(function (filePath) {
            _this.generateFile(path.join(templateDir, filePath), path.join(process.cwd(), targetPath, filePath), name);
        });
    };
    // 生成文件
    TemplateMaster.prototype.generateFile = function (source, target, name) {
        var camelCase = _.camelCase(name);
        var templateViriables = {
            uppercamel: _.upperFirst(camelCase),
            camel: camelCase,
            snake: _.snakeCase(name),
            kebab: _.kebabCase(name)
        };
        var templateString = fs.readFileSync(source).toString();
        var fileContent = _.template(templateString)(templateViriables);
        var realTarget = _.template(target)(templateViriables).replace(/\.template$/, '');
        this.write(realTarget, fileContent);
    };
    TemplateMaster.prototype.write = function (target, content) {
        function mkdirp(dirPath) {
            var dir = path.dirname(dirPath);
            if (!fs.existsSync(dir)) {
                mkdirp(dir);
            }
            try {
                fs.mkdirSync(dirPath);
            }
            catch (error) {
            }
        }
        mkdirp(path.dirname(target));
        fs.writeFileSync(target, content);
    };
    return TemplateMaster;
}());
exports.default = TemplateMaster;
//# sourceMappingURL=template-master.js.map