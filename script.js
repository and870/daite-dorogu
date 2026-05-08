 document.addEventListener("DOMContentLoaded", function () {
  // === Табы + popup инфоблоков ===
  const tabs = document.querySelectorAll(".infoheader p:not(.btn-tickets-header)");
  const panels = document.querySelectorAll(".headjs");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupClose = document.getElementById("popupClose");


  // Сброс табов в чёрное состояние
  function resetTabs() {
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });
    panels.forEach(panel => {
      panel.style.display = "none";
    });
  }


  // Изначально — «ничего не выбрано», все табы чёрные
  resetTabs();


  // Открытие popup при клике на таб
  tabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.dataset.target;


      resetTabs();


      this.classList.add("active");


      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = "block";
      }


      popupOverlay.style.display = "flex";
    });
  });


  // Кнопка закрыть popup инфоблоков
  popupClose.addEventListener("click", function () {
    popupOverlay.style.display = "none";
    resetTabs();
  });


  popupOverlay.addEventListener("click", function (e) {
    if (e.target === popupOverlay) {
      popupOverlay.style.display = "none";
      resetTabs();
    }
  });



  // === Второе окно: Покупка билетов (как остальные) ===
  const btnTicketsHeader = document.getElementById("btnTicketsHeader");
  const ticketsPopup = document.getElementById("ticketsPopup");
  const ticketsClose = document.getElementById("ticketsClose");


  btnTicketsHeader.addEventListener("click", function () {
    ticketsPopup.style.display = "flex";
  });


  ticketsClose.addEventListener("click", function () {
    ticketsPopup.style.display = "none";
  });


  ticketsPopup.addEventListener("click", function (e) {
    if (e.target === ticketsPopup) {
      ticketsPopup.style.display = "none";
    }
  });
});