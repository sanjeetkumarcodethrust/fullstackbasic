import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000 http://localhost:4000/.well-known/appspecific/com.chrome.devtools.json ws://localhost:4000; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server is ready");
});

// get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
  const jokes = [
    { id: 1, title: "Why don't scientists trust atoms?", joke: "Because they make up everything!" },
    { id: 2, title: "What do you call a fake noodle?", joke: "An impasta!" },
    { id: 3, title: "Why did the scarecrow win an award?", joke: "Because he was outstanding in his field!" },
    { id: 4, title: "What do you call a bear with no teeth?", joke: "A gummy bear!" },
    { id: 5, title: "Why don't eggs tell jokes?", joke: "They'd crack up!" }
  ];
  res.send(jokes);
});


// Handle favicon requests to avoid 404 noise
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/favicon.svg"), err => {
    if (err) {
      res.sendStatus(204);
    }
  });
});

const port= process.env.PORT || 4000;


app.listen(port, () => {  
    console.log(`Server at http://localhost:${port}`);
});