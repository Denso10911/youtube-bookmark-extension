chrome.tabs.onUpdated.addListener(async tabId => {
  const currentTab = await chrome.tabs.get(tabId)

  if (currentTab.url && currentTab.url.includes("youtube.com/watch")) {
    const queryParameters = currentTab.url.split("?")[1]
    const urlParameters = new URLSearchParams(queryParameters)

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    })
  }
})
