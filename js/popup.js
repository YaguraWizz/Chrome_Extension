function processSavedData() {
  // Здесь вы можете получить сохраненные данные
  chrome.storage.local.get("myKey", function (result) {
    var storedJsonString = result.myKey;
    console.log("Получены данные из хранилища:", storedJsonString);
    // Продолжайте обработку данных здесь

    var storedObject = JSON.parse(storedJsonString);
    var listElementFreePages = document.getElementById("listFreePages");
    var listElementGroups = document.getElementById("listGroups");
    listElementFreePages.innerHTML = "";
    listElementGroups.innerHTML = "";

    // Проверяем наличие элементов pages и groups

    if ("groups" in storedObject) {
      for (var groupId in storedObject.groups) {
        var group = storedObject.groups[groupId];
        group.forEach(function (page) {
          var listItem = document.createElement("li");
          var listUrl = document.createElement("a");
          
          listUrl.href = page.geturl;
          listUrl.textContent = page.title;
          listItem.appendChild(listUrl);
          listElementGroups.appendChild(listItem);
        });
      }
    }
    
    if ("pages" in storedObject) {
      storedObject.pages.forEach(function (page) {
        var listItem = document.createElement("li");
        var listUrl = document.createElement("a");

        listUrl.href = page.geturl;
        listUrl.textContent = page.title;
        listItem.appendChild(listUrl);
        listElementFreePages.appendChild(listItem);
      });
    }
    console.log(storedObject);
  });
}

function buttonHandler() {
  // Выполните необходимые действия при нажатии кнопки
  console.log("Кнопка была нажата!");
  processSavedData();
}

// Находим кнопку по идентификатору
var button = document.getElementById("myButton");

// Добавляем обработчик события при нажатии на кнопку
button.addEventListener("click", buttonHandler);
