const { p, command, warning, heading } = require('../tools/pretty');

const {
	showGeneratorHelp,
	generateFromTemplate,
	generateCommandNotAvailable,
	availableGenerator,
} = require('../tools/generator');

module.exports = {
	alias: ['g', 'generator', 'generators', 'gen'],
	description: 'Generates components and other features from templates',
	run: async (toolbox) => {
		const { parameters } = toolbox;

		if (parameters.options.help || parameters.options.list) {
			// show help or list generators
			showGeneratorHelp(toolbox);
		} else if (parameters.first) {
			// actually generate something
			generate(toolbox);
		} else {
			// catch-all, just show help
			showGeneratorHelp(toolbox);
		}
	},
};

async function generate(toolbox) {
	const { parameters, strings } = toolbox;
	const generator = parameters.first.toLowerCase();

	// we need a name for this component
	const name = parameters.second;
	if (!name) {
		return warning(
			`⚠️  Please specify a name for your ${generator}: t29-rn g ${generator} MyName`
		);
	}

	// check if cli run on root project
	//TODO: Fix this
	try {
		require(process.cwd() + '/package.json');
	} catch (err) {
		warning(
			'⚠️  Oopss, if you can not generate something to outside root directory project of t29-rn'
		);
		return;
	}

	// check if generate command is exists
	const commandExists = availableGenerator.find(
		(command) => command.name === generator
	);

	if (!commandExists) {
		return await generateCommandNotAvailable(toolbox);
	}

	// avoid the my-component-component phenomenon
	const pascalGenerator = strings.pascalCase(generator);
	let pascalName = strings.pascalCase(name);
	if (pascalName.endsWith(pascalGenerator)) {
		p(`Stripping ${pascalGenerator} from end of name`);
		p(
			`Note that you don't need to add ${pascalGenerator} to the end of the name -- we'll do it for you!`
		);
		pascalName = pascalName.slice(0, -1 * pascalGenerator.length);
		command(`t29-rn generate ${generator} ${pascalName}`);
	}

	// okay, let's do it!
	heading(`Generated new files:`);
	generateFromTemplate(
		generator,
		{
			name: pascalName,
			skipIndexFile: parameters.options.skipIndexFile,
		},
		toolbox
	);
}
