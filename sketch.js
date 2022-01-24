let p
let p2

/*
x: 500 y: 500 length: 186.6770285725225 angle: 1.0364894907855375 speed: -0.13909229734742362 color: rgba(230,230,230,1) gravity: 1 acc: 0.002727944694915964 sketch.js:48:11
x: 595.0642705660271 y: 660.6583252073032 length: 120.7626351630205 angle: 1.49996185070072 speed: 0.16518556738121926 color: rgba(230,230,230,1) gravity: 1 acc: 0.0005860691533888136 sketch.js:48:11

x: 500 y: 500 length: 131.55895565244296 angle: 2.5231282830849047 speed: -0.2903933960296791 color: rgba(230,230,230,1) gravity: 1 acc: -0.006193191085886795 sketch.js:52:11
x: 392.8097424066044 y: 576.2758643964324 length: 109.58420598901503 angle: 0.9259806016121659 speed: -0.2481837258791892 color: rgba(230,230,230,1) gravity: 1 acc: 0.005484833958682709

x: 500 y: 500 length: 168.14553645609215 angle: 5.479030092170074 speed: -0.296418744530569 color: rgba(182,188,132,0.39215686274509803) gravity: 1 acc: 0.00412571126867233 sketch.js:50:11
x: 616.6459105424799 y: 378.89404232729595 length: 156.83378891186965 angle: 5.902317935925228 speed: -0.09255428634608254 color: rgba(128,179,182,0.39215686274509803) gravity: 1 acc: 0.005919276496299168
*/

function setup() {
	createCanvas(1000, 1000);
	background(100);
	p = new Pendulum(width / 2, height / 2, random(100, 200), random(0, TWO_PI), random(-0.3, 0.2), color(182, 188, 132, 100), 1);
	p2 = new Pendulum(p.endOfLineX, p.endOfLineY, random(50, 300), random(0, TWO_PI), random(-0.3, 0.2), color(128, 179, 182, 100), 1);
	p.print();
	p2.print();
}

function draw() {
	for (let i = 0; i < 1000; i++) {
		p.update();
		p2.x = p.endOfLineX
		p2.y = p.endOfLineY
		p2.update();
		p.show();
		p2.show();
		p2.trace();
	}
}

class Pendulum {
	constructor(x, y, length, angle, speed, color, gravity) {
		this.x = x;
		this.y = y;
		this.length = length;
		this.angle = angle;
		this.speed = speed;
		this.color = color;
		this.gravity = gravity;
		this.acc = (this.gravity / this.length) * cos(this.angle);
		this.endOfLineX = this.x + this.length * cos(this.angle);
		this.endOfLineY = this.y + this.length * sin(this.angle);
	}

	// Print all params with param names
	print() {
		console.log("x: " + this.x + " y: " + this.y + " length: " + this.length + " angle: " + this.angle + " speed: " + this.speed + " color: " + this.color + " gravity: " + this.gravity + " acc: " + this.acc);
	}

	update() {
		this.acc = (this.gravity / this.length) * cos(this.angle);
		this.speed += this.acc;
		this.angle += this.speed;
		this.endOfLineX = this.x + this.length * cos(this.angle);
		this.endOfLineY = this.y + this.length * sin(this.angle);
	}

	show() {
		//stroke(this.color);
		//line(this.x, this.y, this.endOfLineX, this.endOfLineY);
	}

	trace() {
		stroke(this.color);
		strokeWeight(2)
		point(this.endOfLineX, this.endOfLineY);
	}
}

