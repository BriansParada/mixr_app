const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(
  supabaseUrl,
  supabaseKey
);

// Get saved cocktails from database
app.get('/api/cocktails', async (req, res) => {
    console.log('Attempting to get all cocktails!');
    const { data, error } = await supabase.from('saved_drinks').select();
    if (error) {
        console.log(`Error: ${error}`);

        res.statusCode = 500;
        res.send(error);
    } else {
        console.log('Received Data:', data);
        res.json(data);
    }
});
// Save cocktails
app.post('/api/cocktail', async (req, res) => {
    console.log('Adding Cocktail');

    console.log(`Request: ${JSON.stringify(req.body)}`);

    const drinkName = req.body.drink_name;
    const instructions = req.body.drink_instructions;
    const imageUrl = req.body.img_url;
    const ingredients = req.body.ingredients;

    const { data, error } = await supabase.from("saved_drinks").upsert({
        drink_name: drinkName,
        drink_instructions: instructions,
        img_url: imageUrl,
        ingredients: ingredients
        })
        .select();

    if (error) {

        console.log(`Error: ${error}`);

        res.statusCode = 500;
        res.send(error);

    } else {

        res.json(data);
    }
});
app.listen(port, () => {
    console.log(`App is available on port: ${port}`);
});