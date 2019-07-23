# React Native Form

Let's make forms a little less painful shall we?

```js
<Form
  onFormValuesChange={values => console.log(values)} // { firstName: '', lastName: '', email: '' }
  onFormValidityChange={validity => console.log(validity)} // { firstName: false, lastName: false, email: false }
>
  <TextInput name="firstName" />
  <TextInput name="lastName" />
  <TextInput name="email" />
</Form>
```

## Running Locally

**In one terminal:**
* `npm i`
* `npm start`

### React Web

To compile and watch changes to `src/*`

**In a second terminal:**
* `cd examples/web`
* `npm i`
* `npm start`

To spin up the example react project on localhost

### React Native

* **ANDROID**: Open and sync the project in Android Studio

**In a second terminal:**
* `cd examples/native`
* `npm i`
* `react-native run-<platform>`

**NOTE**: Hot reloading is only partially implemented at this time. You may need to reload from your device to experience functional changes.

## API

TODO

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.