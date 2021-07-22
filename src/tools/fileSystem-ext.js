const { filesystem } = require('gluegun');
const { path } = filesystem;

/**
 * A lot like gluegun's filesystem.subdirectories(), but gets files too.
 *
 * This should probably go in Gluegun.
 *
 * Right about right here: https://github.com/infinitered/gluegun/blob/master/src/toolbox/filesystem-tools.ts#L52
 */
function children(location, isRelative = false, matching = '*') {
	const dirs = filesystem.cwd(location).find({
		matching,
		directories: true,
		recursive: false,
		files: true,
	});
	if (isRelative) {
		return dirs;
	} else {
		return dirs.map((dir) => path.join(location, dir));
	}
}

module.exports = {
	children,
};
