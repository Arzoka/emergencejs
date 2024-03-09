import Entity from './classes/Entity.js';
import { entities, fps } from './constants';

entities.add(new Entity("random", "random", 2, 'red'), 500);
entities.add(new Entity("random", "random", 2, 'blue'), 500);
entities.add(new Entity("random", "random", 2, 'green'), 500);
entities.add(new Entity("random", "random", 2, 'yellow'), 500);
entities.add(new Entity("random", "random", 2, 'purple'), 500);
entities.add(new Entity("random", "random", 2, 'orange'), 500);
entities.add(new Entity("random", "random", 2, 'pink'), 500);

setInterval(() => {
	entities.draw();
}, 1000 / fps);


