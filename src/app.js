const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handleBars engine and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aly"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Aly",
    title: "About Page"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Aly",
    message: "this is the help message"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must prvide an address" });
  }

  geocode(req.query.address, (error, { lat, long } = {}) => {
    if (error) {
      return res.send({ error: error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location: { lat: lat, long: long },
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term"
    });
  }
  console.log("req.query", req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "404"
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is up on port 3000");
});
