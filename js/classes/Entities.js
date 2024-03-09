import random from '../util/random.js';
import Entity from './Entity.js';
import { canvas, EntityConfig } from '../constants';

export default class Entities {
	constructor() {
		this.entities = [];
		this.globalEntitySize = null;
		this.globalEntityX = null;
		this.globalEntityY = null;
	}

	add({ x = 0, y = 0, size = 5, color = 'red' }, amount = 1) {
		for (let i = 0; i < amount; i++) {

			const newEntity = new Entity(x, y, size, color);

			if (newEntity.x === 'random' || this.globalEntityX === 'random') {
				console.log('raaaa');
				newEntity.x = random(0, canvas.width);
			}
			if (newEntity.y === 'random' || this.globalEntityY === 'random') {
				newEntity.y = random(0, canvas.height);
			}
			if (newEntity.color === 'random') {
				newEntity.color = `rgb(${ random(0, 255) }, ${ random(0, 255) }, ${ random(0, 255) })`;
			}

			if (this.globalEntityX !== 'random' && this.globalEntityX !== null) {
				newEntity.x = this.globalEntityX;
				console.log('raaaa');
			}

			if (this.globalEntityY !== 'random' && this.globalEntityY !== null) {
				newEntity.y = this.globalEntityY;
			}

			if (this.globalEntitySize !== null) {
				newEntity.size = this.globalEntitySize;
			}

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

	configureGlobals(config) {
		this[config.key] = config.value;
		console.log(this[config.key]);
	}

	calculateCollisions() {
		this.entities.forEach((entity, i) => {
			this.entities.forEach((otherEntity, j) => {
				if (i !== j) {
					const dx = entity.x - otherEntity.x;
					const dy = entity.y - otherEntity.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					// Check if entities overlap
					if (distance < entity.size + otherEntity.size) {
						// Calculate overlap amount
						const overlap = (entity.size + otherEntity.size) - distance;
						// Calculate direction vector from otherEntity to entity
						const dxNormalized = dx / distance;
						const dyNormalized = dy / distance;
						// Only adjust positions if the same color
						if (entity.color === otherEntity.color) {
							// Move entities apart by half the overlap each
							entity.x += dxNormalized * overlap / 2;
							entity.y += dyNormalized * overlap / 2;
							otherEntity.x -= dxNormalized * overlap / 2;
							otherEntity.y -= dyNormalized * overlap / 2;
						} else {
							// Different color collision handling (e.g., exchange forces)
							let currentForceX = entity.forceX;
							let currentForceY = entity.forceY;
							entity.forceX = otherEntity.forceX;
							entity.forceY = otherEntity.forceY;
							otherEntity.forceX = currentForceX;
							otherEntity.forceY = currentForceY;
						}
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
					if (distance < 200) {
						if (EntityConfig[entity.color][otherEntity.color] === 'chase') {
							entity.forceX = (otherEntity.x - entity.x) / 100;
							entity.forceY = (otherEntity.y - entity.y) / 100;
						} else if (EntityConfig[entity.color][otherEntity.color] === 'run') {
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
