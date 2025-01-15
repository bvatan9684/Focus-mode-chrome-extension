chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: "OFF" }); // Initialize badge text to "OFF"
  });
  
  const extensions = "https://developer.chrome.com/docs/extensions";
  const webstore = "https://developer.chrome.com/docs/webstore";
  
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
      // Retrieve the current badge text
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Toggle state
      const nextState = prevState === "ON" ? "OFF" : "ON";
  
      // Update the badge text
      await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });
  
      if (nextState === "ON") {
        // Insert the CSS file
        await chrome.scripting.insertCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      } else if (nextState === "OFF") {
        // Remove the CSS file
        await chrome.scripting.removeCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      }
    }
  });
  