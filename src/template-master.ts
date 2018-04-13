import * as path from 'path'
import * as fs from 'fs'
import * as _ from 'lodash'
import * as glob from 'glob'

// 使用 {% virable %} 作为模板变量
_.templateSettings.interpolate = /{%([\s\S]+?)%}/g

export default class TemplateMaster {
  private templateMap: Map<string, string> = new Map<string, string>()

  private templateDir: string

  // 注册模板
  register(templateName: string, target?: string) {
    if (!fs.existsSync(path.join(this.templateDir, templateName))) {
      console.log(
        `Register Failed: ${templateName} does not exsist in path: ${
          this.templateDir
        }`
      )
      return
    }
    this.templateMap.set(templateName, target || `src/${templateName}`)
  }

  // 对外接口
  createFrom(template: string, name: string, targetPath: string) {
    if (!this.templateMap.has(template)) {
      console.log(
        `Failed: ${template} template does not exsist. Please register it first.`
      )
      return
    }

    if (!targetPath) {
      targetPath = this.templateMap.get(template)!
    }

    const templateDir = path.join(this.templateDir, template)
    const shouldBeCreated = glob.sync('**/*.template', {
      cwd: templateDir,
      nosort: true,
      nodir: true
    })
    shouldBeCreated.forEach(filePath => {
      this.generateFile(
        path.join(templateDir, filePath),
        path.join(process.cwd(), targetPath, filePath),
        name
      )
    })
  }

  // 生成文件
  private generateFile(source: string, target: string, name: string) {
    const camelCase = _.camelCase(name)
    const templateViriables = {
      uppercamel: _.upperFirst(camelCase),
      camel: camelCase,
      snake: _.snakeCase(name),
      kebab: _.kebabCase(name)
    }
    const templateString = fs.readFileSync(source).toString()
    const fileContent = _.template(templateString)(templateViriables)
    const realTarget = _.template(target)(templateViriables).replace(
      /\.template$/,
      ''
    )
    this.write(realTarget, fileContent)
  }

  private write(target: string, content: string) {
    function mkdirp(dirPath: string) {
      const dir = path.dirname(dirPath)
      if (!fs.existsSync(dir)) {
        mkdirp(dir)
      }
      try {
        fs.mkdirSync(dirPath)
      } catch (error) {}
    }

    mkdirp(path.dirname(target))
    fs.writeFileSync(target, content)
  }

  constructor(templateDir: string) {
    this.templateDir = templateDir
  }
}
