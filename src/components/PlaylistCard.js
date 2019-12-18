import React, { Component } from "react";
import styled from "styled-components";

const PlaylistCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 220px;
`;

const PlaylistCardHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
  font-family: "proxima_novasemibold";
  font-size: 18px;
  color: #fff;
  text-shadow: 0 1px 0 #0d0d0d;
  width: 218px;
  height: 120px;
  border-radius: 6px;
  border: 0;
`;

const PlaylistDescription = styled.div`
  max-height: 45px;
  margin-bottom: 15px;
  .description {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: 400;
    font-family: "Lato";
    width: 220px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default class PlaylistCard extends Component {
  render() {
    const { id, name, description, gradient } = this.props;
    return (
      <PlaylistCardContainer>
        <PlaylistCardHeader
          style={{ background: gradient }}
          onClick={() => {
            document.location.href = `/playlist/${id}`;
          }}
        >
          {name}
        </PlaylistCardHeader>
        <PlaylistDescription>
          <p className="description">{description}</p>
        </PlaylistDescription>
      </PlaylistCardContainer>
    );
  }
}
