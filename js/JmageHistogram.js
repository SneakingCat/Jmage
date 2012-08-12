/*
** Copyright (C) 2012, Patrik Sandahl
** sneakingcatsw@gmail.com
*/
JmageHistogram = function (canvasName) {
    this.canvas          = document.getElementById(canvasName);
    this.context         = this.canvas.getContext('2d');
    this.bins            = 100;
    this.dividend        = 256.0 / this.bins;
    this.canvas.width    = this.bins * 3;
    this.canvas.height   = 100;
};

JmageHistogram.prototype.fromCanvas = function (canvasName) {
    var canvas  = document.getElementById(canvasName);
    var context = canvas.getContext('2d');
    var image   = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels  = image.data;
    var bins    = this.calcBins(pixels);
    this.draw(bins);
};

JmageHistogram.prototype.draw = function (bins) {
    this.context.fillStyle = '#ffffff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var maxValue = this.findMaxValue(bins);
    this.drawHistogram(bins.red, maxValue, 0, '#ff0000');
    this.drawHistogram(bins.green, maxValue, this.bins, '#00ff00');
    this.drawHistogram(bins.blue, maxValue, 2 * this.bins, '#0000ff');
};

JmageHistogram.prototype.drawHistogram = function (bins, maxValue, 
						   startX, color) {
    this.context.beginPath();
    this.context.lineWidth = 1.3;
    this.context.strokeStyle = color;
    for (var i = 0; i < this.bins; ++i) {
	this.context.moveTo(startX + i, this.canvas.height);
	this.context.lineTo(startX + i, this.canvas.height -
			    this.barHeight(bins[i], maxValue));
    }
    this.context.stroke();
};

JmageHistogram.prototype.calcBins = function (pixels) {
    var bins = this.mkEmptyBins();
    for (var i = 0; i < pixels.length; i += 4) {	
	var r = pixels[i];
	var g = pixels[i + 1];
	var b = pixels[i + 2];

	if (r > 0) ++(bins.red[this.findBin(r)]);
	if (g > 0) ++(bins.green[this.findBin(g)]);
	if (b > 0) ++(bins.blue[this.findBin(b)]);
    }
    return bins;
};

JmageHistogram.prototype.findMaxValue = function (bins) {
    var maxValue = 0;
    for (var i = 0; i < this.bins; ++i) {
	if (bins.red[i] > maxValue) maxValue = bins.red[i];
	if (bins.green[i] > maxValue) maxValue = bins.green[i];
	if (bins.blue[i] > maxValue) maxValue = bins.blue[i];
    }
    return maxValue;
};

JmageHistogram.prototype.findBin = function (value) {
    return Math.floor(value / this.dividend);
};

JmageHistogram.prototype.barHeight = function (value, total) {
    return Math.ceil(100 * (value / total));
};

JmageHistogram.prototype.mkEmptyBins = function () {
    var reds   = [];
    var greens = [];
    var blues  = [];
    for (var i = 0; i < this.bins; ++i) {
	reds.push(0);
	greens.push(0);
	blues.push(0);
    }
    return {red: reds, green: greens, blue: blues};
};