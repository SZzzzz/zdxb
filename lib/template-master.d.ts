export default class TemplateMaster {
    private templateMap;
    private templateDir;
    register(templateName: string, target?: string): void;
    createFrom(template: string, name: string, targetPath: string): void;
    private generateFile(source, target, name);
    private write(target, content);
    constructor(templateDir: string);
}
