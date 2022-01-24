let p
let p2


function setup() 
{
	createCanvas(1000, 1000);
	background(100);
	p = new Pendulum(width/2, height/2, random(100,200), random(0,TWO_PI), random(-0.3,0.2), color(230), 1);
	p2 = new Pendulum(p.endOfLineX, p.endOfLineY, random(50,300), random(0,TWO_PI), random(-0.3,0.2), color(230), 1);
	p.print();
	p2.print();
}

function draw()
{
	for (let i = 0; i < 1000; i++)
	{
		p.update();
		p2.x = p.endOfLineX
		p2.y = p.endOfLineY
		p2.update();
		p.show();
		p2.show();

		p2.trace();
	}
}

class Pendulum
{
	constructor(x, y, length, angle, speed, color, gravity)
	{
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

	update()
	{
		this.acc = (this.gravity / this.length) * cos(this.angle); 
		this.speed += this.acc;
		this.angle += this.speed;
		this.endOfLineX = this.x + this.length * cos(this.angle);
		this.endOfLineY = this.y + this.length * sin(this.angle);
	}

	show()
	{
		//stroke(this.color);
		//line(this.x, this.y, this.endOfLineX, this.endOfLineY);
	}

	trace()
	{
		stroke(this.color);
		strokeWeight(2)
		point(this.endOfLineX, this.endOfLineY);
	}
}

