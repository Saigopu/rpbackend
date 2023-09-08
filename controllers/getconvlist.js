import axios from "axios";



export const getConversationsList = async (req, res) => {
  console.log("called controller");
  const userAccessToken = req.query.userAccessToken;
  console.log(userAccessToken);
  let pageID = "";
  let pageAccessToken;

  try {
    const meaccounts = await axios
      .get(
        "https://graph.facebook.com/v11.0/me/accounts?access_token=" +
          userAccessToken
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data.data[0].id);
        console.log(
          "this is from the controller ",
          res.data.data[0].access_token
        );
        pageID = res.data.data[0].id;
        pageAccessToken = res.data.data[0].access_token;
      })
      .catch((err) => {
        console.log(err);
      });

    const { data } = await axios.get(
      `https://graph.facebook.com/v11.0/me/conversations?fields=id,participants&access_token=${pageAccessToken}`
    );
    console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesList = async (req, res) => {
  console.log("called controller");
  const userAccessToken = req.query.userAccessToken;
  const conversationId = req.query.conversationId;
  console.log(userAccessToken);
  let pageID = "";
  let pageAccessToken;

  try {
    const meaccounts = await axios
      .get(
        "https://graph.facebook.com/v11.0/me/accounts?access_token=" +
          userAccessToken
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data.data[0].id);
        console.log(
          "this is from the controller ",
          res.data.data[0].access_token
        );
        pageID = res.data.data[0].id;
        pageAccessToken = res.data.data[0].access_token;
      })
      .catch((err) => {
        console.log(err);
      });

    const { data } = await axios.get(
      `https://graph.facebook.com/v11.0/${conversationId}?fields=messages{from,to,message,created_time}&access_token=${pageAccessToken}`
    );
    console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (req, res) => {
  console.log("called controller");
  const userAccessToken = req.query.userAccessToken;
  const userID = req.query.userID;
  const message = req.query.message;
  console.log(userAccessToken);
  let pageID = "";
  let pageAccessToken;

  try {
    const meaccounts = await axios
      .get(
        "https://graph.facebook.com/v11.0/me/accounts?access_token=" +
          userAccessToken
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data.data[0].id);
        console.log(
          "this is from the controller ",
          res.data.data[0].access_token
        );
        pageID = res.data.data[0].id;
        pageAccessToken = res.data.data[0].access_token;
      })
      .catch((err) => {
        console.log(err);
      });

    //   const { data } = await axios.get(
    //     `https://graph.facebook.com/v11.0/${conversationId}?fields=messages{from,to,message,created_time}&access_token=${pageAccessToken}`
    //   );
    //   console.log(data);
    //   res.status(200).json({ data: data });

    const response = await axios.post(
      `https://graph.facebook.com/v11.0/me/messages?access_token=${pageAccessToken}`,
      {
        messaging_type: "RESPONSE",
        recipient: {
          id: userID,
        },
        message: {
          text: message,
        },
      }
    );
    console.log(
      response,
      "printing the response in the sendmessage controller"
    );
    res.status(200).json({ data: "success" });
  } catch (error) {
    console.log(error);
  }
};



