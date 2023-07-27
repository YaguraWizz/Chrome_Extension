//-----------------------
chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.query({}, function (tabs) {
    var groupedPages = [];
    var ungroupedPages = [];
    // Собираем страницы по группам и без группы
    tabs.forEach(function (tab) {
      if (tab.groupId) {
        groupedPages.push(tab.url);
      } else {
        ungroupedPages.push(tab.url);
      }
    });

    // Отправляем данные на страницу popup.html
    console.log("groupedPages size", groupedPages.length);
    console.log("ungroupedPages size", ungroupedPages.length);
    chrome.runtime.sendMessage({
      groupedPages: groupedPages,
      ungroupedPages: ungroupedPages,
    });
  });
});

//стартовое значение
/*
//-----------------------

chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("html/hello.html");
  let tab = await chrome.tabs.create({ url }); // запуск стартового окна

  chrome.storage.sync.get(["showClock"], (result) => {
    if (result.showClock) {
      chrome.action.setBadgeText({ text: "ON" });
    }
  });

  chrome.storage.sync.get(["timer"], (result) => {
    console.log("result", result);
    if (!result.timer) {
      chrome.storage.sync.set({ timer: 1 });
    }
  });
});
// пока не работает тут будут комбинации клавиш для расширения
/*
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.update({}, async (tab) => {
    debugger;
    if (command == "pin-current-tab") {
      chrome.tabs.update({ pinned: !tab.pinned });
    } else if (command == "move-to-first") {
      chrome.tabs.move(tab.id, { index: 0 });
    } else if (command == "move-to-last") {
      const allTabs = await chrome.tabs.query({});// получения массива всех открытых страниц
      chrome.tabs.move(tab.id, { index: allTabs.length - 1 });
    } else if (command == "copy-current-tab") {
      chrome.tabs.duplicate(tab.id);
    }
  });
});
//*//*
//notifications
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("onAlarm", alarm);
  chrome.notifications.create(
    "notification1",
    {
      type: "basic",
      iconUrl: "/icons/alert.png",
      title: "Напоминашка",
      message: "Ахтунг! Пришло время напомнить!",
      buttons: [{ title: "Спасибо" }],
      priority: 0,
    },
    (e) => {
      console.log("Last error:", chrome.runtime.lastError);
    }
  );
});

chrome.notifications.onButtonClicked.addListener(
  async (notificationId, buttonIndex) => {
    console.log({ notificationId, buttonIndex });
  }
);

chrome.notifications.onClicked.addListener(async (notificationId) => {
  chrome.storage.sync.get(["timer"], (result) => {
    if (result.timer) {
      chrome.alarms.create({ delayInMinutes: result.timer });
    }
  });

  chrome.notifications.clear(notificationId);
});


//-----------------------
*/