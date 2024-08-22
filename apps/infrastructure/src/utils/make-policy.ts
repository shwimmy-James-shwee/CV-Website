/* eslint-disable no-console */
import * as fs from "fs";
import { replaceParams } from "./param";
import * as path from "path";

fs.mkdirSync("./tmp", { recursive: true });

if (!fs.existsSync("./tmp")) {
  fs.mkdirSync("./tmp");
}

const directoryPath = path.join(__dirname, "../../Azure_B2C_Custom_Policies");

fs.readdirSync(directoryPath, { withFileTypes: true }).forEach((entry) => {
  if (entry.isFile() && entry.name.endsWith(".xml")) {
    const filePath = `${directoryPath}/${entry.name}`;
    const data = fs.readFileSync(filePath, "utf8");
    const replacedData = Object.entries(replaceParams).reduce((acc, [key, val]) => {
      return acc.replaceAll(key, val);
    }, data);
    const file = `./tmp/${entry.name}`;
    fs.writeFileSync(file, replacedData);
    console.log(`Wrote to file -> ${file}`);
  }
});
