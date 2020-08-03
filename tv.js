// ==UserScript==
// @name     tv.mail.ru clipboard
// @version  1
// @grant    GM.setClipboard
// ==/UserScript==

if (window.location.href.indexOf('tv.mail.ru') !== -1) {

    const textToClipboard = function (text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    };

    document.querySelector('div[data-view="ScheduleForm"]').addEventListener('DOMSubtreeModified', function() {
        document.querySelectorAll(".p-channels__item").forEach(function(item) {
            item.addEventListener("click", function(event) {
                let channel = this.querySelector(".p-programms");
                let channelItems = channel.querySelectorAll(".p-programms__item");

                let itemsArray = [];
                let dateRange = [
                    "22:", "23:", "00:", "01:", "02:", "03:", "04:", "05:"
                ];

                channelItems.forEach(function(item) {
                    let toAdd = true;
                    dateRange.forEach(function(dateRangeItem) {
                        if (item.getAttribute('data-start').indexOf(dateRangeItem) !== -1) {
                            toAdd = false
                        }
                    });
                    if (toAdd) {
                        itemsArray.push(item)
                    }
                })

                let dataString = "";
                itemsArray.forEach(function(item) {
                    
                  	Array.from(item.querySelector(".p-programms__item__inner").children).forEach(function(itemData) {
                        if (itemData.getAttribute('class') === "p-programms__item__time") {
                            dataString += itemData.innerText + " "
                        };
                        if (itemData.getAttribute('class') === "p-programms__item__name") {
                            dataString += itemData.innerText + "\n"
                        }; 
                    })
                });

                GM.setClipboard(dataString);
            })
        })
    })

}
