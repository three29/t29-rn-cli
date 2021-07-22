//Files that will be removed from the new app.
const removeFiles = ['app.js', 'index.js', '.eslintrc.js'];

//directory and files that will be copied from Boilerplate directory to the new app.
const themeFiles = [
	'app',
	'.eslintrc.json',
	'.eslintignore',
	'.prettierrc.json',
	'index.js',
];

//Npm packages that will be intsalled as dependancies
const dependancies = [
	'@react-navigation/native',
	'react-native-reanimated',
	'react-native-gesture-handler',
	'react-native-gesture-handler',
	'react-native-screens',
	'react-native-safe-area-context',
	'@react-native-community/masked-view',
	'@react-navigation/stack',
	'react-redux',
	'redux',
	'react-native-safe-area-context',
	'@reduxjs/toolkit',
	'osmicsx',
];

//Npm packages that will be intsalled as dev dependancies
const devDependancies = ['reactotron-react-native', 'reactotron-redux'];

module.exports = {
	themeFiles,
	removeFiles,
	devDependancies,
	dependancies,
};
