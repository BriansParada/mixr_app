const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(
  supabaseUrl,
  supabaseKey
);

// Get saved cocktails from database
app.get('/cocktails', async (req, res) => {
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
app.post('/cocktail', async (req, res) => {
    console.log('Adding Cocktail');

    console.log(`Request: ${JSON.stringify(req.body)}`);

    const drinkName = req.body.drink_name;
    const instructions = req.body.drink_instructions;
    const imageUrl = req.body.img_url;

    const { data, error } = await supabase.from("saved_drinks").insert({
        drink_name: drinkName,
        instructions: instructions,
        image_url: imageUrl
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