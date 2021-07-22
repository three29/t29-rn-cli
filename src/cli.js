const { build } = require('gluegun');

async function run(argv) {
	const cli = build()
		.brand('t29-rn')
		.exclude(['semver', 'prompt', 'http'])
		.src(__dirname)
		.defaultCommand(require('./commands/help'))
		.plugin('./node_modules', { pattern: 't29-rn-' })
		.help()
		.version()
		.create();

	const toolbox = await cli.run(argv);

	return toolbox;
}

module.exports = { run };
