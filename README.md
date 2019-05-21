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

* `cd example`
* `npm i`
* `npm run watch` in one terminal
* `react-native run-<platform>` in a second terminal

**NOTE**: Hot reloading is only partially implemented at this time. You may need to reload from your device to experience functional changes.

## API

TODO

## Contributors

- [Brian Maule](brian.maule@jbknowledge.com) - JBKLabs Software Developer