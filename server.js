import express from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();
const port = 8000;

let golabaludatedMSG = [];

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);

// Handle the GET request for verification
app.get("/webhook", (req, res) => {
  console.log(req.query, "this is in the router js file");
  const challenge = req.query["hub.challenge"];
  res.set("Content-Type", "text/plain");
  res.status(200).send(challenge);
});

app.post("/webhook", (req, res) => {
  const body = req.body;
  console.log("Received update from Facebook:", body);
  console.log("Received update from Facebook:", body.entry[0].messaging[0]);
  // Process the update (handle messages, events, etc.)
  golabaludatedMSG=body.entry[0].messaging[0];
  // Send a response to acknowledge receipt of the update
  res.status(200).send("Update received");
});

app.get("/updatedMSG", (req, res) => {
  // console.log("this is the updated msg",golabaludatedMSG);
  res.status(200).send(golabaludatedMSG);
});


app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});

//we are getting the response when we hit http://localhost:8000/api/webhook

// https://e1d3-2401-4900-3e98-b2a4-fcf7-3ec7-c7c7-3c6c.ngrok.io

// https://2603-210-212-2-165.ngrok.io

//the token we get for webhooks is helpdeskv2@123
