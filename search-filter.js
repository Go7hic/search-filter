document.addEventListener("DOMContentLoaded", function() {
    "use strict"
    var style = "" + "<style>" +
        "input.search-filter {" +"-webkit-tap-highlight-color: transparent;" + "}" +
        ".search-filter .hidden {" +"opacity: 0;" + "pointer-events: none;" + "}" +
        ".search-filter > * {" + "position: absolute;" + "transition: .5s;" + "}" +
        "</style>"

    document.head.insertAdjacentHTML("beforeend", style)
    var items = document.querySelectorAll(".search-filter > *")
    var itemHeight = items[0].offsetHeight
    var texts = []
    var i = -1
    var len = items.length
    var transform = "transform" in document.body.style ? "transform" : "webkitTransform"

    while (++i < len) {
        texts.push(items[i].textContent.trim())
        items[i].style[transform] = "translateY(" + i * itemHeight + "px)"
    }

    document.querySelector("input.search-filter").addEventListener("input", function() {
        // 忽略大小写
        var re = new RegExp(this.value, "i")
        texts.forEach(function(element, index) {
            if (re.test(element)) {
                // classList ie9+
                items[index].classList.remove("hidden")
            } else {
                items[index].classList.add("hidden")
            }
            var i = -1
            var position = 0
            while (++i < len) {
                if (items[i].className != "hidden") {
                    items[i].style[transform] = "translateY(" + position++ * itemHeight + "px)"
                }
            }
        })
    })
})
