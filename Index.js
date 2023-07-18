let XCoordinates = {
    boiler1: window.screen.width * 2/7,
    boiler2: window.screen.width * 3/7,
    boiler3: window.screen.width * 4/7}
let YCoordinates = {
    boiler1: window.screen.height    /3,
    boiler2: window.screen.height    /3,
    boiler3: window.screen.height    /3}
let ratioSize = 10;
let drawBoilers = new DrawObjects(XCoordinates, YCoordinates, ratioSize);

let interval = setInterval(() => {
    if (Images.loadImages()) {
        drawBoilers.initialization(["boiler1", "boiler2", "boiler3"], Images.objects.boiler);
        clearInterval(interval);
    }
}, 100, 0);

XCoordinates = {label1: 500}
YCoordinates = {label1: 500}
let drawLabels = new DrawObjects(XCoordinates, YCoordinates);

drawLabels.initialization(["label1"], null, "давление: ")


window.onresize = () => {
    drawBoilers.render("BOILER", ["boiler1", "boiler2", "boiler3"]);
    drawLabels.render("LABEL", ["label1"]);}

document.body.append(Director.pageHTML);
