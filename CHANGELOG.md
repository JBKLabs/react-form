# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2019-10-02
### Added
- `@jbk/react-form/native` module export for react native development
- ability to reset inputs back to their default values via `resetInputs`
- `inputProps` prop for meta values passed into components wrapped by `withFormHandling` ([#20](https://github.com/JBKLabs/react-form/issues/20))

### Updated
- package name to `@jbknowledge/react-form` ([#14](https://github.com/JBKLabs/react-form/issues/14))

### Changed
- `onFormValuesChange` and `onFormValidityChange` props for `Form` have been removed and replaced with `onChange` and `onSubmit`
- `setFormInputValue`, `setFormInputValidity`, `valid` as props for components wrapped by `withFormHandling` have been removed and replaced with `setValue` and `error`

### Fixed
- bug where form input errors are never initialized ([#21](https://github.com/JBKLabs/react-form/issues/21))

### Removed
- `TextInput` component which has `react-form` preconfigured

### Updated
- allow `withFormHandling`'s optional `onChange` callback prop to be an array of callbacks as well as a single callback function. ([#22](https://github.com/JBKLabs/react-form/issues/22))
