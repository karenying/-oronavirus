chrome.storage.local.get(['extensionOn'], function(result) {
    if (result.extensionOn) {
        walk(document.body);
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'local') {
        for (let key in changes) {
            if (key === 'extensionOn') {
                if (changes[key].newValue) {
                    walk(document.body);
                }
            }
        }
    }
});

function walk(node) {
    let child, next;

    switch (node.nodeType) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            changeText(node);
    }
}

function changeText(textNode) {
    let v = textNode.nodeValue;

    v = v.replace(/\bcoronavirus\b/g, "🅱️oronavirus");
    v = v.replace(/\bCoronavirus\b/g, "🅱️oronavirus");
    v = v.replace(/\bCOVID-19\b/g, "🅱️OVID-19");
    v = v.replace(/\bCovid-19\b/g, "🅱️ovid-19");
    v = v.replace(/\bcorona\b/g, "🅱️orona");
    v = v.replace(/\bcovid-19\b/g, "🅱️ovid-19");

    textNode.nodeValue = v;
}