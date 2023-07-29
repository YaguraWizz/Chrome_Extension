// Регистрируем обработчик изменений
chrome.storage.onChanged.addListener(storageChanged);

// Определяем функцию обработчика изменений хранилища
function storageChanged(changes, areaName) {
  if (areaName === "local") {
    console.log("Произошло изменение в локальном хранилище:", changes);
    chrome.storage.local.get("myKey", function (result) {
      var storedJsonString = result.myKey;

      // Преобразовываем строку JSON обратно в объект
      var storedObject = JSON.parse(storedJsonString);
      var listElement = document.getElementById("titleList");
      // Проходим по элементам данных и добавляем их в список
      storedObject.items.forEach(function (item) {
        var listItem = document.createElement("li");
        listItem.textContent = item;
        listElement.appendChild(listItem);
      });
      console.log(storedObject);
    });
  }
}
