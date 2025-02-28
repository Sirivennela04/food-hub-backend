const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./models/Recipe');

const app = express();
const PORT = 3000;
app.use(express.json());

// Home page API
app.get('/', (req, res) => {
    res.send("<h1 align=center>Welcome to the Food Hub Recipe Sharing Platform</h1>");
});

// Add Recipe API
app.post('/recipes', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    try {
        const recipe = new Recipe({ title, ingredients, instructions });
        await recipe.save();
        res.json({ message: "Recipe added successfully." });
        console.log("Recipe added...");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding recipe." });
    }
});

// Get all Recipes API
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving recipes." });
    }
});

// Delete Recipe API
app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.json({ message: "Recipe deleted successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting recipe." });
    }
});

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("DB connected successfully..")
).catch(
    (err) => console.log(err)
);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is running on port :" + PORT);
});
