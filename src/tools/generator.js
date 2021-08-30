const { filesystem } = require('gluegun');
const { map, pipe, values } = require('ramda');
const {
	warning,
	important,
	t29Heading,
	p,
	command,
	heading,
} = require('../tools/pretty');

const availableGenerator = [
	{
		name: 'component',
		description: 'Generates a react-hooks component.',
	},
	{
		name: 'screen',
		description: 'Generates a screen.',
	},
	{
		name: 'slice',
		description: 'Generates a Redux Toolkit slice for Redux.',
	},
	{
		name: 'api',
		description: 'Generates a Redux Toolkit RTK Query slice for Redux.',
	},
	{
		name: 'stack',
		description: 'Generates a React Navigation Stack.',
	},
	{
		name: 'tabs',
		description: 'Generates a React Navigation Stack.',
	},
];

/**
 * Generates something using a template
 */
const generateFromTemplate = async (generator, options, toolbox) => {
	const { print, parameters, strings } = toolbox;
	const { pascalCase, kebabCase, pluralize, camelCase } = strings;
	const { warning } = print;

	// permutations of the name
	const pascalCaseName = pascalCase(options.name);
	const kebabCaseName = kebabCase(options.name);
	const camelCaseName = camelCase(options.name);

	try {
		// dynamic path
		let reduxPath = ['Redux/YourRedux'];
		let applyPath = ['../Theme/osmiProvider'];
		let themePath = ['../Theme/osmiProvider'];
		let ScreenthemePath = ['../../Theme/osmiProvider'];
		let componentApplyPath = [`Theme/osmiProvider`];
		let nameProps = pascalCaseName;

		// update path if there's namespace
		if (pascalCaseName.includes('/')) {
			const splitNamespace = pascalCaseName.split('/');
			nameProps = splitNamespace[splitNamespace.length - 1];

			splitNamespace.forEach(() => {
				reduxPath.unshift('..');
				applyPath.unshift('..');
				themePath.unshift('..');
				ScreenthemePath.unshift('..');
				componentApplyPath.unshift('..');
			});
		} else {
			// default path if no namespace
			reduxPath.unshift('..');
			applyPath.unshift('..');
			themePath.unshift('..');
			ScreenthemePath.unshift('..');
			componentApplyPath.unshift('..');
		}

		// create props info for generator
		const propsInfo = {
			reduxPath: reduxPath.join('/'),
			applyPath: applyPath.join('/'),
			themePath: themePath.join('/'),
			ScreenThemePath: ScreenthemePath.join('/'),
			componentApplyPath: componentApplyPath.join('/'),
			name: nameProps,
			fileName: camelCaseName,
		};

		generate(propsInfo, toolbox, parameters);
	} catch (err) {
		warning(`⚠️  Oopss,  appears that we ran into an issue.  \n ${err}`);
	}
};

const generate = async (propsInfo, toolbox, parameters) => {
	const {
		print,
		template: { generate },
	} = toolbox;
	let destinationDir = '';
	let template = '';

	/**
	 * where are we copying to
	 */
	switch (parameters.first) {
		case 'screen':
			destinationDir = `App/Containers/Screens/${propsInfo.fileName}.js`;
			template = 'container.ejs';
			break;

		case 'component':
			destinationDir = `App/Components/${propsInfo.fileName}.js`;
			template = 'component.ejs';
			break;

		case 'slice':
			destinationDir = `App/Redux/${propsInfo.fileName}Slice.js`;
			template = 'reduxSlice.ejs';
			break;

		case 'api':
			destinationDir = `App/Services/${propsInfo.fileName}Api.js`;
			template = 'reduxApi.ejs';
			break;

		case 'stack':
			destinationDir = `App/Navigation/${propsInfo.fileName}Stack.js`;
			template = 'navigation-Stack.ejs';
			break;

		case 'tabs':
			destinationDir = `App/Navigation/${propsInfo.fileName}Tabs.js`;
			template = 'navigation-Tabs.ejs';
			break;

		default:
			return await generateCommandNotAvailable(toolbox);
	}

	if (filesystem.exists(destinationDir)) {
		warning(`⚠️  Oopss,  "${destinationDir}" already exists.`);
		return;
	}

	if (destinationDir === '' || template === '') {
		return await generateCommandNotAvailable(toolbox);
	}

	await generate({
		template: template,
		target: destinationDir,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${destinationDir}`);
};

const generateCommandNotAvailable = async (toolbox) => {
	const {
		print: {
			info,
			table,
			colors: { bold, yellow },
		},
	} = toolbox;
	info(
		`✨ Type ${bold('T29-RN-CLI gen')} ${yellow(
			'________'
		)} to run one of these generators:\n`
	);

	const data = pipe(
		values,
		map((item) => [yellow(item.name), item.description])
	)(availableGenerator);

	table(data);
};

const showGeneratorHelp = (toolbox) => {
	t29Heading();
	p();
	heading('Installed generators');
	p();
	const data = pipe(
		values,
		map((item) => [yellow(item.name), item.description])
	)(availableGenerator);

	table(data);
};

module.exports = {
	showGeneratorHelp,
	generateFromTemplate,
	generateCommandNotAvailable,
	availableGenerator,
};
