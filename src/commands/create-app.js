const { spawnProgress } = require('../tools/spawn');
const {
	p,
	startSpinner,
	stopSpinner,
	clearSpinners,
} = require('../tools/pretty');
const {
	welcomeCreateAppHeader,
	removeFiles,
	copyThemeFiles,
	installDependancies,
	installDevDependancies,
	podFileUpdate,
	git,
	closingCreateApp,
} = require('../tools/helpers');

const isWindows = process.platform === 'win32';

module.exports = {
	run: async (toolbox) => {
		const { print, filesystem, meta, parameters, strings } = toolbox;
		const { kebabCase } = strings;
		const { exists, path, remove } = filesystem;
		const { info, colors } = print;
		const { yellow } = colors;

		// start tracking performance
		const perfStart = new Date().getTime();

		// retrieve project name from toolbox
		const { validateProjectName } = require('../tools/validation');
		const projectName = validateProjectName(toolbox);

		// if they pass in --overwrite, remove existing directory otherwise throw if exists
		if (parameters.options.overwrite) {
			remove(projectName);
		} else if (exists(projectName)) {
			const alreadyExists = `Error: There's already a folder with the name "${projectName}". To force overwriting that folder, run with --overwrite.`;
			p();
			p(yellow(alreadyExists));
			process.exit(1);
		}

		// debug?
		const debug = Boolean(parameters.options.debug);
		const log = (m) => {
			if (debug) info(m);
			return m;
		};

		const cli = 'react-native-cli';
		const t29Path = path(`${meta.src}`, '..');
		const boilerplatePath = path(t29Path, 'boilerplate');
		const cliEnv = process.env;

		//Create Default React-Native App
		const cliString = `npx react-native init ${projectName} ${
			debug ? ' --verbose' : ''
		}`;

		log({ cli, t29Path, boilerplatePath, cliString });

		// welcome everybody!
		welcomeCreateAppHeader(projectName, meta, cli);

		// generate the project
		await spawnProgress(log(cliString), {
			env: cliEnv,
			onProgress: (out) => {
				out = log(out.toString());

				if (out.includes('Welcome to React Native!')) {
					p(`   creating a new React Native app`);
				}
				if (out.includes('Run instructions for')) {
					p(`🧊 Cooling print nozzles`);
				}
			},
		});

		// note the original directory
		const cwd = log(process.cwd());

		// jump into the project to do additional tasks
		process.chdir(projectName);

		//Remove unnecessary files
		await removeFiles(log);

		//copy theme files form boilerplate directory
		startSpinner(' Coping Boilerplate files');
		// await copyThemeFiles(log, boilerplatePath);
		await copyThemeFiles(log, boilerplatePath);
		stopSpinner(' Coping Boilerplate files', '🖨');

		//npm install Dev Dependancies
		startSpinner(' Unboxing NPM dependencies');
		await installDependancies();

		//npm install Dev Dependancies
		await installDevDependancies();
		stopSpinner(' Unboxing NPM dependencies', '🔥');

		//Remove flipper, we do not use it.
		startSpinner('Removing Flipper');
		await podFileUpdate();
		stopSpinner(' Removing Flipper', '🖨');

		// install pods
		startSpinner(' Baking CocoaPods');
		await spawnProgress('npx pod-install', {});
		stopSpinner(' Baking CocoaPods', '☕️');

		// Create npm script to test that everything is built correctly

		// commit any changes
		startSpinner(' Backing everything up in source control');
		await git(log, parameters.options.git, meta.version());
		stopSpinner(' Backing everything up in source control', '🗄');

		// back to the original directory
		process.chdir(log(cwd));

		// clean up any spinners we forgot to clear
		clearSpinners();

		// we're done! round performance stats to .xx digits
		const perfDuration =
			Math.round((new Date().getTime() - perfStart) / 10) / 100;

		closingCreateApp(projectName, perfDuration);
	},
};
