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
  // Преобразовываем JSON-объект в строку JSON
  var jsonString = JSON.stringify(jsonData);
  // Сохраняем строку JSON в хранилище
  chrome.storage.local.set({ myKey: jsonString }, function () {
    console.log("JSON-объект сохранен в хранилище");
  });
});

/*
console.log("hello my extension");

data_collection();

function data_collection() {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      console.log(tab.title);
    });
  });
}

 */