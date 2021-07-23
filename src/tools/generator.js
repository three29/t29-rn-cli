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

	const styleFilePath = `App/Containers/Screens/Styles/${filename}Style.js`;

	if (fileExists(styleFilePath)) {
		return;
	}

	await generate({
		template: 'screenStyle.ejs',
		target: styleFilePath,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${styleFilePath}`);
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

	const componentStyleFilePath = `App/Components/Styles/${filename}Style.js`;

	if (fileExists(componentStyleFilePath)) {
		return;
	}

	await generate({
		template: 'styles.ejs',
		target: componentStyleFilePath,
		props: { ...propsInfo },
	});
	print.info(`${print.checkmark} ${componentStyleFilePath}`);
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
};
