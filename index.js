const express = require("express");
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();

const dbURI =
  "mongodb+srv://krosection999:daiki999@cluster0.lkpqebf.mongodb.net/articles?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const name = "Blogs";
  Article.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { name, article: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
