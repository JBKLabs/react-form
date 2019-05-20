import React from 'react';
import PropTypes from 'prop-types';

const withFormHandlingFactory = (Consumer) => (FormInput) => {
  const WrappedComponent = ({ name, ...props }) => (
    <Consumer>
      {
        context => (
          <FormInput
            {...props}
            name={name}
            setFormInputValue={value => context.handleValue({ name, value })}
          />
        )
      }
    </Consumer>
  );

  WrappedComponent.propTypes = {
    name: PropTypes.string,
  }

  return WrappedComponent;
}

export default withFormHandlingFactory;