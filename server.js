const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); 

// Senin Kasa Bağlantın
const mongoURI = "mongodb+srv://ggurses181_db_user:SzxpfMvN93sOjPdX@cluster0.vnzglvc.mongodb.net/darknet_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("[SİSTEM]: Darknet veritabanına sızıldı!"))
  .catch(err => console.log("[HATA]: Kasa bağlantısı koptu.", err));

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  credits: { type: Number, default: 500 },
  timeLeft: { type: Number, default: 3600 },
  hp: { type: Number, default: 100 },
  maxHp: { type: Number, default: 100 }
});

const Player = mongoose.model("Player", PlayerSchema);

app.get("/", (req, res) => {
  res.send("DARKNET API AKTİF. İzinsiz girişler cezalandırılacaktır.");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newPlayer = new Player({ username, password });
    await newPlayer.save();
    res.json({ success: true, message: "Ağa katıldın. Hoş geldin siber serseri." });
  } catch (err) {
    res.json({ success: false, message: "Bu 'Handle' (isim) zaten alınmış." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const player = await Player.findOne({ username, password });
    if (player) {
      res.json({ success: true, player });
    } else {
      res.json({ success: false, message: "Erişim reddedildi. Yanlış kimlik veya şifre." });
    }
  } catch (err) {
    res.json({ success: false, message: "Sistem hatası." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SUNUCU]: Karanlık ağ ${PORT} portunda dinleniyor.`);
});
