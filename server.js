const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

function geminiResponse(socket, newsTitle) {
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyACXoCJAb4dBnAbcKTVsMOKgMMy9J1EZ8w";

  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Title: Jokowi urges China to expedite Surabaya HSR feasibility study: Retno",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '<p>President Joko "Jokowi" Widodo has urged China to expedite the feasibility study for the Surabaya high-speed railway (HSR) project. The request was conveyed by Foreign Minister Retno Marsudi during a meeting with Chinese Foreign Minister Qin Gang in Beijing on Thursday.</p><p>The feasibility study for the Surabaya HSR project is expected to be completed by the end of 2023. The project is part of Indonesia\'s larger plan to develop a high-speed rail network connecting major cities in Java and Sumatra. The Surabaya HSR project is expected to cost around US$5 billion and will cover a distance of approximately 150 kilometers.</p><p>In addition to the Surabaya HSR project, Indonesia and China are also working on several other infrastructure projects, including the Jakarta-Bandung HSR project and the Regional Comprehensive Economic Partnership (RCEP) trade agreement. The Jakarta-Bandung HSR project is expected to be completed in 2023 and will cover a distance of approximately 142 kilometers.</p><p>The RCEP trade agreement is a free trade agreement between 15 countries in the Asia-Pacific region. The agreement was signed in November 2020 and is expected to come into effect in early 2023. The RCEP trade agreement is expected to boost trade and investment between the participating countries.</p><p>Indonesia and China have a long history of cooperation in the infrastructure sector. China has provided financial and technical assistance to Indonesia for a number of infrastructure projects, including the Jakarta-Bandung HSR project and the Surabaya HSR project.</p><p>The Surabaya HSR project is expected to have a number of benefits for Indonesia. The project will reduce travel time between Surabaya and other major cities in Java. It will also boost economic development in the Surabaya area. The project is expected to create jobs and attract investment.</p><p>The Surabaya HSR project is a major infrastructure project that will have a significant impact on Indonesia. The project is expected to boost economic development, create jobs, and improve transportation in the Surabaya area.</p><p>Indonesia and China have a strong relationship in the infrastructure sector. China has provided financial and technical assistance to Indonesia for a number of infrastructure projects. The Surabaya HSR project is one of the most important infrastructure projects in Indonesia.</p><p>The Surabaya HSR project is expected to be completed in 2027. The project will cover a distance of approximately 150 kilometers and will connect Surabaya to other major cities in Java.</p><p>The Surabaya HSR project is expected to have a number of benefits for Indonesia. The project will reduce travel time between Surabaya and other major cities in Java. It will also boost economic development in the Surabaya area. The project is expected to create jobs and attract investment.</p><p>The Surabaya HSR project is a major infrastructure project that will have a significant impact on Indonesia. The project is expected to boost economic development, create jobs, and improve transportation in the Surabaya area.</p>',
            },
          ],
        },
      ],
    });
    const query = `Title: ${newsTitle}`;
    const result = await chat.sendMessage(query);
    console.log("🚀 ~ runChat ~ query:", query);
    const response = result.response;
    console.log(response.text());
    socket.emit("message", response.text());
  }
  runChat();
}

io.on("connection", (socket) => {
  console.log("A client has connected");

  // Define event handler for receiving messages from the client
  socket.on("message", (newsTitle) => {
    console.log("Received title from client:", newsTitle);
    geminiResponse(socket, newsTitle);
  });

  // Define event handler for when a client disconnects
  socket.on("disconnect", () => {
    console.log("A client has disconnected");
  });
});
// Define the port number
const PORT = process.env.PORT || 3000; // Use the port defined in the environment variable or use port 3000 by default

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
httpServer.listen(3000);
