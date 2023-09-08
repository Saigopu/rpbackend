import express from "express";
import {
  getConversationsList,
  getMessagesList,
  sendMessage,
} from "./controllers/getconvlist.js";

const router = express.Router();

router.get("/webhook", (req, res) => {
  // Capture the 'hub.verify_token' parameter from the query
  console.log(req.query);
  const verifyToken = req.query["hub.verify_token"];

  // Check if the 'hub.verify_token' matches your expected verify token
  if (verifyToken === "helpdesk@123") {
    // Respond with the 'hub.challenge' parameter to complete webhook setup
    const challenge = req.query["hub.challenge"];
    res.status(200).send(challenge);
  } else {
    // Invalid verify token, return an error response
    res.status(403).send("Verification failed");
  }
});

router.get("/conversationsList", getConversationsList);
router.get("/messagesList", getMessagesList);
router.get("/sendmessage", sendMessage);

// Handle incoming POST requests from Facebook's webhook

//leaving jwts for now

export default router;
