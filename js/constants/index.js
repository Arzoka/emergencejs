import Entities from '../classes/Entities.js';
import { EntityConfig } from './EntityConfig.js';
import { canvas, ctx, drag, fps } from './Simulation.js';

const entities = new Entities();

export { entities, fps, canvas, EntityConfig, drag, ctx };
