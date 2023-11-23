let body = "";
let message = "";

const run = () => {
  body = document.documentElement.innerHTML.toLowerCase();

  chrome.storage.sync.get(["termList"], function (result) {
    const terms = (result.termList || "")
      .split("\n")
      .map((term) => term.trim());

    const filtered = terms.filter((term) =>
      new RegExp(`\\b${term}\\b`).test(body)
    );

    if (filtered.length) {
      message = `Found the following terms on your page:\n\n${filtered
        .sort()
        .join("\n")}`;
      openModal(message);
    } else {
      message = "";
      closeModal();
    }
  });
};

const openModal = (message) => {
  closeModal();
  const modal = document.createElement("div");

  modal.className = "term-list-modal";
  modal.style.position = "fixed";
  modal.style.top = ".5rem";
  modal.style.right = ".5rem";
  modal.style.zIndex = "99999999999";
  modal.style.backgroundColor = "#900";
  modal.style.padding = ".5rem";
  modal.style.borderRadius = ".5rem";
  modal.style.opacity = ".75";
  modal.style.fontFamily = "arial";
  modal.style.fontSize = ".75rem";
  modal.style.maxWidth = "30rem";
  modal.style.color = "#fff";
  modal.innerText = message;

  document.body.appendChild(modal);
};

const closeModal = () => {
  const modal = document.querySelector(".term-list-modal");

  if (!modal) {
    return;
  }

  document.body.removeChild(modal);
};

setInterval(run, 200);
