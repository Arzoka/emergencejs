import { canvas, ctx, drag } from '../constants';

export default class Entity {
	constructor(x, y, size=5, color='#fff', forceX=0, forceY=0) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.forceX = forceX;
		this.forceY = forceY;
	}
	draw() {
		ctx.fillStyle = this.color;
		this.update();
		console.log(this.x, this.y);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

		// add glow
		ctx.shadowColor = this.color;
		ctx.shadowBlur = 20;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fill();
	}

	update() {
		this.checkBorderCollision();
		this.x += this.forceX;
		this.y += this.forceY;

		this.forceX *= drag;
		this.forceY *= drag;
	}

	checkBorderCollision() {
		if (this.x - this.size <= 0 || this.x + this.size >= canvas.width) {
			this.forceX *= -1;
		}
		if (this.y - this.size <= 0 || this.y + this.size >= canvas.height) {
			this.forceY *= -1;
		}
	}



}
