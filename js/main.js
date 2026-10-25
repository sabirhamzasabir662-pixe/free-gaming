/* ============================================
   FREE GAMING – Main JavaScript
   Handles: game loading, filtering, sorting,
   search, navbar, and dynamic rendering
   ============================================ */

(function () {
  'use strict';

  /* ---------- State ---------- */
  let allGames = [];
  let activeFilter = 'All';
  let activeSort = 'newest';
  let searchQuery = '';

  /* ---------- DOM References ---------- */
  const gamesGrid = document.getElementById('gamesGrid');
  const filterChips = document.getElementById('filterChips');
  const sortSelect = document.getElementById('sortSelect');
  const searchBar = document.getElementById('searchBar');
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  /* ---------- Fetch Games ---------- */
  async function loadGames() {
    try {
      const res = await fetch('js/games.json');
      allGames = await res.json();
      renderGames();
    } catch (err) {
      console.error('Failed to load games:', err);
      if (gamesGrid) {
        gamesGrid.innerHTML = `
          <div class="no-results">
            <h3>Unable to load games</h3>
            <p>Please make sure games.json exists and the server is running.</p>
          </div>`;
      }
    }
  }

  /* ---------- Filter & Sort Logic ---------- */
  function getFilteredGames() {
    let games = [...allGames];

    // Filter by tag/category
    if (activeFilter !== 'All') {
      games = games.filter(g =>
        g.tags.includes(activeFilter) ||
        g.category === activeFilter
      );
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      games = games.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.developer.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (activeSort === 'newest') {
      games.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (activeSort === 'toprated') {
      games.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }

    return games;
  }

  /* ---------- Render Star Rating ---------- */
  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half) stars += '★';
    return stars;
  }

  /* ---------- Render Single Card ---------- */
  function createCard(game) {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.setAttribute('role', 'listitem');

    const accentColor = game.accentColor || '#c084fc';
    const accentGlow = game.accentGlow || 'rgba(192, 132, 252, 0.45)';

    card.innerHTML = `
      <!-- Thumbnail -->
      <div class="card-thumb">
        <img src="${game.thumbnail}" alt="${game.title} thumbnail" loading="lazy" width="640" height="360">
        ${game.isNew ? '<span class="badge-new">NEW</span>' : ''}
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <!-- Title + Rating -->
        <div class="card-title-row">
          <h3 class="card-title" style="color: ${accentColor}">${game.title}</h3>
          <div class="card-rating">
            <span class="stars">${renderStars(game.rating)}</span>
            <span>${game.rating}</span>
            <span>(${game.reviews.toLocaleString()})</span>
          </div>
        </div>

        <!-- Developer -->
        <p class="card-developer">Developed by ${game.developer}</p>

        <!-- Description -->
        <p class="card-desc">${game.description}</p>

        <!-- Info Row -->
        <div class="card-info">
          <span><span class="info-icon">🎮</span> ${game.mode}</span>
          <span><span class="info-icon">📊</span> ${game.difficulty}</span>
          <span><span class="info-icon">⏱</span> ${game.playTime}</span>
        </div>

        <!-- Tags -->
        <div class="card-tags">
          ${game.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>

        <!-- Bottom Row -->
        <div class="card-bottom">
          <div class="status-dot">
            <span class="dot ${game.isOnline ? '' : 'offline'}"></span>
            ${game.isOnline ? 'Online' : 'Offline'}
          </div>
          <a href="game.html?id=${game.id}" class="btn-play" aria-label="Play ${game.title}">
            <span class="play-icon">▶</span> Play
          </a>
        </div>
      </div>
    `;

    // Custom glow color on hover
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 30px ${accentGlow}`;
      card.style.borderColor = accentColor + '40';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
      card.style.borderColor = '';
    });

    return card;
  }

  /* ---------- Render Submit Card ---------- */
  function createSubmitCard() {
    const card = document.createElement('div');
    card.className = 'submit-card';
    card.innerHTML = `
      <div class="plus-icon">+</div>
      <h3>Submit Your Game</h3>
      <p>Have a cool browser game? Share it with the community!</p>
    `;
    card.addEventListener('click', () => {
      alert('Game submission coming soon! Stay tuned.');
    });
    return card;
  }

  /* ---------- Render All Games ---------- */
  function renderGames() {
    if (!gamesGrid) return;

    gamesGrid.innerHTML = '';
    const games = getFilteredGames();

    if (games.length === 0) {
      gamesGrid.innerHTML = `
        <div class="no-results">
          <h3>No games found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>`;
      return;
    }

    games.forEach(game => {
      gamesGrid.appendChild(createCard(game));
    });

    // Add submit card at the end
    gamesGrid.appendChild(createSubmitCard());
  }

  /* ---------- Build Filter Chips ---------- */
  function initFilters() {
    if (!filterChips) return;

    const categories = ['All', 'Action', 'Arcade', 'Puzzle', 'Strategy', 'Multiplayer'];
    filterChips.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `chip ${cat === activeFilter ? 'active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        activeFilter = cat;
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        renderGames();
      });
      filterChips.appendChild(btn);
    });
  }

  /* ---------- Sorting ---------- */
  function initSort() {
    if (!sortSelect) return;
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderGames();
    });
  }

  /* ---------- Search ---------- */
  function initSearch() {
    if (!searchBar) return;

    let debounceTimer;
    searchBar.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = searchBar.value;
        renderGames();
      }, 250);
    });
  }

  /* ---------- Navbar Scroll Effect ---------- */
  function initNavbar() {
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Mobile menu toggle
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.innerHTML = isOpen ? '✕' : '☰';
      });

      // Close menu on link click (mobile)
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          menuToggle.innerHTML = '☰';
        });
      });
    }
  }

  /* ---------- Game Page Logic ---------- */
  function initGamePage() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('id');
    if (!gameId) return;

    fetch('js/games.json')
      .then(res => res.json())
      .then(games => {
        const game = games.find(g => g.id === gameId);
        if (!game) {
          document.querySelector('.game-page-wrapper').innerHTML = `
            <a href="index.html" class="game-back-link">← Back to Games</a>
            <div class="no-results"><h3>Game not found</h3><p>This game doesn't exist.</p></div>`;
          return;
        }

        // Set page title
        document.title = `${game.title} – Free Gaming`;

        // Populate the game page
        const iframe = document.getElementById('gameIframe');
        const gameTitle = document.getElementById('gameTitle');
        const gameDev = document.getElementById('gameDev');
        const gameDesc = document.getElementById('gameDesc');
        const gameMode = document.getElementById('gameMode');
        const gameDiff = document.getElementById('gameDiff');
        const gameTime = document.getElementById('gameTime');
        const gameRating = document.getElementById('gameRating');
        const gameTags = document.getElementById('gameTags');
        const gameControls = document.getElementById('gameControls');

        if (iframe) iframe.src = game.path;
        if (gameTitle) {
          gameTitle.textContent = game.title;
          gameTitle.style.color = game.accentColor;
        }
        if (gameDev) gameDev.textContent = `Developed by ${game.developer}`;
        if (gameDesc) gameDesc.textContent = game.description;
        if (gameMode) gameMode.textContent = game.mode;
        if (gameDiff) gameDiff.textContent = game.difficulty;
        if (gameTime) gameTime.textContent = game.playTime;
        if (gameRating) gameRating.textContent = `${renderStars(game.rating)} ${game.rating} (${game.reviews.toLocaleString()} reviews)`;
        if (gameTags) gameTags.innerHTML = game.tags.map(t => `<span class="tag">${t}</span>`).join('');
        if (gameControls) gameControls.textContent = game.controls || 'See in-game instructions.';

        // Fullscreen button
        const fsBtn = document.getElementById('fullscreenBtn');
        if (fsBtn && iframe) {
          fsBtn.addEventListener('click', () => {
            if (iframe.requestFullscreen) iframe.requestFullscreen();
            else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
            else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
          });
        }
      })
      .catch(err => {
        console.error('Failed to load game data:', err);
      });
  }

  /* ---------- URL Query Parameters (Category & Sort) ---------- */
  function applyQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const sort = params.get('sort');

    if (cat) {
      const valid = ['All', 'Action', 'Arcade', 'Puzzle', 'Strategy', 'Multiplayer'];
      const match = valid.find(c => c.toLowerCase() === cat.toLowerCase());
      if (match) {
        activeFilter = match;
        // update chips UI
        document.querySelectorAll('.chip').forEach(c => {
          c.classList.toggle('active', c.textContent.trim().toLowerCase() === match.toLowerCase());
        });
      }
    }

    if (sort) {
      if (sort.toLowerCase() === 'toprated' || sort.toLowerCase() === 'rating') {
        activeSort = 'toprated';
      } else if (sort.toLowerCase() === 'newest') {
        activeSort = 'newest';
      }
      if (sortSelect) sortSelect.value = activeSort;
    }
  }

  function initFooterCategoryLinks() {
    // Intercept clicks on links with category/sort if already on the portal page
    document.querySelectorAll('a[href*="category="], a[href*="sort="]').forEach(link => {
      link.addEventListener('click', (e) => {
        const isPortalPage = !window.location.pathname.includes('game.html') &&
                             !window.location.pathname.includes('about.html') &&
                             !window.location.pathname.includes('contact.html') &&
                             !window.location.pathname.includes('privacy.html') &&
                             !window.location.pathname.includes('terms.html');
        if (isPortalPage && gamesGrid) {
          try {
            const url = new URL(link.href, window.location.origin);
            const cat = url.searchParams.get('category');
            const sort = url.searchParams.get('sort');

            if (cat || sort) {
              e.preventDefault();
              window.history.pushState({}, '', link.href);
              applyQueryParams();
              renderGames();

              const targetSection = document.getElementById('games-section');
              if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
          } catch (err) {
            // fallback to standard navigation
          }
        }
      });
    });

    window.addEventListener('popstate', () => {
      applyQueryParams();
      renderGames();
    });
  }

  /* ---------- Initialization ---------- */
  function init() {
    initNavbar();

    // Determine which page we are on
    const isGamePage = window.location.pathname.includes('game.html');

    if (isGamePage) {
      initGamePage();
    } else if (gamesGrid) {
      initFilters();
      initSort();
      initSearch();
      applyQueryParams();
      loadGames();
    }

    initFooterCategoryLinks();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
