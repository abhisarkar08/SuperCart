const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

/* ---------------- DB Helpers ---------------- */

const dbPath = path.join(__dirname, "db.json");

const getDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const saveDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

/* ---------------- PRODUCTS ---------------- */

app.get("/products", (req, res) => {
  const db = getDB();
  res.json(db.products || []);
});

/* ---------------- USERS ---------------- */

// GET users (with query support like ?email=...&password=...)
app.get("/users", (req, res) => {
  const db = getDB();
  let users = db.user || [];

  const { email, password } = req.query;

  if (email && password) {
    users = users.filter(
      (u) => u.email === email && u.password === password
    );
  }

  res.json(users);
});

// POST new user
app.post("/users", (req, res) => {
  const db = getDB();

  const newUser = {
    id: Date.now(),
    ...req.body,
  };

  db.user.push(newUser);
  saveDB(db);

  res.status(201).json(newUser);
});

// PATCH user
app.patch("/users/:id", (req, res) => {
  const db = getDB();
  const id = Number(req.params.id);

  const userIndex = db.user.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  db.user[userIndex] = {
    ...db.user[userIndex],
    ...req.body,
  };

  saveDB(db);
  res.json(db.user[userIndex]);
});

/* ---------------- CART ---------------- */

// GET cart (with query ?userId=...)
app.get("/cart", (req, res) => {
  const db = getDB();
  let cart = db.cart || [];

  const { userId } = req.query;

  if (userId) {
    cart = cart.filter((item) => item.userId == userId);
  }

  res.json(cart);
});

// POST cart item
app.post("/cart", (req, res) => {
  const db = getDB();

  const newItem = {
    id: Date.now(),
    ...req.body,
  };

  db.cart = db.cart || [];
  db.cart.push(newItem);

  saveDB(db);
  res.status(201).json(newItem);
});

// PATCH cart item
app.patch("/cart/:id", (req, res) => {
  const db = getDB();
  const id = Number(req.params.id);

  const itemIndex = db.cart.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  db.cart[itemIndex] = {
    ...db.cart[itemIndex],
    ...req.body,
  };

  saveDB(db);

  res.json(db.cart[itemIndex]);
});

/* ---------------- FRONTEND BUILD ---------------- */

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
