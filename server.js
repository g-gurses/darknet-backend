require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let player = {
  credits: 0,
  xp: 0,
  hp: 100,
  time: 600
};

app.get("/api/player", (req, res) => {
  res.json(player);
});

app.post("/api/crime", (req, res) => {
  const success = Math.random() > 0.5;

  if (success) {
    player.credits += 100;
    player.xp += 10;
  } else {
    player.hp -= 10;
  }

  res.json({ success, player });
});

app.listen(3000, () => console.log("Server running on 3000"));
