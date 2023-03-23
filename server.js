const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey:process.env.OPENAI_API_KEY
})

const openai  = new OpenAIApi(config);
const app = express();
app.use(bodyParser.json());
app.use(cors());



app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt,
      });
  
      res.send(completion.data.choices[0].text);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  });

  

const port = 8080;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
