
/*
x: 500 y: 500 length: 186.6770285725225 angle: 1.0364894907855375 speed: -0.13909229734742362 color: rgba(230,230,230,1) gravity: 1 acc: 0.002727944694915964 sketch.js:48:11
x: 595.0642705660271 y: 660.6583252073032 length: 120.7626351630205 angle: 1.49996185070072 speed: 0.16518556738121926 color: rgba(230,230,230,1) gravity: 1 acc: 0.0005860691533888136 sketch.js:48:11

x: 500 y: 500 length: 131.55895565244296 angle: 2.5231282830849047 speed: -0.2903933960296791 color: rgba(230,230,230,1) gravity: 1 acc: -0.006193191085886795 sketch.js:52:11
x: 392.8097424066044 y: 576.2758643964324 length: 109.58420598901503 angle: 0.9259806016121659 speed: -0.2481837258791892 color: rgba(230,230,230,1) gravity: 1 acc: 0.005484833958682709

x: 500 y: 500 length: 168.14553645609215 angle: 5.479030092170074 speed: -0.296418744530569 color: rgba(182,188,132,0.39215686274509803) gravity: 1 acc: 0.00412571126867233 sketch.js:50:11
x: 616.6459105424799 y: 378.89404232729595 length: 156.83378891186965 angle: 5.902317935925228 speed: -0.09255428634608254 color: rgba(128,179,182,0.39215686274509803) gravity: 1 acc: 0.005919276496299168
*/
let pd
let pds = []
let numPds = 9
let s = 1200
function setup() {
	createCanvas(s, s);
	background(200);

	addNoiseToCanvas2();

	for (let i = 0; i < numPds; i++) {gi
		pds.push(createRandomDP())
	} 
}


function createRandomDP() {
	let p = new Pendulum(0,0, random(10, 100), random(0, TWO_PI), random(0.1, 0.2), color(255), 1);
	let p2 = new Pendulum(p.endOfLineX, p.endOfLineY, random(50, 150), random(0, TWO_PI), random(0.1, 0.2), LabColor.RandomLabColor().getRGB(), 1);
	return new DoublePendulum(p, p2);
}

function draw() {
	// For each pd in pds
	translate(200,200)

	for (let i = 0; i < pds.length; i++) {
		// arrange pds in grid x,y

		let rowlen = Math.sqrt(numPds)
		push()
		let x = i % rowlen;
		let y = floor(i / rowlen);
		let xPos = (x) * (s/rowlen);
		let yPos = (y) * (s/rowlen);
		translate(xPos, yPos);

		let pd = pds[i];
		pd.runIters(250)
		pop()


	}
}

function getRandomColor() {
	let r = random(0, 255);
	let g = random(0, 255);
	let b = random(0, 255);
	let a = random(0, 255);
	return color(r, g, b, a);
}

class DoublePendulum {
	constructor(p1,p2) {
		this.p1 = p1;
		this.p2 = p2;
		this.p1.print()
		this.p2.print()
	}
	update() {
		this.p1.update();
		this.p2.x = this.p1.endOfLineX
		this.p2.y = this.p1.endOfLineY
		this.p2.update();
	}

	trace() {
		this.p2.trace();
	}

	runIters(iters) {
		for (let i = 0; i < iters; i++) {
			this.update();
			this.trace();
		}
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
		push()
		stroke(this.color);
		strokeWeight(1)
		point(this.endOfLineX, this.endOfLineY);
		pop()
	}
}

function addNoiseToCanvas2() {
    let noiseScale = 0.01
    loadPixels();
    for (let x = 0; x < s; x++) {
        for (let y = 0; y < s; y++) {
            let i = (x + y * s) * 4;
            let r = pixels[i];
            let g = pixels[i + 1];
            let b = pixels[i + 2];
            let a = pixels[i + 3];
            let n = map(noise(noiseScale*x*random(x),noiseScale*y*random(y) ), 0, 1, -50, 50);
            r += n;
            g += n;
            b += n;
			a = 100
            pixels[i] = r;
            pixels[i + 1] = g;
            pixels[i + 2] = b;
            pixels[i + 3] = a;
        }
    }
    updatePixels();
}

function addPerlinNoiseToCanvas() {
    let noiseScale = 0.01
    loadPixels();
    for (let x = 0; x < s; x++) {
        for (let y = 0; y < s; y++) {
            let i = (x + y * s) * 4;
            let r = pixels[i];
            let g = pixels[i + 1];
            let b = pixels[i + 2];
            let a = pixels[i + 3];
            let n = map(noise(noiseScale*x,noiseScale*y ), 0, 1, -127, 128);
            r += n;
            g += n;
            b += n;
            pixels[i] = r;
            pixels[i + 1] = g;
            pixels[i + 2] = b;
            pixels[i + 3] = a;
        }
    }
    updatePixels();
}

// A Class called LabColor, which is a color in the LAB color space.
class LabColor {
    static rangeL = [0, 100];
    static rangeA = [-128, 127];
    static rangeB = [-128, 127];

    constructor(l, a, b) {
        this.l = l;
        this.a = a;
        this.b = b;
    }

    static RandomLabColor() {
        return new LabColor(random(100), random(256) - 127, random(256) - 127);
    }

    // Take in p5's color object and return a LabColor object.
    static LabColorFromRGB(rgb) {
        var r = red(rgb) / 255, g = green(rgb) / 255, b = blue(rgb) / 255, x, y, z;
        r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
        y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
        z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
        x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
        y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
        z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
        return new LabColor(116 * y - 16, 500 * (x - y), 200 * (y - z));
    }

    // Take in LabColor and return p5's color object in RGB space.
    getRGB() {
        var y = (this.l + 16) / 116
        var x = (this.a / 500) + y
        var z = y - this.b / 200
        var r
        var g
        var b;
        x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16 / 116) / 7.787);
        y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
        z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16 / 116) / 7.787);
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.2040 + z * 1.0570;
        r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1 / 2.4) - 0.055) : 12.92 * r;
        g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1 / 2.4) - 0.055) : 12.92 * g;
        b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1 / 2.4) - 0.055) : 12.92 * b;
        var out = {
            r: Math.min(Math.round(r * 255), 255),
            g: Math.min(Math.round(g * 255), 255),
            b: Math.min(Math.round(b * 255), 255)
        };

        return color(out.r, out.g, out.b);
    }

    // Generates a new color that is a random distance away from this color.
    createNearby() {
        let newColor = new LabColor(this.l, this.a, this.b);

        let colorChanel = Math.floor(random(3));
        let dir = Math.floor(random(2)) - 1;
        let strength = Math.floor(random(15) + 15);

        if (dir < 0) {
            dir = -1;
        } else {
            dir = 1;
        }

        switch (colorChanel) {
            case 0:
                newColor.seta(newColor.a + dir * strength)
                break;
            case 1:
                newColor.setb(newColor.b + dir * strength)
                break;
            case 2:
                newColor.setl(newColor.l + dir * strength)
                break;
            default:
                break;
        }

        return newColor
    }

    // Find delta E between two LabColor objects.
    distance(lab2) {
        return Math.sqrt(Math.pow(this.l - lab2.l, 2) + Math.pow(this.a - lab2.a, 2) + Math.pow(this.b - lab2.b, 2));
    }

    // print out the LabColor object.
    print() {
        console.log(this.l, this.a, this.b);
    }

    setl(l) {
        if (l > LabColor.rangeL[0] && l < LabColor.rangeL[1]) {
            this.l = l;
        }
    }

    seta(a) {
        if (a > LabColor.rangeA[0] && a < LabColor.rangeA[1]) {
            this.a = a;
        }
    }

    setb(b) {
        if (b > LabColor.rangeB[0] && b < LabColor.rangeB[1]) {
            this.b = b;
        }
    }
}
