const { filesystem } = require('gluegun');
const { warning, important } = require('../tools/pretty');

const generateScreen = async (propsInfo, filename, toolbox) => {
	const {
		print,
		template: { generate },
	} = toolbox;

	const ScreenFilePath = `App/Containers/Screens/${filename}.js`;

	if (fileExists(ScreenFilePath)) {
		return;
	}

	await generate({
		template: 'container.ejs',
		target: ScreenFilePath,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${ScreenFilePath}`);
};

const generateComponent = async (propsInfo, filename, toolbox) => {
	const {
		print,
		template: { generate },
	} = toolbox;

	const componentFilePath = `App/Components/${filename}.js`;

	if (fileExists(componentFilePath)) {
		return;
	}

	await generate({
		template: 'component.ejs',
		target: componentFilePath,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${componentFilePath}`);
};

const generateRedux = async (name, filename, toolbox) => {
	const {
		print,
		template: { generate },
	} = toolbox;

	const reduxFilePath = `App/Redux/${filename}Slice.js`;

	if (fileExists(reduxFilePath)) {
		return;
	}

	await generate({
		template: 'reduxSlice.ejs',
		target: reduxFilePath,
		props: { name },
	});
	print.info(`${print.checkmark} ${reduxFilePath}`);
	important(
		`!!!IMPORTANT!!! - Make sure that you add your new redux slice to the configureStore.js, located in the Redux directory.`
	);
};

const generateApiRedux = async (propsInfo, filename, toolbox) => {
	const {
		print,
		template: { generate },
	} = toolbox;

	const reduxApiFilePath = `App/Services/${filename}Api.js`;

	if (fileExists(reduxApiFilePath)) {
		return;
	}

	await generate({
		template: 'reduxApi.ejs',
		target: reduxApiFilePath,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${reduxApiFilePath}`);
	important(
		`!!!IMPORTANT!!! - Make sure that you add your new api to the configureStore.js, located in the Redux directory.`
	);
};

const generateStackNavigation = async (propsInfo, filename, toolbox) => {
	const {
		print,
		template: { generate },
	} = toolbox;

	const StackFilePath = `App/Navigation/${filename}Stack.js`;

	if (fileExists(StackFilePath)) {
		return;
	}

	await generate({
		template: 'navigation-Stack.ejs',
		target: StackFilePath,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${StackFilePath}`);
};

const fileExists = (filePath) => {
	if (filesystem.exists(filePath)) {
		warning(`⚠️  Oopss,  "${filePath}" already exists.`);
		return true;
	}
	return false;
};

module.exports = {
	generateScreen,
	generateComponent,
	generateRedux,
	generateApiRedux,
	generateStackNavigation,
};
