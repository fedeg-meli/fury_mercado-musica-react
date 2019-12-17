import React from "react";
import styled from "styled-components";
import Button from "@andes/button";

const SomethingHappenedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
  .image {
    width: 150px;
    height: 150px;
  }
  button {
    font-family: "proxima_novasemibold" !important;
    background: black;
    border: 0;
    &:hover {
      background: rgba(0, 0, 0, 0.95);
    }
    &:focus {
      box-shadow: 0 0 0 0.16667em rgba(0, 0, 0, 0.35);
    }
  }
`;

export const SomethingHappened = props => {
  const { icon, message, textAction, action } = props;
  return (
    <SomethingHappenedContainer>
      <img className="image" alt={message} src={icon}></img>
      <h2>{message}</h2>
      {action && <Button onClick={action}>{textAction}</Button>}
    </SomethingHappenedContainer>
  );
};
