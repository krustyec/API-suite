// library section
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// const or variable section
const app = express();
const port = 3000;
const api_url_joke = "https://v2.jokeapi.dev/joke/";
const api_url_dog = "https://dog.ceo/api/breeds/image/random";
const api_url_ip = "https://api.ipify.org?format=json";
const api_url_weather = "https://api.openweathermap.org/data/2.5/";
const api_key_weather = "a3281374ae6f452887921d04c91392d9";
const api_url_cocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const d = new Date();
let year = d.getFullYear();
let lat = 0;
let lon = 0;
let random_For = 0;

// initialization to use body methods
app.use(bodyParser.urlencoded({ extended: true }));

// use static folders
app.use(express.static("public"));

// call index.ejs 
// used to initialize page
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(api_url_joke + "Programming?type=twopart");
        // console.log(result.data.setup);
        res.render("index.ejs", { 
            jokeQue: result.data.setup,
            jokeAns: result.data.delivery,
            valueYear: year,
        });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("weather.ejs", {
          valueYear: year,
      });
      }
});

// call jokePro.ejs
// used to get a custom joke from an API joke
app.get("/jokePro", async (req, res) => {
    try {
        const result = await axios.get(api_url_joke + "Programming?type=twopart");
        // console.log(result.data.setup);
        res.render("jokePro.ejs", { 
            jokeQue: result.data.setup,
            jokeAns: result.data.delivery,
            valueYear: year,
        });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("weather.ejs", {
          valueYear: year,
      });
      }
});

// call jokeDark.ejs
// used to get a custom single joke from an API joke
app.get("/jokeDark", async (req, res) => {
    try {
        const result = await axios.get(api_url_joke + "Dark?type=single");
        // console.log(result.data.setup);
        res.render("jokeDark.ejs", { 
            joke: result.data.joke,
            valueYear: year,
        });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("weather.ejs", {
          valueYear: year,
      });
      }
});

// call dog.ejs
// used to get an img of a ramdon dog from a random API source
app.get("/dog", async (req, res) => {
    try {
        const result = await axios.get(api_url_dog);
        // console.log(result.data.message);
        res.render("dog.ejs", { 
            source: result.data.message,
            valueYear: year,
        });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("weather.ejs", {
          valueYear: year,
      });
      }
});

// call ip.ejs
// used to get the current public ip address from an API source
app.get("/ip", async (req, res) => {
    try {
        const result = await axios.get(api_url_ip);
        // console.log(result.data.message);
        res.render("ip.ejs", { 
            ip: result.data.ip,
            valueYear: year,
        });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("weather.ejs", {
          valueYear: year,
      });
      }
});

// call weather.ejs
// need to sign up to get an api key, and the make requests
app.get("/weather", (req, res) => {
  try {
    res.render("weather.ejs", {
      valueYear: year,
  });
} catch (error) {
  console.error("Failed to make request:", error.message);
  res.render("weather.ejs", {
    valueYear: year,
});
}
});

// receive input latitud and longitud coordinates
app.post("/submitWeather", async (req, res) => {
  try {
    lat = req.body.valLat;
    lon = req.body.valLon;
    const result = await axios.get(api_url_weather + "/weather?lat=" + lat + "&lon=" + lon, {
      params: {
        apiKey: api_key_weather,
      },
    });
    const resultFor = await axios.get(api_url_weather + "/forecast?lat=" + lat + "&lon=" + lon, {
      params: {
        apiKey: api_key_weather,
      },
    });
    // console.log(typeof (result.data.weather));
    // console.log(result.data.weather[0].main);
    random_For = Math.floor(Math.random() * resultFor.data.list.length);
    // console.log(resultFor.data.list[random_For].dt_txt);
    // console.log(req.body);
    res.render("weather.ejs", {
        main: result.data.weather[0].main,
        des: result.data.weather[0].description,
        latServer: result.data.coord.lat,
        lonServer: result.data.coord.lon,
        mainFor: resultFor.data.list[random_For].weather[0].main,
        desFor: resultFor.data.list[random_For].weather[0].description,
        dateFor: resultFor.data.list[random_For].dt_txt,
        valueYear: year,
    });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("weather.ejs", {
        valueYear: year,
    });
    }
});

// call cocktail.ejs
// used to get an image and the name of a famous cocktail
app.get("/cocktail", async (req, res) => {
  try {
      const result = await axios.get(api_url_cocktail);
      res.render("cocktail.ejs", { 
          cocktail: result.data.drinks[0].strDrink,
          sourceImg: result.data.drinks[0].strDrinkThumb,
          valueYear: year,
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("cocktail.ejs", {
        valueYear: year,
    });
    }
});

// start up port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});