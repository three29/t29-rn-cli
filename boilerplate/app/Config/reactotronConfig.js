import Config from './debugConfig';
import Reactotron from 'reactotron-react-native';
import { name } from '../../app.json';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({ name })
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
  })
  .use(reactotronRedux());

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!

  reactotron.connect();

  // Let's clear Reactotron on every time we load the app
  reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
}
export default reactotron;
console.tron = reactotron;
