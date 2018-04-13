import TemplateMaster from './template-master'
import * as path from 'path'

const tm = new TemplateMaster(path.join(__dirname, '../templates'))
tm.register('component', 'src/components')
export default tm
