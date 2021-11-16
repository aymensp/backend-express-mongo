var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const xml = require("xml2js");
const { Region } = require("../models/region.model");
const { Ville } = require("../models/ville.model");

router.get("/getData", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../resources/regions.xml"),
    (err, buffer) => {
      if (!err) {
        let arrayRegions = [];
        xml.parseString(buffer, (err, result) => {
          arrayRegions = result.complete.option;
          arrayRegions = arrayRegions.map((el) => {
            return Region.fromJson(el);
          });
        });
        res.json(arrayRegions);
      }
    }
  );
});

router.get("/getData/:ville", (req, res) => {
  const { ville } = req.params;
  fs.readFile(
    path.join(__dirname, "../resources/regions.xml"),
    (err, buffer) => {
      if (!err) {
        let arrayRegions = [];
        xml.parseString(buffer, (err, result) => {
          arrayRegions = result.complete.option;
          arrayRegions = arrayRegions.map((el) => {
            return Region.fromJson(el);
          });
        });

        const regionsExist = arrayRegions.find((el) => {
          return el.id == ville;
        });
      
      }
    }
  );
});

router.get("/getScrappedData", (req, res) => {
  console.log("IP", req.ip);
  console.log("url", req.url);
  console.log("originalUrl", req.originalUrl);

  const user_agent = req.headers["user-agent"];

  console.log("user_agent", user_agent);
  const isBot = /Googlebot|Bingbot|Slurp|AppleWebKt/.test(user_agent);
  console.log({ isBot });

  axios
    .get("http://www.tunisie-annonce.com/ajax/_region.asp?parent=TN")
    .then((body) => {
      let data = body.data;
      xml.parseString(data, (err, jsonData) => {
        array = jsonData.complete.option;
        array = array.map((el) => {
          return Region.fromJson(el);
        });
        // res.json(array);

        let ariana = array[0];
        //http://www.tunisie-annonce.com/ajax/_ville.asp?parent=102
        axios
          .get(
            `http://www.tunisie-annonce.com/ajax/_ville.asp?parent=${ariana.id}`
          )
          .then((villeDataXML) => {
            const arianaData = villeDataXML.data;
            xml.parseString(arianaData, (err, arianaJSONData) => {
              let dataArray = arianaJSONData.complete.option;
              dataArray = dataArray.map((el) => {
                return Ville.fromJson(el);
              });
              array[0].cites = dataArray;
              res.json(array);
            });
          });
      });
    })
    .catch((exception) => {
      console.log("exception", exception);
      res.json({ exception });
    });
});

module.exports = router;
