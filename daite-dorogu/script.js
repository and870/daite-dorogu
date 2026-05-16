
document.addEventListener("DOMContentLoaded", function () {
  // === Табы + popup инфоблоков ===
  const tabs = document.querySelectorAll(".infoheader p:not(.btn-tickets-header)");
  const panels = document.querySelectorAll(".headjs");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupClose = document.getElementById("popupClose");

  function resetTabs() {
    tabs.forEach(tab => tab.classList.remove("active"));
    panels.forEach(panel => panel.style.display = "none");
  }

  if (tabs.length > 0 && panels.length > 0) {
    resetTabs();
    tabs.forEach(tab => {
      tab.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.dataset.target;
        resetTabs();
        this.classList.add("active");
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.style.display = "block";
          popupOverlay.style.display = "flex";
        }
      });
    });
  }

  if (popupClose) {
    popupClose.addEventListener("click", function () {
      popupOverlay.style.display = "none";
      resetTabs();
    });
  }

  if (popupOverlay) {
    popupOverlay.addEventListener("click", function (e) {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = "none";
        resetTabs();
      }
    });
  }

  // === Кнопка билетов ===
  const btnTicketsHeader = document.getElementById("btnTicketsHeader");
  const ticketsPopup = document.getElementById("ticketsPopup");
  const ticketsClose = document.getElementById("ticketsClose");

  if (btnTicketsHeader && ticketsPopup) {
    btnTicketsHeader.addEventListener("click", function () {
      ticketsPopup.style.display = "flex";
    });
  }

  if (ticketsClose && ticketsPopup) {
    ticketsClose.addEventListener("click", function () {
      ticketsPopup.style.display = "none";
    });

    ticketsPopup.addEventListener("click", function (e) {
      if (e.target === ticketsPopup) ticketsPopup.style.display = "none";
    });
  }

  // === Альбом с 40 фото (по 10 за раз) ===
  const albumGrid = document.getElementById("albumGrid");
  const albumPagination = document.getElementById("albumPagination");
  const photosPerPage = 10;
  let currentPage = 1;

  const photos = [];
  for (let i = 1; i <= 40; i++) {
    photos.push(`pic/PIC${i}.jpg`); // замени на реальные пути к фото
  }

  function renderAlbum(page) {
    if (!albumGrid) return;
    albumGrid.innerHTML = "";
    const start = (page - 1) * photosPerPage;
    const end = start + photosPerPage;
    const pagePhotos = photos.slice(start, end);

    pagePhotos.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Фото с мотофестиваля";
      img.loading = "lazy"; // отложенная загрузка
      img.onerror = () => {
        img.style.display = "none"; // скрываем битые изображения
      };
      img.addEventListener("click", () => openLightbox(src));
      albumGrid.appendChild(img);
    });
    renderPagination();
  }

  function renderPagination() {
    if (!albumPagination) return;
    albumPagination.innerHTML = "";
    const totalPages = Math.ceil(photos.length / photosPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderAlbum(currentPage);
      });
      albumPagination.appendChild(btn);
    }
  }

  // === Лайтбокс ===
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = src;
      lightbox.style.display = "flex";
      // Показываем прелоадер
      lightboxImg.style.opacity = "0";
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = "1";
      };
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      if (lightbox) lightbox.style.display = "none";
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.style.display = "none";
    });
  }

  // Инициализация альбома
  if (albumGrid) {
    renderAlbum(currentPage);
  }
});