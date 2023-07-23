import express from "express";
import configViewEngine from "./configs/configViewEngine";
import initWebRoute from "./routes/web";
import connectDB from "./configs/connectDB";
import cors from "cors";
import bodyParser, { json, urlencoded } from "body-parser";
// import connection from "./configs/connectDB";
let app = express();

const port = process.env.PORT || 8080; // dat ten port
console.log(">>> check port : ", port);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, access-control-allow-origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// set up view engine
configViewEngine(app);
// init web rouite
initWebRoute(app);
// connect DB
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
