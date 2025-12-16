const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/itemsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.log(err));

const Item = mongoose.model('Item', { name: String });

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.status(201).json({ message: 'Item salvo!', item: newItem });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item removido!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar item' });
    }
});