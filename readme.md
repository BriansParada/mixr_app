# Mixr 🍹

A web app for searching, discovering, and saving cocktail recipes using the CocktailDB public API.

## Target Browsers

Chrome, Firefox, Safari, and Edge on desktop

[Jump to Developer Manual](#developer-manual)

---

## Live Demo
mixr-app-vrzc.vercel.app

## Developer Manual

### Install

1. Clone the repo and install dependencies:
   ```bash
   npm install express @supabase/supabase-js dotenv
   ```

2. Create a `.env` file in the project root:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

3. In Supabase, create a table called `saved_drinks` with these columns:
   - `id` (int8, primary key, auto-increment)
   - `drink_name` (text)
   - `drink_instructions` (text)
   - `img_url` (text)
   - `ingredients` (text)

4. Place all HTML/CSS/JS files inside a `public/` folder at the project root.

### Run

```bash
node index.js
```

App runs at `http://localhost:3000/home.html`.

### Tests

No tests are currently written.
---

### API Endpoints

#### `GET /api/cocktails`
Returns all saved cocktails from the database.

#### `POST /api/cocktail`
Saves a cocktail. Request body:
```json
{
  "drink_name": "Margarita",
  "drink_instructions": "...",
  "img_url": "...",
  "ingredients": "..."
}
```

---

### Known Bugs
- The carousel images have no labels — drinks can't be identified by browsing.
- This app is not build for mobile users

### Road Map

- Show all search results, not just the first.
- Add a delete button on the My Cocktails page.
- Add user accounts so each user has their own saved list.
- Make the layout mobile-responsive.