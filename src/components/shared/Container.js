import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -200px;
  .container {
    display: flex;
    flex-direction: column;
    width: 1200px;
    max-width: 1200px;
  }
`;

const Container = props => {
  return (
    <Wrapper>
      <div className="container">{props.children}</div>
    </Wrapper>
  );
};

export default Container;
