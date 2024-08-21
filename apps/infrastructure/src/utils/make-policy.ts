import * as fs from 'fs';
import { replaceParams } from './param';

fs.mkdirSync('./tmp', { recursive: true });

if (!fs.existsSync('./tmp')) {
  fs.mkdirSync('./tmp');
}

fs.readdirSync('./Azure_B2C_Custom_Policies', { withFileTypes: true }).forEach((entry) => {
  if (entry.isFile() && entry.name.endsWith('.xml')) {
    const filePath = `./Azure_B2C_Custom_Policies/${entry.name}`;
    const data = fs.readFileSync(filePath, 'utf8');
    const replacedData = Object.entries(replaceParams).reduce((acc, [key, val]) => {
      return acc.replaceAll(key, val);
    }, data);
    fs.writeFileSync(`./tmp/${entry.name}`, replacedData);
  }
});
