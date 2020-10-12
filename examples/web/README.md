# example

This project was generated using [`@jbknowledge/create-react-app`](https://www.npmjs.com/package/@jbknowledge/create-react-app).

## Running Locally

- Clone this repository
- `yarn install`
- `yarn start`
- Navigate to `localhost:8080` in your web browser

## Building

This project can be built using `yarn build` which will generate a static website in `dist/*`

## Deployment

This project is built to a static website which can be hosted anywhere that format is supported. Examples include [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html), [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website), and many others.

### Configuration

Configuration per environment is handled through this project's `window.env` global properties, set in `public/env.js`. Below is an example `env.js` file:

```js
window.env = { 
  ENABLE_DEBUG_MODE: 'false',
  API_BASE_URL: 'https://someapi.com/api/v1'
};
```

These values can be accessed anywhere in the project.

Each value in `env.js` can be overridden programmatically per environment via `yarn configure`. The `configure` script provided by `@jbknowledge/react-dev` will replace each key value in `window.env` with the value of `ENV_<key>` if it exists. For example, if you have the following `env.js` file:

```js
window.env = {
  SOME_ARG: 'local value'
};
```

And you run `yarn configure` while having the environment variable `ENV_SOME_ARG` set to `production value`. Your `env.js` file will be updated to:

```js
window.env = {
  SOME_ARG: 'production value'
};
```

**NOTE**: These values are **PUBLIC**. Do not store sensitive secrets in this file.

## Linting

This project is configured with `eslint` and `prettier`.

`jbk-scripts lint` will show you what errors exist in your project. To auto fix the ones that are autofixable, run `jbk-scripts lint --fix`.