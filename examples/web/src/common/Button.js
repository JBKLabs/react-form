import React from 'react';
import styled from 'styled-components';

const Button = ({ variant, children }) => {
  return <ButtonWrapper className={variant}>{children}</ButtonWrapper>;
};

Button.defaultProps = {
  variant: 'primary'
};

export default Button;

const ButtonWrapper = styled.button`
  font-size: 14px;
  padding: 6px 12px;
  margin-bottom: 0;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  &.primary {
    background-color: #007bff;
    color: white;
  }

  &.danger {
    background-color: red;
    color: white;
  }

  :hover,
  :focus {
    text-decoration: none;
  }
`;
