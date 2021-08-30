module.exports = {
	description: '⚡ The T29-RN CLI ⚡',
	run: async (toolbox) => {
		const {
			parameters: { first },
			print: { error },
		} = toolbox;

		if (first !== undefined) {
			error(`T29 '${first}' is not a command`);
		} else {
			return require('./help').run(toolbox);
		}
	},
};
