# React Form

Let's make forms a little less painful shall we?

```js
<Form
  onSubmit={({ values, formValid, resetInputs }) => {
    if (formValid) {
      makeApiCall(values);
    } else {
      resetInputs(['password']);
    }
  }}
>
  <Input name="user.firstName" />
  <Input name="user.lastName" />
  <Input name="email" />
  <Input name="password" />
  <button type="submit">
    Submit
  </button>
</Form>
```

## Installation

```bash
npm install @jbknowledge/react-form
```

## React Native Development

Due to some limitations of `react-native`, form submit events are only supported by the web version of this package at this time. In addition, you should always import from the `native` submodule when developing in `react-native`. For example:

```jsx
import { Form, withFormHandling } from '@jbknowledge/react-form'; // This will not work for react-native projects

import { Form, withFormHandling } from '@jbknowledge/react-form/native';
```

## API

This library exports the following:

* `withFormHandling`
* `Form`
* `ValidationError`
* `useFormField`
* `useFormState`
* `useFormContext`

**withFormHandling(Component, onChange)**

This HoC will provide `Component` with 4 props:

`value`: The current value for the input  
`setValue`: A callback function which replace the existing form value  
`error`: The current error message associated with the input, or null  
`inputProps`: An object of meta values which are passed to all inputs within the form  

```jsx
const Input = ({ value, setValue, error, inputProps }) => (
  <div className="form-group">
    {error && inputProps.displayErrors && <div className="form-error">{error}</div>}
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

```jsx
<Input name="password" />
```

more on this below.

**Error Handling**

By default, `react-form` does not provide any error handling. The second argument for the HoC `withFormHandling` or `onChange` is how you can declare validation rules for your components. `onChange` is expected to be either a single callback or an array of callbacks and will be called automatically by `react-form` everytime the value changes. The first arg `value` will be the next value while `props` will be all props passed to your wrapped component. This function when called sets the value of `error` on your behalf. Any error thrown by the `onChange` callback you provide will automatically be caught and passed to your component via the `error` prop.

```jsx
export default withFormHandling(Input, (value) => {
  throw new Error(); // props.error will be set to the thrown error
});
```

In the event your component has one or more anticipated errors, you can take advantage of the custom `ValidationError` provided by `react-form` as a convenience.

```jsx
export default withFormHandling(Input, (value) => {
  if (isNaN(value)) {
    throw new ValidationError('Please enter a number.'); // props.error will be set to the string provided
  }
});
```

In addition to `value`, the `onChange` callback is also provided all component props and a method to get the current value and error for any existing form field. This will allow you to achieve validation similar to the following:

```jsx
export default withFormHandling(Input, (value, props, getField) => {
  const password = getField('password');
  if (props.matchPassword && value !== password.value) {
    throw new ValidationError('Does not match.')
  } else if (props.regex && !value.match(props.regex)) {
    throw new ValidationError('Invalid pattern.')
  }
});
```

If you provide an array of callback functions, each will run until an error is thrown.

```jsx
export default withFormHandling(Input, [
  () => throw new ValidationError('Invalid'),
  someValidationFunction // never called because the first callback always errors
]);
```

**Input Names**

All components which are wrapped by `withFormHandling` are required to define a value for the `name` prop.

```jsx
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

```jsx
<Form>
  <Input name="user.name" />
  <Input name="user.age" />
  <Input name="title" />
</Form>
```

**Form**

All components wrapped by `withFormHandling` must be nested underneath one of `react-form`'s `Form` components like above. Wrapped inputs, however, do not need to be direct children of the `Form` object; the following is also a valid example:

```jsx
<Form>
  <div>
    <div>
      <Input name="password" />
    </div>
  </div>
</Form>
```

Other than props supported by html's `form`, you can provide the following props to the `Form` component:

**onSubmit({ formValid, values, resetInputs, revalidateInputs })**

This callback function will be called anytime a submit event is fired within the `Form` component.

**NOTE**: this callback is not currently supported for `react-native`, use the `onChange` callback instead.

`formValid`: true or false based on all of the nested inputs' `error` props.  
`values`: All form values; structure is based on the value of nested inputs' `name` props.  
`resetInputs`: A callback function which will allow you to reset one or more inputs back to their default values. See the `Resetting Inputs` section for more information.
`revalidateInputs`: A callback function which will allow you to revalidate one or more inputs. See the `Revalidating Inputs` section for more informtion.

For example, the following form:

```jsx
<Form>
  <Input name="nested.value" />
  <Input name="value" />
</Form>
```

could call your provided `onSubmit` callback with:

```json
{
  formValid: false,
  values: {
    nested: {
      value: 'example1',
    },
    value: 'example2'
  },
  resetInputs: () => {...},
  revalidateInputs: () => {...}
}
```

**onChange({ formValid, values, changedFields, resetInputs, revalidateInputs })**

This callback function will be called anytime a form value changes.

`formValid`: true or false based on all of the nested inputs' `error` props.  
`values`: All form values; structure is based on the value of nested inputs' `name` props.
`changedFields`: A [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) containing all field names whose state changed. See the `Reacting to field updates` for more information.
`resetInputs`: A callback function which will allow you to reset one or more inputs back to their default values. See the `Resetting Inputs` section for more information.
`revalidateInputs`: A callback function which will allow you to revalidate one or more inputs. See the `Revalidating Inputs` section for more informtion.

An example of what this might look like can be seen in the `onSubmit` section.

**inputProps**

This is a simple object that passes user defined props directly to the wrapped inputs. For example:

```jsx
<Form
  inputProps={{
    displayErrors: false,
  }}
>
```

This `inputProps` block would be passed as is automatically to all inputs wrapped by `withFormHandling` making the following possible:

```jsx
const CustomInput = ({ value, error, setValue, inputProps }) => (
  <div>
    { error && inputProps.displayErrors && <div>{error}</div>}
    <input ... />
  </div>
);

export default withFormHandling(CustomInput);
```

**NOTE**: `react-form` does not perform any optimization on this prop. Guaranteeing referential equality of `inputProps` is the responsibility of the user.

**Resetting Inputs**

In both of the provided `Form` lifecycle hooks, `onChange` and `onSubmit`, you are able to reset the value of one or more inputs back to their default values via the provided `resetInputs(patterns)` function.

`patterns`: An array of glob patterns which will be matched with your inputs' names.

Given the following form:

```jsx
<Form
  onChange={() => {...}}
>
  <Input name="username" defaultValue="johndoe34" >
  <Input name="address.street" >
  <Input name="address.city" >
  <Input name="address.state" >
  <Input name="address.zip" >
</Form>
```

* `resetInputs(['address.state', 'address.city'])` will reset the values of `address.state` and `address.city` back to empty strings

* `resetInputs(['username'])` will reset the value of `username` to `johndoe34`

* `resetInputs(['address.*'])` will reset the value of all inputs **except** `username` back to empty strings

* `resetInputs()` which is the same as `resetInputs(['*'])` will reset all inputs back to their default values

**Revalidating Inputs**

In both of the provided `Form` lifecycle hooks, `onChange` and `onSubmit`, you are able to revalidate one or more inputs based of their current value via the provided `revalidateInputs(patterns)` function.

`patterns`: An array of glob patterns which will be matched with your inputs' names.

Given the following form:

```jsx
<Form
  onChange={() => {...}}
>
  <Input name="username" defaultValue="johndoe34" >
  <Input name="address.street" >
  <Input name="address.city" >
  <Input name="address.state" >
  <Input name="address.zip" >
</Form>
```

* `revalidateInputs(['address.state', 'address.city'])` will revalidate `address.state` and `address.city` based on their current value.

* `revalidateInputs(['username'])` will revalidate `username` based off its current value, *not* its default value `johndoe34`.

* `revalidateInputs(['address.*'])` will revalidate all inputs **except** `username`.

* `revalidateInputs()` which is the same as `revalidateInputs(['*'])` will revalidate the entire form.

**Reacting to field updates**

In the `onChange` callback, you can perform any action based off which fields changed and triggered the change event via the provided `changedFields` [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). This is useful for scenarios where the validation of an input depends on the values of other fields within the form. For example:

```jsx
const Input = () => {...};
const WrappedInput = withFormHandling(Input, (value, props, getField) => {
  const { customValidation } = props;
  if (customValidation) {
    customValidation(value, props, getField);
  }
});

const SignUpForm = () => {
  const validateConfirmPassword = useCallback((value, props, getField) => {
    const password = getField('password');
    if (!!password.error) throw new ValidationError(password.error);
    if (password.value !== value) throw new ValidationError('Does not match.');
  }, []);

  return (
    <Form
      onChange={({ changedFields, revalidateInputs }) => {
        if (changedFields.has('password')) {
          revalidateInputs(['confirmPassword']);
        }
      }}
    >
      <WrappedInput name="password" />
      <WrappedInput
        name="confirmPassword"
        customValidation={validateConfirmPassword}
      />
    </Form>
  );
};
```

**useFormField(name, options)**

As an alternative to `withFormHandling`, you can utilize `useFormField` to connect an input to the overall form. i.e.

```jsx
const MyInput = ({ name, defaultValue }) => {
  const { value, setValue, error, key } = useFormField(name, {
    defaultValue,
    validateValue: (value) => value === 'valid' ? null : 'not valid'
  });

  return (
    <>
      <input
        key={key}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <span>{error}</span>}
    </>
  );
};
```

Options:
* `defaultValue`- initial value of the form field. In addition, the `resetInputs` callback provided to `Form`'s `onSubmit` and `onChange` callback will reset the input back to the value declared as `defaultValue`
* `validateValue(value)` - callback on value changes.
  * returns a value `x` -> error set to `x`
  * throws a `ValidationError(x)` -> error set to `x`
  * throws a general `new Error()` => error set to the error object
  * returns a falsy value -> error set to `null`


## Contributors

`react-form` was built and is maintained by JBKLabs, [JBKnowledge Inc's](https://jbknowledge.com/) research and development team.

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.
