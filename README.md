# ZDXB
A cli tool to get you off work early。

## Usage
install it in global:
`yarn global add zdxb` or `npm -g install zdxb`

run:
`zdxb <template> <name> <target>`
 - template: the template will be used.template must be registered before.
 - name: file name(class name) of the generated files.
 - target: target path of the generated files. realative to `process.cwd()`.

 And you can also install in locally and write a npm script in `package.json` of your project.
 ```json
{
  "zdxb": "zdxb --"
}
 ```
 And run 
 ```
 yarn zdxb <template> <name> <target>
 ```

## Customize
Now you can find all built-in templates in the `templates` directory of `zdxb` package.
You can PR or clone this project if you want to customize your own templates.

### 1. Make a new directory.
Create your own directory in `templates` directory of the package. The new directory name will be the name of `template` in cli. Multi-level directory is supported.

### 2. Write template file. 
Now we get only `name` parameter for template file. The `name` will be transformed intp four styles and passed to template.


template variable | name style
----------------- | ----------
{% uppercamel %} | NameStyle
{% kebab %} | name-style
{% snake %} | name_style
{% camel %} | nameStyle 

### 3. Register template. 
You need to register template before use it in cli:
```
// src/index.ts
const tm = new TemplateMaster(path.join(__dirname, '../templates'))
tm.register('component', 'src/components')
```
You can specify template name(dir name in templates dir) and default target path of the generated files.

### 4. Enjoy it.
