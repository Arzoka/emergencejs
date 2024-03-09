export const EntityConfig = {
	'red': {
		blue: 'chase', green: 'run', yellow: 'ignore',
		purple: 'chase', orange: 'run', pink: 'ignore',
	},
	'blue': {
		red: 'run', green: 'chase', yellow: 'ignore',
		purple: 'run', orange: 'chase', pink: 'ignore',
	},
	'green': {
		red: 'chase', blue: 'run', yellow: 'ignore',
		purple: 'ignore', orange: 'chase', pink: 'run',
	},
	'yellow': {
		red: 'ignore', blue: 'ignore', green: 'ignore',
		purple: 'chase', orange: 'run', pink: 'chase',
	},
	'purple': {
		red: 'run', blue: 'chase', green: 'ignore',
		yellow: 'run', orange: 'ignore', pink: 'chase',
	},
	'orange': {
		red: 'chase', blue: 'run', green: 'ignore',
		yellow: 'chase', purple: 'run', pink: 'ignore',
	},
	'pink': {
		red: 'ignore', blue: 'ignore', green: 'chase',
		yellow: 'run', purple: 'run', orange: 'chase',
	},
};

