import React, { Component } from "react";
import styled from "styled-components";
import Button from "@andes/button";
import Card from "@andes/card";
import Spinner from "@andes/spinner";
import Snackbar from "@andes/snackbar";
import Container from "../components/shared/Container";
import { fetchRequest } from "../helpers/navigation";
import PlaylistGrid from "../components/PlaylistGrid";
import ENDPOINTS from "../helpers/ENDPOINTS";
import { SomethingHappened } from "../components/shared/SomethingHappened";
import PlaylistIcon from "../icons/playlist_icon.png";
import DisconnectedIcon from "../icons/disconnected_icon.png";
import CreatePlaylist from "../components/CreatePlaylist";
import { getUserName, getUserData } from "../helpers/getUserData";

const Header = styled.div`
  color: #fff;
  .welcome-title {
    font-size: 42px;
    margin-bottom: 0;
  }
  .welcome-subtitle {
    margin: 0;
    font-family: "Lato";
    font-weight: "300";
    font-size: 22px;
  }
`;

const CardStyled = styled(Card)`
  margin-top: 20px;
  padding-top: 10px;
  .header-card {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .title {
      flex: 1;
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
  }
`;

export default class Home extends Component {
  state = {
    playlists: [],
    loading: false,
    error: false,
    createPlaylist: false,
    feedbackMessage: {
      type: "success",
      message: "Tu playlist fue creada!",
      show: false
    },
    user: {
      id: "",
      name: "",
      email: ""
    }
  };

  componentDidMount() {
    this.setState({
      user: getUserData()
    });
    this.getPlaylists();
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  getPlaylists = () => {
    const user = getUserData();
    this.toggleLoading();
    fetchRequest({
      method: "get",
      url: ENDPOINTS.getPlaylists.replace(":id", user.id)
    })
      .then(response => {
        this.setState({
          error: false,
          playlists: response
        });
        this.toggleLoading();
      })
      .catch(error => {
        this.toggleLoading();
        this.setState({
          error: true
        });
      });
  };

  toggleCreatePlaylistModal = () => {
    this.setState({
      createPlaylist: !this.state.createPlaylist
    });
  };

  showFeedbackMessage = feedback => {
    this.setState({
      feedbackMessage: {
        type: feedback.type,
        message: feedback.message,
        show: feedback.show
      }
    });
  };

  clearFeedbackMessage = () => {
    this.setState({
      feedbackMessage: {
        type: "success",
        message: "",
        show: false
      }
    });
  };

  createPlaylist = newPlaylist => {
    this.toggleLoading();
    this.clearFeedbackMessage();
    fetchRequest({
      method: "post",
      url: ENDPOINTS.createPlaylist.replace(":id", this.state.user.id),
      data: newPlaylist
    })
      .then(() => {
        this.toggleLoading();
        this.toggleCreatePlaylistModal();
        this.getPlaylists();
        this.showFeedbackMessage({
          type: "success",
          message: `Tu playlist "${newPlaylist.name}" fue creada exitosamente`,
          show: true
        });
      })
      .catch(error => {
        this.toggleLoading();
        this.showFeedbackMessage({
          type: "error",
          message: error.data.error,
          show: true
        });
      });
  };

  render() {
    const { playlists, loading, error, createPlaylist } = this.state;
    const { name, email } = this.state.user;
    return (
      <div>
        <Snackbar
          message={this.state.feedbackMessage.message}
          type={this.state.feedbackMessage.type}
          show={this.state.feedbackMessage.show}
          delay={5000}
        />
        <CreatePlaylist
          visible={createPlaylist}
          createAction={this.createPlaylist}
        ></CreatePlaylist>
        <Container>
          <Header>
            <h1 className="welcome-title">Hola {name.split(" ")[0]}</h1>
            <p className="welcome-subtitle">Escuchá música sin límites</p>
          </Header>
          <CardStyled>
            <div className="header-card">
              <h2 className="title">Tus playlists</h2>
              {playlists.length > 0 && (
                <Button onClick={this.toggleCreatePlaylistModal}>
                  Crear playlist
                </Button>
              )}
            </div>
            {loading && <Spinner></Spinner>}
            {!loading && <PlaylistGrid collection={playlists}></PlaylistGrid>}
            {!loading && playlists.length === 0 && !error && (
              <SomethingHappened
                message="Aún no creaste ninguna playlist"
                textAction="Crear playlist"
                action={this.toggleCreatePlaylistModal}
                icon={PlaylistIcon}
              ></SomethingHappened>
            )}
            {!loading && error && (
              <SomethingHappened
                message="Algo sucedio al intentar recuperar tus playlists"
                textAction="Intentar de nuevo"
                action={this.getPlaylists}
                icon={DisconnectedIcon}
              ></SomethingHappened>
            )}
          </CardStyled>
        </Container>
      </div>
    );
  }
}
