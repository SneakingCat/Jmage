/*
** Copyright (C) 2012, Patrik Sandahl
** sneakingcatsw@gmail.com
*/
var imageCache = [];
var imageCanvas;
var imageContext;
var imageHistogram;

bodyLoaded = function (imageUrl) {
    imageCanvas  = document.getElementById('image_canvas');
    imageContext = imageCanvas.getContext('2d');

    // At construction of the histogram object, tell its canvas name
    imageHistogram = new JmageHistogram('histogram_canvas');
    setupImageAndHistogram(imageUrl);
};

setupImageAndHistogram = function (imageUrl) {
    var image = imageCache[imageUrl];
    if (image != undefined) {
	showImageAndHistogram(image);
    } else {
	image = new Image();
	image.src = imageUrl;
	imageCache[imageUrl] = image;
	image.onload = function () {
	    showImageAndHistogram(image);
	}
    }
};

showImageAndHistogram = function (image) {
    imageCanvas.height = image.height;
    imageCanvas.width  = image.width;
    imageContext.drawImage(image, 0, 0);

    // At analysis of an image, tell the image's canvas name
    imageHistogram.fromCanvas('image_canvas');
};