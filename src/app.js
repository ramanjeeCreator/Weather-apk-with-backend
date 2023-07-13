const express = require("express");
const { stat } = require("fs");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 5000;

// public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

app.get("", (req, res) => {
  res.render("index");
});
app.get("/about-us", (req, res) => {
  res.render("about");
});
app.get("/contact-us", (req, res) => {
  res.send("<h1>Welcome to our contact us page</h1>");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("/terms-of-service", (req, res) => {
  res.send("<h1>Welcome to our terms of service</h1>");
});
app.get("*", (req, res) => {
  res.render("404error", {
    errMsg: "Opps! Page Not Found",
  });
});

app.listen(port, () => {
  console.log("You are live at ", port, "The code is run Hurry up");
});
