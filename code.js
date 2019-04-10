var numStars = Math.floor(window.innerWidth/75);
var szs = []; x = []; y = [];
//Initialize stars
for (var i = 0; i < numStars; i++) {
	szs.push(Math.random()*14);
	x.push(Math.random()*(window.innerWidth-20)+10);
	y.push(Math.random()*(window.innerHeight-window.innerHeight*0.35)+10);
}
//Get context
var c=document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx=c.getContext("2d");
ctx.fillStyle="#ffffff";
ctx.strokeStyle="#ffffff";
//Twinkle
var curTwinkle = -1;

twinkleOff = function() {
	curTwinkle = -1;
	setTimeout(twinkleOn,Math.random()*2000);
}
twinkleOn = function() {
	curTwinkle = Math.floor(Math.random()*numStars);
	setTimeout(twinkleOff,200);
}

twinkleOff();

draw = function() {
	drawGradient(ctx);

	drawFalls();

	drawDiamonds();

	drawHalfDome();

	window.requestAnimationFrame(draw);
}

var halfdome = new Image();
halfdome.src = 'halfdome_min.png';


var hd_width = window.innerHeight*2;
var hd_height = window.innerHeight*2;
var xp = -(hd_width-window.innerWidth)/2;
drawHalfDome = function() {
	ctx.drawImage(halfdome,xp,-200,hd_width,hd_height);
}

gR = function(min,max) {
	return (min+Math.floor(Math.random()*(max-min)));
}

// Setup initial falls
var numFalls = Math.floor(window.innerWidth/130);
var fallX = []; var fallY = []; var fallColor = []; var fallsz = [];
var fallSpd = []; var fallMax = [];

var minspd = window.innerHeight/20/50;
var spdup = window.innerHeight/20/50;

var minfallsz = Math.floor(window.innerWidth/70);
var szp = minfallsz*2;

for (var i = 0; i < numFalls; i++) {
	fallX.push(window.innerWidth/numFalls*i + Math.random()*100);
	fallY.push(Math.random()*window.innerHeight);
	fallMax.push(Math.random()*window.innerHeight/2);
	fallsz.push(Math.floor(Math.random()*szp+minfallsz));
	fallSpd.push((Math.random()*spdup+minspd));
	color = [gR(107,181), gR(168,189), 0.4];
	fallColor.push(color);
}

fallDown = function() {
	for (var i = 0; i < numFalls; i++) {
		fallY[i] += fallSpd[i];
		if (fallY[i] > fallMax[i] && fallY[i] < fallMax[i] + 100) {
			fallColor[i][2] = fallColor[i][2] * .9;
		}
		else if (fallY[i] > fallMax[i]) {
			fallX[i] = window.innerWidth/numFalls*i + Math.random()*100;
			fallsz[i] = Math.floor(Math.random()*50+25);
			fallY[i] = -fallsz[i];
			fallSpd[i] = Math.random()*spdup+minspd;
			fallMax[i] = Math.random()*window.innerHeight;
			fallColor[i] = [gR(107,181), gR(168,189), 0.4];
		}
	}
	setTimeout(fallDown,20);
}

fallDown();

drawFalls = function() {
	for (var i = 0; i < numFalls; i++) {

		var color = 'rgba(' + fallColor[i][0] +',120,' + fallColor[i][1] +',' + fallColor[i][2]+ ')';

		drawFall(fallX[i],fallY[i],fallsz[i],color);
	}
}

drawFall = function(x,y,sz,color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x-sz,0);
	ctx.arc(x+y/2,y,sz,Math.PI*3/4,0,true);
	ctx.lineTo(x+sz,0);
	ctx.closePath();
	ctx.fill();
}

drawGradient = function() {
	var grd=ctx.createLinearGradient(0,0,0,window.innerHeight);
	grd.addColorStop(0,"#50578b");
	grd.addColorStop(1,"#a668b0");

	ctx.fillStyle=grd;
	ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
}

drawDiamonds = function() {
	for (var i in szs) {
		if (i!=curTwinkle) {drawDiamond(x[i],y[i],szs[i]);}
	}
}

drawDiamond = function(x,y,sz) {
	// GRADIENT
	var radGrad = ctx.createRadialGradient(x,y,0,x,y,sz*2);
	radGrad.addColorStop(0, "#ffffff");
	radGrad.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle=radGrad;
	ctx.fillRect(x-sz*3,y-sz*3,x+sz*3,y+sz*3);
	// DIAMOND
	ctx.beginPath();
	ctx.moveTo(x,y-sz*1.25);
	ctx.lineTo(x-sz,y);
	ctx.lineTo(x,y+sz*1.25);
	ctx.lineTo(x+sz,y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

window.onload = draw;
