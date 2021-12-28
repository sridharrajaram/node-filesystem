const express = require("express"); //express server
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const fs = require("fs"); // for CRUD on  file

app.get("/", (request, response) => {
  response.send("append URL with '/getfiles' ");
});

//creates a text file and writes data in it
app.post("/postfiles", (request, response) => {
  //current date and time
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();
  let today = day + "-" + month + "-" + year;
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let time = hour + "." + minutes + "." + seconds;
  fs.writeFile(`${today}-${time}.txt`, `${Date.now()}`, function (err) {
    response.send([today, time]);
  });
});

//retrieves all text files
app.get("/getfiles", (request, response) => {
  let result = [];
  fs.readdir(".././node-filesystem", function (err, files) {
    //listing all files using forEach
    files.forEach(function (file) {
      //filtering text files
      if (file.slice(file.length - 3, file.length) == "txt") {
        fs.readFile(file, "utf8", function (err, data) {
          console.log(data); //printing data from all text files
        });
      }
    });
  });
response.json({message:"file retrived"});
});
app.listen(PORT, () => console.log(`The server is started on port ${PORT}`));
