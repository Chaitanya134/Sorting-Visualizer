const numberElement = document.getElementById("no-of-elements");
const sortContainer = document.getElementById("sort-container");
const shuffleBtn = document.getElementById("shuffle-btn");

function initApp() {
    addElements(numberElement.value, 0);
}

initApp();

function getSortingElements() {
    return sortContainer.querySelectorAll(".sort-element");
}

function getCountOfElements() {
    return getSortingElements().length;
}

numberElement.addEventListener("change", (e) => {
    const noOfElements = parseInt(e.target.value);
    const currentTotalElements = getCountOfElements();
    if (noOfElements > currentTotalElements) {
        // add more elements
        addElements(noOfElements - currentTotalElements, currentTotalElements);
    } else {
        // remove elements
        removeElements(currentTotalElements - noOfElements);
    }
})

function addElements(count, totalElements) {
    for (let i = 1; i <= count; i++) {
        const sortElement = document.createElement("div");
        sortElement.className = "sort-element";
        sortElement.setAttribute("value", totalElements + i);
        sortElement.style.height = (totalElements + i) + "%";
        sortContainer.appendChild(sortElement);
    }
    shuffle();
}

function removeElements(count) {
    while (count--) {
        const sortElements = [...getSortingElements()];
        const maxValueElement = sortElements.reduce((maxElement, element) => {
            if (parseInt(element.getAttribute("value")) > parseInt(maxElement?.getAttribute("value") ?? 0)) {
                return element;
            }

            return maxElement;
        }, null);
        maxValueElement.remove();
    }
}

shuffleBtn.addEventListener("click", shuffle);

function shuffle() {
    const sortingElements = getSortingElements();
    let currentIndex = sortingElements.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        swapElements(currentIndex, randomIndex);
    }

    return sortingElements;
}

function swapElements(index1, index2) {
    if (index1 === index2)
        return

    if (index1 > index2) {
        const temp = index1
        index1 = index2
        index2 = temp
    }

    const { [index1]: element1, [index2]: element2 } = sortContainer.childNodes

    if (index2 === index1 + 1) {
        sortContainer.insertBefore(element2, element1)
    } else {
        const reference = element2.nextSibling
        sortContainer.replaceChild(element2, element1)
        sortContainer.insertBefore(element1, reference)
    }
}