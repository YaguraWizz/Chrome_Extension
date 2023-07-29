var firstMeaning;

// Вызываем функцию data_collection() при запуске браузера
chrome.runtime.onStartup.addListener(function () {
  data_collection(function (data) {
    firstMeaning = data;
  });
});

chrome.tabs.onCreated.addListener(function (tab) {
  // Вызывайте функцию обновления здесь для обработки открытия новой вкладки
  updateData();
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  // Вызывайте функцию обновления здесь для обработки закрытия вкладки
  updateData();
});

// Функция обновления данных
function updateData() {
  data_collection(function (data) {
    var secondMeaning = data;

    // Сравниваем объекты JSON по равенству
    if (JSON.stringify(firstMeaning) !== JSON.stringify(secondMeaning)) {
      // Вызываем функцию messagesDataCollection()
      messagesDataCollection(secondMeaning);
    } else {
      console.log("изменений нет");
    }
  });
}

// Функция отправки json объекта
function messagesDataCollection(jsonData) {
  var jsonString = JSON.stringify(jsonData);
  // Сохраняем строку JSON в хранилище
  saveDataToStorage(jsonString, function () {
    console.log("JSON-объект сохранен в хранилище");
  });
}

// Функция сохранения данных в хранилище
function saveDataToStorage(jsonData, callback) {
  chrome.storage.local.set({ myKey: jsonData }, function () {
    console.log("JSON-объект сохранен в хранилище");
    // Вызываем колбэк-функцию после сохранения данных
    callback();
  });
}

function data_collection(callback) {
  chrome.tabs.query({}, function (tabs) {
    var pages = []; // Массив для хранения информации о страницах
    var groups = {}; // Объект для хранения информации о группах
    // Проход по каждой вкладке и добавление информации в массив страниц или объект групп
    tabs.forEach(function (tab) {
      if (tab.groupId === -1) {
        // Страница не принадлежит к какой-либо группе
        var page = {
          id: tab.id,
          url: tab.url,
          title: tab.title,
        };
        pages.push(page);
      } else {
        // Страница принадлежит к группе
        var groupId = tab.groupId;
        if (!groups[groupId]) {
          groups[groupId] = [];
        }
        var page = {
          id: tab.id,
          url: tab.url,
          title: tab.title,
        };
        groups[groupId].push(page);
      }
    });
    // JSON-объект, содержащий информацию о страницах и группах
    var jsonData = {
      pages: pages,
      groups: groups,
    };

    console.log(jsonData); // Ваши данные в формате JSON
    // Возврат значения через callback
    callback(jsonData);
  });
}
