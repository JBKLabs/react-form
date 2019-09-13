# React Form

Let's make forms a little less painful shall we?

```js
<Form
  onSubmit={({ values, formValid }) => {
    if (formValid) {
      makeApiCall(values);
    }
  }}
>
  <Input name="user.firstName" />
  <Input name="user.lastName" />
  <Input name="email" />
  <button type="submit">
    Submit
  </button>
</Form>
```

## Installation

```bash
npm install jbklabs/react-form#0.1.0
```

## React Native Development

Due to some limitations of `react-native`, form submit events are only supported by the web version of this package at this time. In addition, you should always import from the `native` submodule when developing in `react-native`. For example:

```js
import { Form, withFormHandling } from '@jbk/react-form'; // This will not work for react-native projects

import { Form, withFormHandling } from '@jbk/react-form/native';
```

## API

This library exports the following:

* `withFormHandling`
* `Form`
* `ValidationError`

**withFormHandling(Component, onChange)**

This HoC will provide `Component` with 3 props:

`value`: The current value for the input  
`setValue`: A callback function which replace the existing form value.  
`error`: The current error message associated with the input, or null

```js
const Input = ({ value, setValue, error }) => (
  <div className="form-group">
    {error && <div className="form-error">{error}</div>}
    <input
      className="form-input"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  </div>
);

export default withFormHandling(Input);
```

In addition, components wrapped by `withFormHandling` must be provided a `name` prop, i.e.

```js
<Input name="password" />
```

more on this below.

**Error Handling**

By default, `react-form` does not provide any error handling. The second argument for the HoC `withFormHandling` or `onChange` is how you can declare validation rules for your components. `onChange(value, props)` will be called automatically by `react-form` everytime the provided `setValue` prop is called. The first arg `value` will be the next value while `props` will be all props passed to your wrapped component. This function when called sets the value of `error` on your behalf. Any error thrown by the `onChange` callback you provide will automatically be caught and passed to your component via the `error` prop.

```js
export default withFormHandling(Input, (value) => {
  throw new Error(); // props.error will be set to the thrown error
});
```

In the event your component has one or more anticipated errors, you can take advantage of the custom `ValidationError` provided by `react-form` as a convenience.

```js
export default withFormHandling(Input, (value) => {
  if (isNaN(value)) {
    throw new ValidationError('Please enter a number.'); // props.error will be set to the string provided
  }
});
```

In addition to `value`, the `onChange` callback is also provided all component props. This will allow you to achieve validation similar to the following:

```js
export default withFormHandling(Input, (value, { regex }) => {
  if (regex && !value.match(regex)) {
    throw new ValidationError('Invalid pattern.')
  }
});
```

**Input Names**

All components which are wrapped by `withFormHandling` are required to define a value for the `name` prop.

```js
<Input name="password" />
```

This requirement serves two purposes:

* it allows `react-form` to uniquely identify inputs for state management
* it allows you to define the structure of the resulting form values

`name` can be anything, however, it is recommended that you mimic your api's schema. For example, with the following schema:

```json
{
  "user": {
    "name": <string>,
    "age": <number>
  },
  "title": <string>,
}
```

You can define inputs such as the following:

```js
<Form>
  <Input name="user.name" />
  <Input name="user.age" />
  <Input name="title" />
</Form>
```

**Form**

All components wrapped by `withFormHandling` must be nested underneath one of `react-form`'s `Form` components like above. Wrapped inputs, however, do not need to be direct children of the `Form` object; the following is also a valid example:

```js
<Form>
  <div>
    <div>
      <Input name="password" />
    </div>
  </div>
</Form>
```

Other than props supported by html's `form`, you can provide the following props to the `Form` component:

**onSubmit({ formValid, values })**

This callback function will be called anytime a submit event is fired within the `Form` component.

**NOTE**: this callback is not currently supported for `react-native`, use the `onChange` callback instead.

`formValid`: true or false based on all of the nested inputs `error` prop
`values`: All form values structured based on wrapped input names.

For example, the following form:

```js
<Form>
  <Input name="nested.value" />
  <Input name="value" />
</Form>
```

could call your provided `onSubmit` callback with:

```js
{
  formValid: false,
  values: {
    nested: {
      value: 'example1',
    },
    value: 'example2'
  }
}
```

**onChange({ formValid, values })**

This callback function will be called anytime a form value changes.

`formValid`: true or false based on all of the nested inputs `error` prop
`values`: All form values structured based on wrapped input names.

An example of what this might look like can be seen above

## Contributors

`react-form` was built and is maintained by JBKLabs, [JBKnowledge Inc's](https://jbknowledge.com/) research and development team.

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.
