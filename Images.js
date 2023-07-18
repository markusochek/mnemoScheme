class Images {
    static objects = {
        boiler: new Image(),
    };

    static {
        Images.objects.boiler.src = 'boiler.png';
        for (const objectKey in Images.objects) {
            Images.objects[objectKey].onload = () => {++Images.loadImagesIndex};
        }
    }
    static loadImagesIndex = 0;

    static loadImages() {
        return Images.loadImagesIndex === Object.keys(Images.objects).length;
    }
}