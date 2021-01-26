import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-weight: bolder;
  font-size: 1rem;
  margin-top: 1rem;
  :center ;
  text-decoration: none;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: hotpink;
  &:hover {
    background: #6a9bcc;
  }
`;

const Button = (props) => <StyledButton {...props} />;
export default Button;
