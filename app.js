const usuario = "Israel-Medellin-Gonzalez";

// Función para obtener datos del perfil de usuario
function loadUserProfile() {
  fetch(`https://api.github.com/users/${usuario}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("avatarImg").src = data.avatar_url;
      document.getElementById("userName").textContent = data.name || data.login;
      document.getElementById("userBio").textContent = data.bio || "Desarrollador de software";
      document.getElementById("userLocation").textContent = data.location || "Ubicación no disponible";
      document.getElementById("profileLink").href = data.html_url;
    });
}

// Función para obtener y mostrar proyectos
function loadProjects() {
  fetch(`https://api.github.com/users/${usuario}/repos?sort=updated&per_page=6&type=owner&direction=desc`)
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById("projectsContainer");
      contenedor.innerHTML = "";

      data.forEach(repo => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Sin descripción"}</p>
          <div class="project-info">
            <span>${repo.stargazers_count}</span>
            <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
          </div>
        `;
        contenedor.appendChild(card);
      });
    });
}

// Función para obtener y mostrar seguidores
function loadFollowers() {
  fetch(`https://api.github.com/users/${usuario}/followers?per_page=6`)
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById("followersContainer");
      contenedor.innerHTML = "";

      data.forEach(follower => {
        const card = document.createElement("div");
        card.classList.add("follower-card");

        card.innerHTML = `
          <img src="${follower.avatar_url}" alt="${follower.login}" class="follower-avatar">
          <h4>${follower.login}</h4>
          <a href="${follower.html_url}" target="_blank">Ver Perfil</a>
        `;
        contenedor.appendChild(card);
      });
    });
}

// Cargar todo al abrir la página
loadUserProfile();
loadProjects();
loadFollowers();