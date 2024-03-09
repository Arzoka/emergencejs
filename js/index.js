import { entities, fps } from './constants/index.js';

document.getElementById('flipbutton').addEventListener('click', () => {
	entities.flipEntityConfig();
});

// If these are configured it overwrites any other value regarding the same key on all entities.
entities.configureGlobals({ key: 'globalEntitySize', value: 2 });
entities.configureGlobals({ key: 'globalEntityX', value: 'random' });
entities.configureGlobals({ key: 'globalEntityY', value: 'random' });

// Not necessary to add this, but for this showcase all entities have the same amount.
const amountPerEntity = 200;

// Add entities
entities.add({ color: 'red' }, amountPerEntity);
entities.add({ color: 'blue' }, amountPerEntity);
entities.add({ color: 'green' }, amountPerEntity);
entities.add({ color: 'yellow' }, amountPerEntity);
entities.add({ color: 'purple' }, amountPerEntity);
entities.add({ color: 'orange' }, amountPerEntity);
entities.add({ color: 'pink' }, amountPerEntity);

// Draw entities on canvas (this is the main loop)
setInterval(() => {
	entities.draw();
}, 1000 / fps);


