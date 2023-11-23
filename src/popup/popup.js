document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["termList"], (result) => {
    const listElement = document.getElementById("termList");
    if (result.termList && listElement) {
      listElement.value = result.termList;
    }
  });

  document.getElementById("saveButton")?.addEventListener("click", () => {
    var termList = document.getElementById("termList")?.value;

    chrome.storage.sync.set({ termList: termList }, () => {
      window.close();
    });
  });
});
