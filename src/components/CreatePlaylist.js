import React, { Component } from "react";
import styled from "styled-components";
import Button from "@andes/button";
import Modal from "@andes/modal";
import TextField from "@andes/textfield";

const ModalContainer = styled(Modal)`
  font-family: "proxima_novasemibold";
  padding: 0;

  .title {
    color: rgba(0, 0, 0, 0.8);
  }
`;

export default class CreatePlaylist extends Component {
  state = {
    name: "",
    description: ""
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate(prevProps) {
    const prevVisible = prevProps.visible;
    const currentVisible = this.props.visible;
    if (prevVisible !== currentVisible) {
      if (!currentVisible) {
        this.setState({
          name: "",
          description: ""
        });
      }
    }
  }

  render() {
    const { name, description } = this.state;
    const { createAction, visible } = this.props;
    return (
      <ModalContainer visible={visible} title="Crear playlist">
        <div className="demo-modal">
          <TextField
            name="name"
            autoFocus
            label="¿Como se llamara tu playlist?"
            value={name}
            onChange={this.handleInput}
          ></TextField>
          {name.length >= 3 && (
            <TextField
              name="description"
              multiline
              label="Descripción"
              value={description}
              onChange={this.handleInput}
            ></TextField>
          )}

          <Button
            disabled={name.length < 3}
            onClick={() => {
              createAction({
                name,
                description: description === "" ? null : description
              });
            }}
          >
            Crear playlist
          </Button>
        </div>
      </ModalContainer>
    );
  }
}
