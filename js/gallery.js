let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages) {
    galleryImages.forEach(function(image, index) {
        image.onclick = function() {
            let getElementCss = window.getComputedStyle(image, index);
            let getFullImageUrl = getElementCss.getPropertyValue("background-image");
            let getImageUrlPosition = getFullImageUrl.split("/img/thumbs/");
            let setNewImageUrl = getImageUrlPosition[1].replace('")', '');

            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImageWindow = document.createElement("div");
            container.appendChild(newImageWindow);
            newImageWindow.setAttribute("class", "img-window");
            newImageWindow.setAttribute("onclick", "closeImage()");

            let newImage = document.createElement("img");
            newImageWindow.appendChild(newImage);
            newImage.setAttribute("src", "img/" + setNewImageUrl);
            newImage.setAttribute("id", "current-img");

            newImage.onload = function() {
                let imageWidth = this.width;
                let calcImageToEdge = ((windowWidth - imageWidth) / 2) - 80;

                let newNextButton = document.createElement("a");
                let buttonNextText = document.createTextNode("Next");
                newNextButton.appendChild(buttonNextText);
                container.appendChild(newNextButton);
                newNextButton.setAttribute("class", "img-btn-next");
                newNextButton.setAttribute("onclick", "changeImg(1)");
                newNextButton.style.cssText = "right: " + calcImageToEdge + "px;";

                let newPrevButton = document.createElement("a");
                let buttonPrevText = document.createTextNode("Prev");
                newPrevButton.appendChild(buttonPrevText);
                container.appendChild(newPrevButton);
                newPrevButton.setAttribute("class", "img-btn-prev");
                newPrevButton.setAttribute("onclick", "changeImg(0)");
                newPrevButton.style.cssText = "left: " + calcImageToEdge + "px;";
            } 
        }
    });
}

function closeImage() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDirection) {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImage = document.createElement("img");
    getImgWindow.appendChild(newImage);

    let calcNewImage;
    if(changeDirection === 1) {
        calcNewImage = getLatestOpenedImg + 1;
        if(calcNewImage > galleryImages.length) {
            calcNewImage = 1;
        }
    } else if (changeDirection === 0) {
        calcNewImage = getLatestOpenedImg - 1;
        if(calcNewImage < 1) {
            calcNewImage = galleryImages.length;
        }
    }

    newImage.setAttribute("src", "img/img" + calcNewImage + ".jpg");
    newImage.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImage;

    newImage.onload = function() {
        let imageWidth = this.width;
        let calcImageToEdge = ((windowWidth - imageWidth) / 2) - 80;

        let nextButton = document.querySelector(".img-btn-next");
        nextButton.style.cssText = "right: " + calcImageToEdge + "px;";

        let prevButton = document.querySelector(".img-btn-prev");
        prevButton.style.cssText = "left: " + calcImageToEdge + "px;";
    }
}