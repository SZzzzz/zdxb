import TemplateMaster from './template-master';
import * as path from 'path';

const tm = new TemplateMaster(path.join(__dirname, '../templates'));
tm.register('component', 'src/components');
tm.register('model', 'src/models');
tm.register('store', 'src/stores');
tm.register('api', 'src/apis');
export default tm;
