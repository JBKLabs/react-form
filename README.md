# React Native Form

Let's make forms a little less painful shall we?

```js
<Form
  onSubmit={({ values, formValid }) => {
    if (formValid) {
      makeApiCall(values);
    }
  }}
>
  <Input name="firstName" />
  <Input name="lastName" />
  <Input name="email" />
  <button type="submit">
    Submit
  </button>
</Form>
```

## Running Locally

### Web

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

TODO

## API

TODO

## Licensing

This package is licensed under Apache License, Version 2.0. See [LICENSE](./LICENSE) for the full license text.