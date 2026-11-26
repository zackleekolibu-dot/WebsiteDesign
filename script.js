const carouselElement = document.getElementById("carouselExample");

if (carouselElement) {
  bootstrap.Carousel.getOrCreateInstance(carouselElement, {
    interval: 5000,
    pause: "hover",
    ride: "carousel",
  });
}

const gameList = document.getElementById("game-list");

if (gameList) {
  const games = [
    "Elden Ring", "Cyberpunk 2077", "God of War", "Minecraft",
    "Red Dead Redemption 2", "The Witcher 3", "Hades", "Portal 2",
    "Stardew Valley", "Terraria", "Hollow Knight", "Baldur's Gate 3",
    "Resident Evil 4", "Grand Theft Auto V", "Lies of P", "Alan Wake 2",
    "Resident Evil Village", "Hogwarts Legacy", "Starfield", "Persona 5 Royal",
    "Remnant 2", "Atomic Heart", "Diablo IV", "Dark Souls III",
    "Sekiro", "Final Fantasy XVI", "Tekken 8", "Street Fighter 6",
    "Forza Horizon 5", "Forza Motorsport", "FIFA 25", "NBA 2K25",
    "Marvel's Spider-Man", "Ghost of Tsushima", "Horizon Zero Dawn",
    "It Takes Two", "A Way Out", "Dead by Daylight", "Helldivers 2",
    "Monster Hunter Wilds", "Dragon's Dogma 2", "Palworld",
    "The Last of Us", "Uncharted 4", "Detroit: Become Human",
    "Cities: Skylines II", "No Man's Sky", "Sea of Thieves",
    "The Sims 4", "Phasmophobia"
  ];

  const gamePrices = {
    "Elden Ring": 599000,
    "Cyberpunk 2077": 649000,
    "God of War": 349000,
    "Minecraft": 469000,
    "Red Dead Redemption 2": 639000,
    "The Witcher 3": 259000,
    "Hades": 165000,
    "Portal 2": 85000,
    "Stardew Valley": 149000,
    "Terraria": 80000,
    "Hollow Knight": 123000,
    "Baldur's Gate 3": 799000,
    "Resident Evil 4": 679000,
    "Grand Theft Auto V": 350000,
    "Lies of P": 799000,
    "Alan Wake 2": 749000,
    "Resident Evil Village": 699000,
    "Hogwarts Legacy": 899000,
    "Starfield": 799000,
    "Persona 5 Royal": 749000,
    "Remnant 2": 499000,
    "Atomic Heart": 699000,
    "Diablo IV": 989000,
    "Dark Souls III": 419000,
    "Sekiro": 599000,
    "Final Fantasy XVI": 999000,
    "Tekken 8": 759000,
    "Street Fighter 6": 599000,
    "Forza Horizon 5": 699000,
    "Forza Motorsport": 649000,
    "FIFA 25": 949000,
    "NBA 2K25": 899000,
    "Marvel's Spider-Man": 549000,
    "Ghost of Tsushima": 799000,
    "Horizon Zero Dawn": 399000,
    "It Takes Two": 349000,
    "A Way Out": 199000,
    "Dead by Daylight": 349000,
    "Helldivers 2": 579000,
    "Monster Hunter Wilds": 899000,
    "Dragon's Dogma 2": 799000,
    "Palworld": 249000,
    "The Last of Us": 799000,
    "Uncharted 4": 299000,
    "Detroit: Become Human": 349000,
    "Cities: Skylines II": 599000,
    "No Man's Sky": 499000,
    "Sea of Thieves": 399000,
    "The Sims 4": 799000,
    "Phasmophobia": 179000,
  };

  const marketGames = games
    .map((name) => ({ name, price: gamePrices[name] ?? 399000 }))
    .sort((a, b) => b.price - a.price);

  const formatRupiah = (value) =>
    value === 0 ? "Gratis" : new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const renderGames = (filter = "") => {
    const normalizedFilter = filter.trim().toLowerCase();
    const filteredGames = marketGames.filter((game) =>
      game.name.toLowerCase().includes(normalizedFilter)
    );

    gameList.innerHTML = filteredGames.map((game, index) => `
      <div class="col-md-6 col-lg-4">
        <article class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <h3 class="card-title h5 mb-2">${game.name}</h3>
              <span class="badge text-bg-secondary">#${marketGames.indexOf(game) + 1}</span>
            </div>
            <p class="text-primary fw-bold fs-5 mb-3">${formatRupiah(game.price)}</p>
            <div class="form-check mt-auto">
              <input class="form-check-input" type="checkbox" name="game" value="${game.name}" id="game-${index}">
              <label class="form-check-label" for="game-${index}">
                Pilih game ini
              </label>
            </div>
          </div>
        </article>
      </div>
    `).join("");
  };

  renderGames();

  document.getElementById("game-search").addEventListener("input", (event) => {
    renderGames(event.target.value);
  });

  document.getElementById("game-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedNames = Array.from(
      event.currentTarget.querySelectorAll('input[name="game"]:checked'),
      (input) => input.value
    );

    if (selectedNames.length === 0) {
      alert("Pilih minimal satu game.");
      return;
    }

    const selectedGames = selectedNames
      .map((name) => marketGames.find((game) => game.name === name))
      .filter(Boolean);
    const totalPrice = selectedGames.reduce((total, game) => total + game.price, 0);

    document.getElementById("purchase-list").innerHTML = `
      <ul class="list-group mb-3">
        ${selectedGames.map((game) => `
          <li class="list-group-item d-flex justify-content-between align-items-center gap-3">
            <span>${game.name}</span>
            <strong class="text-primary text-nowrap">${formatRupiah(game.price)}</strong>
          </li>
        `).join("")}
      </ul>
      <div class="d-flex justify-content-between border-top pt-3">
        <strong>Total</strong>
        <strong class="text-primary">${formatRupiah(totalPrice)}</strong>
      </div>
    `;

    bootstrap.Modal.getOrCreateInstance(
      document.getElementById("purchase-modal")
    ).show();
  });

  document.getElementById("confirm-purchase").addEventListener("click", () => {
    const modalElement = document.getElementById("purchase-modal");
    bootstrap.Modal.getInstance(modalElement)?.hide();

    const selectedNames = Array.from(
      document.querySelectorAll('#game-form input[name="game"]:checked'),
      (input) => input.value
    );
    const selectedGames = selectedNames
      .map((name) => marketGames.find((game) => game.name === name))
      .filter(Boolean);

    localStorage.setItem("leonix-selected-games", JSON.stringify(selectedGames));
    document.getElementById("game-form").reset();
  });
}

const sellForm = document.getElementById("sell-form");

if (sellForm) {
  const sellGame = document.getElementById("sell-game");
  const sellPrice = document.getElementById("sell-price");
  const selectedGamesElement = document.getElementById("selected-games");

  let selectedGames = [];
  try {
    selectedGames = JSON.parse(localStorage.getItem("leonix-selected-games") || "[]");
  } catch {
    selectedGames = [];
  }

  const formatRupiah = (value) =>
    value === 0 ? "Gratis" : new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  if (selectedGames.length > 0) {
    sellGame.innerHTML = `
      <option value="">Pilih game</option>
      ${selectedGames.map((game, index) => `
        <option value="${index}">${game.name}</option>
      `).join("")}
    `;

    selectedGamesElement.innerHTML = `
      <ul class="list-group">
        ${selectedGames.map((game) => `
          <li class="list-group-item d-flex justify-content-between gap-2">
            <span>${game.name}</span>
            <strong class="text-primary text-nowrap">${formatRupiah(game.price)}</strong>
          </li>
        `).join("")}
      </ul>
    `;
  } else {
    sellGame.innerHTML = '<option value="">Belum ada game dipilih</option>';
    selectedGamesElement.innerHTML =
      '<p class="text-secondary mb-0">Belum ada game yang dipilih dari halaman beli.</p>';
  }

  sellGame.addEventListener("change", () => {
    const game = selectedGames[Number(sellGame.value)];
    sellPrice.value = game ? game.price : "";
  });

  sellForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedIndex = Number(sellGame.value);
    const game = selectedGames[selectedIndex];
    const sellerName = document.getElementById("sell-name").value.trim();
    const price = Number(sellPrice.value);
    const description = document.getElementById("sell-description").value.trim();
    const alertElement = document.getElementById("sell-alert");

    if (!game || !sellerName || price < 1000) {
      alertElement.className = "alert alert-danger mt-3 mb-0";
      alertElement.textContent = "Lengkapi pilihan game, nama penjual, dan harga.";
      return;
    }

    const listing = {
      name: game.name,
      seller: sellerName,
      price,
      description,
      createdAt: new Date().toISOString(),
    };
    let existingListings = [];
    try {
      existingListings = JSON.parse(
        localStorage.getItem("leonix-sell-listings") || "[]"
      );
    } catch {
      existingListings = [];
    }
    existingListings.unshift(listing);
    localStorage.setItem("leonix-sell-listings", JSON.stringify(existingListings));

    selectedGames.splice(selectedIndex, 1);
    localStorage.setItem("leonix-selected-games", JSON.stringify(selectedGames));

    if (selectedGames.length > 0) {
      sellGame.innerHTML = `
        <option value="">Pilih game</option>
        ${selectedGames.map((item, index) => `
          <option value="${index}">${item.name}</option>
        `).join("")}
      `;
      selectedGamesElement.innerHTML = `
        <ul class="list-group">
          ${selectedGames.map((item) => `
            <li class="list-group-item d-flex justify-content-between gap-2">
              <span>${item.name}</span>
              <strong class="text-primary text-nowrap">${formatRupiah(item.price)}</strong>
            </li>
          `).join("")}
        </ul>
      `;
    } else {
      sellGame.innerHTML = '<option value="">Belum ada game dipilih</option>';
      selectedGamesElement.innerHTML =
        '<p class="text-secondary mb-0">Belum ada game yang dipilih dari halaman beli.</p>';
    }

    alertElement.className = "alert alert-success mt-3 mb-0";
    alertElement.textContent = `${game.name} berhasil ditambahkan untuk dijual.`;
    sellForm.reset();
  });
}