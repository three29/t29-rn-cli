const {
	p,
	command,
	heading,
	t29Heading,
	direction,
	link,
} = require('../tools/pretty');

module.exports = {
	dashed: true,
	alias: ['h'],
	description: 'Displays T29-RN-CLI CLI help',
	run: async (toolbox) => {
		const { meta, parameters } = toolbox;

		p();

		t29Heading();
		heading(`Welcome to T29-RN-CLI ${meta.version()}!`);
		p();
		p('T29-RN is a CLI that helps you spin up a new React Native app using a');
		p('battle-tested tech stack.');
		p();
		heading('Commands');
		p();
		command('create-app         ', 'Creates a new React Native app', [
			't29-rn create-app MyApp',
		]);
		p();
		command('generate (g)', 'Generates components and other app features', [
			't29-rn generate container Screen',
			't29-rn generate component Button',
			't29-rn generate redux Hello',
		]);
		p();
		t29Heading();
	},
};
