import minimatch from 'minimatch';

const globMatch = (patterns, options) => {
	const matches = patterns
		.map(p => minimatch.match(options, p))
		.reduce((result, next) => [...result, ...next], []);

	return [...new Set(matches)];
};

export default globMatch;
