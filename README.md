# 🎮 Free Gaming — Browser Game Portal

A modern, dark-themed game portal where you can browse and play free browser games. Built entirely with vanilla HTML5, CSS3, and JavaScript — no frameworks, no backend, no sign-in required, no paid services.

![Free Gaming](assets/images/logo.svg)

## ✨ Features

- **Direct Play** — Open the site and play immediately; no accounts, no logins, no paywalls
- **9 Playable Games** — Snake, Tic-Tac-Toe, Clicker, Pong, Memory, Space Dodge, Synthwave Runner, Tetra Blocks, and Minesweeper
- **Dark Cyber-Neon Theme** — Beautiful neon glow effects, grid background, animated cards
- **Search & Filter** — Filter by category (Action, Arcade, Puzzle, Strategy, Multiplayer) and sort by Newest or Top Rated
- **Responsive Design** — 3 columns on desktop, 2 on tablet, 1 on mobile
- **Game Cards** — Thumbnails, ratings, tags, developer info, online status, and Play button
- **Game Page** — Each game loads in an iframe with fullscreen support and game details
- **SEO Friendly** — Meta tags, alt text, semantic HTML
- **Lazy Loaded Images** — Uses `loading="lazy"` for performance
- **100% Client-Side** — Everything is pure HTML/CSS/JS with zero external backend dependencies

## 🗂️ File Structure

```
free-gaming/
├── index.html              # Main homepage (games portal)
├── game.html               # Individual game player page
├── README.md               # Documentation
├── css/
│   └── style.css           # Global stylesheet
├── js/
│   ├── main.js             # App logic (rendering, filtering, search)
│   └── games.json          # Game data (9 entries)
├── assets/
│   └── images/             # SVG thumbnails and logo
│       ├── logo.svg
│       ├── snake.svg
│       ├── tictactoe.svg
│       ├── clicker.svg
│       ├── pong.svg
│       ├── memory.svg
│       ├── space.svg
│       ├── runner.svg
│       ├── blocks.svg
│       └── mines.svg
└── games/
    ├── snake/index.html      # Cyber Snake
    ├── tictactoe/index.html  # Neon Tic-Tac-Toe
    ├── clicker/index.html    # Cyber Clicker Speed
    ├── pong/index.html       # Hyper Neon Pong
    ├── memory/index.html     # Neural Memory Matrix
    ├── space/index.html      # Space Dodge Odyssey
    ├── runner/index.html     # Synthwave Highway 84
    ├── blocks/index.html     # Tetra Block Matrix
    └── mines/index.html      # Cyber Mine Decryptor
```

---

## 🚀 Run Locally

### Option 1: Node.js (Recommended)

```bash
npx serve .
# or
npx -y http-server . -p 3000 -c-1
```
Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: VS Code Live Server

1. Open the project folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. It will open automatically at `http://127.0.0.1:5500` or `http://localhost:5500`

### Option 3: Python HTTP Server

```bash
python -m http.server 8000
```
Then open **[http://localhost:8000](http://localhost:8000)** in your browser.

> 💡 **Note:** A local server is recommended because the app fetches `js/games.json` via standard `fetch()`.

---

## 🌐 Deploy for Free

### GitHub Pages

1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch** → `main` → `/ (root)`
5. Your site will be live instantly at `https://<username>.github.io/<repo-name>/`

### Netlify

1. Go to [netlify.com](https://www.netlify.com/)
2. Click **Add new site → Deploy manually**
3. Drag and drop your project folder
4. Your site gets a free `.netlify.app` URL with automatic HTTPS

### Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click **New Project → Import** from GitHub
3. Framework preset: **Other**
4. Click **Deploy** — your site gets a free `.vercel.app` URL

---

## 🎮 Games Included

| Game | Type | Difficulty |
|------|------|-----------|
| Cyber Snake | Arcade | Medium |
| Neon Tic-Tac-Toe | Strategy/Puzzle | Easy-Hard |
| Cyber Clicker Speed | Action/Casual | Easy |
| Hyper Neon Pong | Arcade | Medium |
| Neural Memory Matrix | Puzzle | Medium |
| Space Dodge Odyssey | Action | Hard |
| Synthwave Highway 84 | Action/Racing | Medium |
| Tetra Block Matrix | Puzzle/Arcade | Medium |
| Cyber Mine Decryptor | Strategy/Logic | Hard |

## 📝 License

This project is open source. All game code is original. No copyrighted assets are used.
