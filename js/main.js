/* ==========================================================================
   Can I Be Candid? — shared site behavior
   ========================================================================== */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

function episodeCardHTML(episode) {
  return `
    <article class="episode-card">
      <span class="episode-number">Episode ${episode.id}</span>
      <h3>${episode.title}</h3>
      <p>${episode.description}</p>
      <a class="btn btn-outline" href="episode.html?id=${episode.id}">Listen &amp; Show Notes</a>
    </article>
  `;
}

function renderEpisodeGrid() {
  const grid = document.querySelector("#episode-grid");
  if (!grid || typeof episodesData === "undefined") return;

  const sorted = [...episodesData].sort((a, b) => a.id - b.id);
  grid.innerHTML = sorted.map(episodeCardHTML).join("");
}

function renderSpotlight() {
  const spotlight = document.querySelector("#latest-episode-spotlight");
  if (!spotlight || typeof episodesData === "undefined") return;

  const latest = [...episodesData].sort((a, b) => b.id - a.id)[0];
  if (!latest) return;

  spotlight.innerHTML = `
    <span class="eyebrow">Latest Episode — Episode ${latest.id}</span>
    <h3>${latest.title}</h3>
    <p class="subtitle">${latest.subtitle}</p>
    <p>${latest.description}</p>
    <div class="btn-row">
      <a class="btn btn-gold" href="episode.html?id=${latest.id}">Listen &amp; Show Notes</a>
      <a class="btn btn-outline" href="episodes.html">Browse All Episodes</a>
    </div>
  `;
}

function renderEpisodeDetail() {
  const detail = document.querySelector("#episode-detail");
  if (!detail || typeof episodesData === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const episode = episodesData.find((ep) => ep.id === id);

  if (!episode) {
    detail.innerHTML = `
      <a class="back-link" href="episodes.html">&larr; Back to Episodes</a>
      <h1>Episode Not Found</h1>
      <p>We couldn't find that episode. It may not be published yet.</p>
    `;
    return;
  }

  const questionsHTML = episode.questions.length
    ? `
      <h2>Discussion Questions</h2>
      <ul class="question-list">
        ${episode.questions.map((q) => `<li>${q}</li>`).join("")}
      </ul>
    `
    : "";

  const tensionHTML = episode.tension
    ? `<blockquote class="pull-quote">${episode.tension}</blockquote>`
    : "";

  detail.innerHTML = `
    <a class="back-link" href="episodes.html">&larr; Back to Episodes</a>
    <span class="eyebrow">Episode ${episode.id}</span>
    <h1>${episode.title}</h1>
    <p class="subtitle">${episode.subtitle}</p>
    <p>${episode.description}</p>
    ${tensionHTML}
    ${questionsHTML}
    <div class="btn-row" style="margin-top: 2em;">
      <a class="btn btn-gold" href="${episode.listenLinks.spotify}">Spotify</a>
      <a class="btn btn-outline" href="${episode.listenLinks.apple}">Apple Podcasts</a>
      <a class="btn btn-outline" href="${episode.listenLinks.youtube}">YouTube</a>
    </div>
  `;

  document.title = `${episode.title} — Can I Be Candid?`;
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderEpisodeGrid();
  renderSpotlight();
  renderEpisodeDetail();
});
