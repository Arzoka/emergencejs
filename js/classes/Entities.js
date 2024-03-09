import random from '../util/random.js';
import Entity from './Entity.js';
import { canvas, EntityConfig } from '../constants';

export default class Entities {
	constructor() {
		this.entities = [];
	}

	add(entity, amount=1) {
		for (let i = 0; i < amount; i++) {
			const newEntity = new Entity(
				entity.x,
				entity.y,
				entity.size,
				entity.color
			);

			if (newEntity.x === 'random') { newEntity.x = random(0, canvas.width) }
			if (newEntity.y === 'random') { newEntity.y = random(0, canvas.height) }
			if (newEntity.color === 'random') { newEntity.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})` }

			this.entities.push(newEntity);
		}
	}
	remove(entity) {
		this.entities = this.entities.filter(e => e !== entity);
	}
	draw() {
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.calculateCollisions();
		this.calculateWithinRadius();
		this.entities.forEach(entity => entity.draw());
	}

	get() {
		return this.entities;
	}

	configureEntities(config) {
		this.entities.forEach(entity => {
			entity[config.key] = config.value === 'random' ? random(-2, 2) : config.value;
		});
	}

	calculateCollisions() {
		this.entities.forEach((entity, i) => {
			this.entities.forEach((otherEntity, j) => {
				if (i !== j) {
					const dx = entity.x - otherEntity.x;
					const dy = entity.y - otherEntity.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < entity.size + otherEntity.size) {
						let currentForceX = entity.forceX;
						let currentForceY = entity.forceY;
						entity.forceX = entity.forceX / 2 + otherEntity.forceX / 2;
						entity.forceY = entity.forceY / 2 + otherEntity.forceY / 2;
						otherEntity.forceX = otherEntity.forceX / 2 + currentForceX / 2;
						otherEntity.forceY = otherEntity.forceY / 2 + currentForceY / 2;

						entity.colliding = true;
						entity.collidingPosition = {x: otherEntity.x, y: otherEntity.y};
					}
					else {
						entity.colliding = false;
					}
				}
			});
		});
	}

	calculateWithinRadius() {
		this.entities.forEach((entity, i) => {
			this.entities.forEach((otherEntity, j) => {
				if (i !== j) {
					const dx = entity.x - otherEntity.x;
					const dy = entity.y - otherEntity.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < 100) {
						if (EntityConfig[entity.color][otherEntity.color] === 'chase') {
							entity.forceX = (otherEntity.x - entity.x) / 100;
							entity.forceY = (otherEntity.y - entity.y) / 100;
						}
						else if (EntityConfig[entity.color][otherEntity.color] === 'run') {
							entity.forceX = (entity.x - otherEntity.x) / 100;
							entity.forceY = (entity.y - otherEntity.y) / 100;
						}

						// ignore is done automatically if none of these conditions are met
					}
				}
			});
		});
	}
}
