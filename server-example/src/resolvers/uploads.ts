import * as fs from "fs";
const folder = "uploaded/";

export default (parent, args) => {
  return fs.readdirSync(folder).map(file => {
    return {
      filename: file,
      mimetype: "text/plain",
      encoding: "utf8"
    };
  });
};
