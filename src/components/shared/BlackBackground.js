import React from "react";
import styled from "styled-components";
import { getUserData } from "../../helpers/getUserData";

const BlackBackgroundStyled = styled.div`
  display: flex;
  box-sizing: border-box;
  background: #000;
  width: 100%;
  height: 250px;
  padding: 15px 45px 15px 45px;
  color: #fff;
`;

const Logo = styled.div`
  width: 200px;
  height: 50px;
  background: url("/images/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  filter: brightness(1.5);
  flex: 1;
`;

const Logout = styled.button`
  display: block;
  height: 50px;
  font-size: 16px;
  font-family: "proxima_novasemibold";
  background: black;
  border: 0;
  color: #fff;
`;

const BlackBackground = props => {
  const data = getUserData();
  return (
    <BlackBackgroundStyled>
      <Logo />
      {data && data.name && (
        <Logout onClick={props.logout}>Cerrar sesión</Logout>
      )}
    </BlackBackgroundStyled>
  );
};

export default BlackBackground;
