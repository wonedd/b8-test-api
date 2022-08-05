import express, { json } from "express";
import cors from "cors";

import { v4 } from "uuid";

const app = express();

app.use(json());


 const products = [
    {
      id:v4(),
      title:
        "Monitor LED 27'' Gamer Curvo Samsung  1920 x 1080 FHD 240 Hz HDMI, DP, Gsync Série CRG50",
      price: 2599,
      oldPrice: 2813.99,
      imageUrl: "/assets/tv.png",
      favorite: false,
    },
    {
      id: v4(),
      title:
        "ACER Notebook Aspire 5 A515-56-32PG, Intel Core I3 11ª geração, 4GB, 256GB SDD, Windows11, Prata",
      price: 2924.73,
      oldPrice: 3249.7,
      imageUrl: "/assets/note.png",
      favorite: false,
    },
  ];
  
const favorites = [];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});


app.get("/", (req, res) => {
  return res.json(products);
});

app.get("/favorites", (req, res) => {
  return res.json(favorites);
});


app.post("/favorites", (req, res) => {
  const { id } = req.query;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  product.favorite = true;

  return res.status(200).json(product);
});


app.listen(process.env.PORT || 3000);
