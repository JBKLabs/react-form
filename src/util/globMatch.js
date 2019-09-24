import minimatch from 'minimatch';

const globMatch = (patterns, options) => {
  const matches = patterns
    .map(pattern => minimatch.match(options, pattern))
    .reduce((result, next) => [...result, ...next], []);

  return [...new Set(matches)];
};

export default globMatch;
