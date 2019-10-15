var express = require("express");
var app = express();

const authors = [
  { id: "1", name: "Author" },
  { id: "2", name: "Author2" },
  { id: "3", name: "Author3" }
];

app.get("/authors", function(req, res) {
  res.json(authors);
});
app.get("/authors/:id", function(req, res) {
  console.log(req.params.id);
  const author = authors.find(({ id }) => req.params.id === id);
  console.log(author);
  res.json(author);
});

app.listen(3002, function() {
  console.log("Authors are listening on port 3002!");
});
