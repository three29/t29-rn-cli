const { print } = require('gluegun/print');

const { cyan, gray, white, bold, red, yellow } = print.colors;
const { underline } = print.colors;

const p = (m = '') => print.info(gray(`   ${m}`));
const heading = (m = '') => p(white(bold(m)));
const link = (m = '') => underline(white(m));
const spinners = {};

const startSpinner = (m = '') => {
	let spinner = spinners[m];
	if (!spinner) {
		spinner = print.spin({ prefixText: '   ', text: gray(m) });
		spinners[m] = spinner;
	}
	return spinner;
};

const stopSpinner = (m, symbol) => {
	const spinner = spinners[m];
	if (spinner) {
		spinner.stopAndPersist({ symbol });
		delete spinners[m];
	}
};

const clearSpinners = () => {
	Object.keys(spinners).forEach((m) => {
		spinners[m].stop();
		delete spinners[m];
	});
};

const t29Heading = () =>
	p(
		yellow(
			bold(
				'· · · · · · · · · · · · · · · · ⚡ T29 RN CLI ⚡ · · · · · · · · · · · · · · · ·\n'
			)
		)
	);

const command = (m = '', second = '', examples = []) => {
	p(white(m) + '  ' + gray(second));
	const indent = m.length + 2;
	if (examples) {
		examples.forEach((ex) => p(gray(' '.repeat(indent) + ex)));
	}
};

const direction = (m = '') => p(cyan(m));
const warning = (m = '') => p(yellow(m));
const important = (m = '') => p(red(m));

module.exports = {
	p,
	heading,
	link,
	t29Heading,
	command,
	direction,
	warning,
	startSpinner,
	stopSpinner,
	clearSpinners,
	important,
};
