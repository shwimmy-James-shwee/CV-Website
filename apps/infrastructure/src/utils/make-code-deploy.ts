import * as fs from "fs";
const path = "./package.json";

fs.readFile(path, "utf8", (err, data) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return;
  }
  const result = data.replace(/"main": "src\/index.ts"/, '"main": "src/codedeploy/index.ts"');

  fs.writeFile(path, result, `utf8`, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return;
    }
    // eslint-disable-next-line no-console
    console.log('Updated "main" field in package.json');
  });
});
