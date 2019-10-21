import * as fs from "fs";
export default (parent, args) => {
  return args.file.then(file => {
    const stream = fs.createWriteStream("uploaded/" + file.filename);
    stream.on("finish", function() {
      console.log("file has been written");
    });
    file.stream.pipe(stream);
    return file;
  });
};
