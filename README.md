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

## API

TODO

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.