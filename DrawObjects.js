class DrawObjects {
    XCoordinates;
    YCoordinates;
    ratioSize;

    prevOuterWidth;
    prevOuterHeight;

    constructor(XCoordinates, YCoordinates, ratioSize = null) {
        this.XCoordinates = XCoordinates;
        this.YCoordinates = YCoordinates;
        this.ratioSize = ratioSize;
    }

    initialization = (names, img = null, labelTextContent = null) => {
        let ratioX = window.outerWidth / window.screen.width;
        let ratioY = window.outerHeight / window.screen.height;
        let objects = this.shiftXY(ratioX, ratioY, names);

        for (const objectsKey in objects) {
            if (Object.hasOwnProperty.call(objects, objectsKey)) {
                let div = document.createElement(objectsKey);

                div.style.position = "absolute";
                div.style.left = objects[objectsKey].x + 'px';
                div.style.top = objects[objectsKey].y + 'px';

                if (img) {
                    let imgDiv = document.createElement('img');
                    imgDiv.src = img.src;
                    imgDiv.onload = () => {
                        imgDiv.height = img.height / this.ratioSize;
                        imgDiv.width = img.width / this.ratioSize;

                        div.append(imgDiv);
                    }
                }

                if(labelTextContent) {
                    let label = document.createElement('label');
                    label.textContent = labelTextContent;

                    let minDivWidth = 150;
                    let minDivHeight = 40;

                    div.style.display = "flex";
                    div.style.justifyContent = "center";
                    div.style.alignItems = "center";

                    div.style.border = "5px solid darkblue";
                    div.style.height = minDivHeight + "px";
                    div.style.width = minDivWidth + "px";

                    div.onmousedown = (event) => {
                        let shiftX = event.clientX - div.getBoundingClientRect().left;
                        let shiftY = event.clientY - div.getBoundingClientRect().top;

                        div.style.position = 'absolute';
                        div.style.zIndex = 1000;

                        let moveAt = (pageX, pageY) => {
                            div.style.left = pageX - shiftX + 'px';
                            div.style.top = pageY - shiftY + 'px';
                            this.XCoordinates = pageX - shiftX;
                            this.YCoordinates = pageY - shiftY;
                        }

                        moveAt(event.pageX, event.pageY);

                        let onMouseMove = (event) => {
                            moveAt(event.pageX, event.pageY);
                        }

                        document.addEventListener('mousemove', onMouseMove);

                        div.onmouseup = () => {
                            document.removeEventListener('mousemove', onMouseMove);
                            div.onmouseup = null;
                        };

                        let onMouseOver = () => {
                            document.removeEventListener('mousemove', onMouseMove);
                        }

                        document.addEventListener('mouseover', onMouseOver);
                    }

                    div.ondragstart = () => {
                        return false;
                    };

                    div.append(label);
                }

                Director.pageHTML.append(div);
            }
        }

        this.prevOuterWidth = window.outerWidth;
        this.prevOuterHeight = window.outerHeight;
    }

    render = (nodeNameStartsWith, names) => {
        let frequency = 100;

        if (Math.abs(this.prevOuterWidth - window.outerWidth) > frequency ||
            Math.abs(this.prevOuterHeight - window.outerHeight) > frequency) {
            let ratioX = window.outerWidth / this.prevOuterWidth;
            let ratioY = window.outerHeight / this.prevOuterHeight;
            let objects = this.shiftXY(ratioX, ratioY, names);

            for (let childNode of Director.pageHTML.childNodes) {
                if(childNode.nodeName.startsWith(nodeNameStartsWith)) {
                    childNode.style.left = objects[childNode.nodeName.toLowerCase()].x + 'px';
                    childNode.style.top = objects[childNode.nodeName.toLowerCase()].y + 'px';
                }
            }

            this.prevOuterWidth = window.outerWidth;
            this.prevOuterHeight = window.outerHeight;
        }
    }

    shiftXY(ratioX, ratioY, names) {
        for (const XCoordinatesKey in this.XCoordinates) {
            this.XCoordinates[XCoordinatesKey] *= ratioX;
        }
        for (const YCoordinatesKey in this.YCoordinates) {
            this.YCoordinates[YCoordinatesKey] *= ratioY;
        }

        let objects = {};
        for (const name of names) {
            objects[name] = {}

            objects[name].x = this.XCoordinates[name];
            objects[name].y = this.YCoordinates[name];
        }

        return objects;
    }
}