const { filesystem, parameters, system, print, meta } = require('gluegun');
const { path } = filesystem;
const { spawnProgress } = require('../tools/spawn');
const { children } = require('../tools/fileSystem-ext');
const {
	p,
	command,
	direction,
	heading,
	t29Heading,
} = require('../tools/pretty');
const { colors } = print;
const { gray, magenta, cyan, yellow } = colors;

//function for the create-app command. This outputs the welcome header
function welcomeCreateAppHeader(projectName, meta, cli) {
	p('\n');
	t29Heading();
	p(
		` Creating ${magenta(projectName)} using ${yellow(
			'T29-RN-CLI'
		)} ${meta.version()}`
	);
	p(
		` Powered by ${yellow(
			'T29-RN-CLI'
		)} - https://github.com/three29/t29-rn-cli`
	);
	p(` Using ${cyan(cli)}`);
	p(` ────────────────────────────────────────────────\n`);
	p(`⚡ Initializing app with T29-RN-CLI`);
}

function closingCreateApp(projectName, perfDuration) {
	p();
	heading(
		`${yellow('T29-RN-CLI')} initializing ${yellow(projectName)} in ${gray(
			`${perfDuration}s`
		)}`
	);
	p();
	direction(`To get started:`);
	command(`  cd ${projectName}`);
	if (process.platform === 'darwin') {
		command(`  npx react-native run-ios`);
	}
	command(`  npx react-native run-android`);
	p();
	direction(
		"To run in Android, make sure you've followed the latest react-native setup"
	);
	direction(
		'instructions at https://facebook.github.io/react-native/docs/getting-started.html'
	);
	direction(
		"before using T29 Theme. You won't be able to run Android successfully until you have."
	);
	p();
	heading('Now get cooking! 🍽');
	p();
	t29Heading();
}

async function removeFiles(log) {
	const { removeFiles } = require('../config/theme');

	for (let file of removeFiles) {
		const targetPath = log(path(process.cwd() + `/${file}`));
		if (filesystem.exists(targetPath)) {
			filesystem.remove(targetPath);
		}
	}
}

async function copyThemeFiles(log, boilerplatePath) {
	const { themeFiles } = require('../config/theme');

	for (let file of themeFiles) {
		const targetPath = log(path(process.cwd() + `/${file}`));
		if (!filesystem.exists(targetPath)) {
			const sourcePath = log(path(boilerplatePath + `/${file}`));
			filesystem.copy(sourcePath, targetPath);
		}
	}
}

async function installDependancies() {
	const { dependancies } = require('../config/theme');

	const dependanciesCmd = 'npm install ' + dependancies.join(' ');
	await spawnProgress(dependanciesCmd, {});
}

async function installDevDependancies() {
	const { devDependancies } = require('../config/theme');

	const devDependanciesCmd =
		'npm install --save-dev ' + devDependancies.join(' ');
	await spawnProgress(devDependanciesCmd, {});
}

async function podFileUpdate() {
	//switch to the ios directory
	process.chdir('ios');

	let podFileRaw = filesystem.read('Podfile');
	podFileRaw = podFileRaw.replace('use_flipper!()', '# use_flipper!()');
	let tempFile = 'tempPodFile';
	await filesystem.write(tempFile, podFileRaw);
	await filesystem.rename(tempFile, 'PodFile');

	// back to the original directory
	process.chdir('../');
}

async function git(log, gitStatus, version) {
	// commit any changes
	if (gitStatus !== false) {
		await system.run(
			log(`
				\\rm -rf ./.git
				git init;
				git add -A;
				git commit -m "New T29-RN-CLI ${version} app";
    		`)
		);
	}
}

module.exports = {
	welcomeCreateAppHeader,
	removeFiles,
	copyThemeFiles,
	installDependancies,
	installDevDependancies,
	podFileUpdate,
	git,
	closingCreateApp,
};
