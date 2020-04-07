document.addEventListener('DOMContentLoaded', function () {
    let checkbox = document.getElementsByName('apply')[0];

    chrome.storage.local.get(['extensionOn'], function(result) {
        checkbox.checked = result.extensionOn;
    });

    checkbox.onclick = function () {
        chrome.storage.local.set({'extensionOn': checkbox.checked}, function() {
            let value = checkbox.checked ? "on" : "off";
            console.log("Extension turned " + value + ".");
        });
    }

}, false);