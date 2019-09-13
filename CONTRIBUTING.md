## Running Locally

### React Web

**In one terminal:**
* `npm i`
* `npm start`

To compile and watch changes to `src/*`

**In a second terminal:**
* `cd examples/web`
* `npm i`
* `npm start`

To spin up the example react project on localhost

### React Native

Due to a constraint placed on us by `react-native`, we are [unable to symlink](https://github.com/facebook/metro/issues/1) for local development. A work around may be possible, but is not a priority. In `examples/native` you can find an example native project which installs `react-form` the normal way via `npm`. Local development changes will need to be committed, pushed, and then installed in the native example subproject when verifying react native functionality. You can install any branch from upstream via `npm install jbklabs/react-form#branch-name` or from your fork via `[fork]/react-form#branch-name`. Please do not commit changes in the `react-form` version in the example project.

You can run the native example like you would any other `react-native` project, via:

* `react-native run-[platform]`