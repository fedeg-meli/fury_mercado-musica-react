import React from "react";
import styled from "styled-components";

const BlackBackgroundStyled = styled.div`
  display: block;
  box-sizing: border-box;
  background: #000;
  width: 100%;
  height: 250px;
  padding: 15px 15px 15px 45px;
`;

const Logo = styled.div`
  width: 200px;
  height: 50px;
  background: url("/images/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  filter: brightness(1.5);
`;

const BlackBackground = () => {
  return (
    <BlackBackgroundStyled>
      <Logo />
    </BlackBackgroundStyled>
  );
};

export default BlackBackground;
