require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());                  // built‑in body parser

// ----- MongoDB connection -----
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db connected'))
  .catch(err => console.error(err));

// ----- Schema & Model -----
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty:  { type: Number, default: 0 }
});
const Item = mongoose.model('Item', itemSchema);

// ----- CRUD routes -----
// create
app.post('/items', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// read all
app.get('/items', async (_req, res) => {
  const items = await Item.find();
  res.json(items);
});

// read one
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.sendStatus(404);
    res.json(item);
  } catch { res.sendStatus(400); }
});

// update
app.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.sendStatus(404);
    res.json(item);
  } catch { res.sendStatus(400); }
});

// delete
app.delete('/items/:id', async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  item ? res.json({ message: 'deleted' }) : res.sendStatus(404);
});

// ----- start server -----
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`api on :${port}`));
