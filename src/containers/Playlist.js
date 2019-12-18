import React, { Component } from "react";
import styled from "styled-components";
import Spinner from "@andes/spinner";
import Button from "@andes/button";
import Card from "@andes/card";
import Snackbar from "@andes/snackbar";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableData
} from "@andes/table";
import Container from "../components/shared/Container";
import { fetchRequest } from "../helpers/navigation";
import ENDPOINTS from "../helpers/ENDPOINTS";
import { SomethingHappened } from "../components/shared/SomethingHappened";
import SearchIcon from "../icons/search_icon.png";
import DisconnectedIcon from "../icons/disconnected_icon.png";
import AddMusic from "../components/AddMusic";
import { getUserData } from "../helpers/getUserData";

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
  padding-bottom: 0px;
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

const TableStyled = styled(Table)`
  width: calc(100% + 64px);
  margin-left: -32px;
  border: 0;
`;

const PlayButton = styled.button`
  display: block;
  width: 24px;
  height: 24px;
  background: url("/images/play_icon.png");
  background-size: cover;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

const DeleteButton = styled.button`
  display: block;
  width: 24px;
  height: 24px;
  background: url("/images/delete_icon.png");
  background-size: cover;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

export default class Playlist extends Component {
  state = {
    playlist: {},
    loading: false,
    addMusicModal: false,
    error: "",
    feedbackMessage: {
      type: "success",
      message: "Tu playlist fue creada!",
      show: false
    },
    user: {}
  };

  componentDidMount() {
    this.setState({
      user: getUserData()
    });
    this.getPlaylistData();
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
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

  showFeedbackMessage = feedback => {
    this.setState({
      feedbackMessage: {
        type: feedback.type,
        message: feedback.message,
        show: feedback.show
      }
    });
  };

  getPlaylistData = id => {
    this.toggleLoading();
    const playlistId = this.props.match.params.id;
    const user = getUserData();
    fetchRequest({
      method: "get",
      url: ENDPOINTS.playlist
        .replace(":id", user.id)
        .replace(":playlistId", playlistId)
    })
      .then(response => {
        this.toggleLoading();
        this.setState({
          playlist: response
        });
      })
      .catch(error => {
        this.toggleLoading();
        this.setState({
          error: error.data.error
        });
      });
  };

  formatLength = time => {
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  toggleAddMusicModal = refresh => {
    this.setState(
      {
        addMusicModal: !this.state.addMusicModal
      },
      () => {
        if (!this.state.addMusicModal) {
          if (refresh) {
            this.getPlaylistData();
          }
        }
      }
    );
  };

  deleteSong = id => {
    this.toggleLoading();
    this.clearFeedbackMessage();
    const user = getUserData();
    const playlistId = this.props.match.params.id;
    fetchRequest({
      method: "delete",
      url: ENDPOINTS.deleteSongPlaylist
        .replace(":id", user.id)
        .replace(":playlistId", playlistId)
        .replace(":trackId", id)
    })
      .then(response => {
        this.toggleLoading();
        this.getPlaylistData();
      })
      .catch(error => {
        this.toggleLoading();
        this.showFeedbackMessage({
          message: error.data.error,
          type: "error",
          show: true
        });
      });
  };

  render() {
    const { loading, error, addMusicModal } = this.state;
    const { loadYoutubeVideo } = this.props;
    const { name, description, tracks } = this.state.playlist;
    return (
      <div>
        <Snackbar
          message={this.state.feedbackMessage.message}
          type={this.state.feedbackMessage.type}
          show={this.state.feedbackMessage.show}
          delay={5000}
        />
        {loading && <Spinner></Spinner>}
        <AddMusic visible={addMusicModal} playlistId={this.props.match.params.id} onClose={this.toggleAddMusicModal} />
        <Container>
          <Header>
            <h1 className="welcome-title">{name}</h1>
            <p className="welcome-subtitle">{description}</p>
          </Header>
          <CardStyled>
            <div className="header-card">
              <h2 className="title">Tu música</h2>
              {tracks && tracks.length > 0 && (
                <Button onClick={this.toggleAddMusicModal}>
                  Agregar música
                </Button>
              )}
            </div>
            {error !== "" && (
              <SomethingHappened
                message={error}
                action={this.getPlaylistData}
                textAction="Intentar de nuevo"
                icon={DisconnectedIcon}
              />
            )}
            {tracks && tracks.length === 0 && (
              <SomethingHappened
                message="Aún no agregaste ninguna canción"
                textAction="Agregar música"
                action={this.toggleAddMusicModal}
                icon={SearchIcon}
              />
            )}
            {tracks && tracks.length > 0 && (
              <TableStyled>
                <TableHead>
                  <TableHeader>&nbsp;</TableHeader>
                  <TableHeader>TÍTULO</TableHeader>
                  <TableHeader>GENERO</TableHeader>
                  <TableHeader>ARTISTA</TableHeader>
                  <TableHeader>ÁLBUM</TableHeader>
                  <TableHeader>DURACIÓN</TableHeader>
                  <TableHeader>&nbsp;</TableHeader>
                </TableHead>
                <TableBody>
                  {tracks &&
                    tracks.map((track, i) => {
                      return (
                        <TableRow key={i} selected={false}>
                          <TableData data-title="Reproducir">
                            <PlayButton
                              onClick={() => {
                                loadYoutubeVideo(track.link);
                              }}
                            />
                          </TableData>
                          <TableData data-title="Titulo">
                            {track.title}
                          </TableData>
                          <TableData data-title="Artista">
                            {track.genre}
                          </TableData>
                          <TableData data-title="Artista">
                            {track.artist}
                          </TableData>
                          <TableData data-title="Albúm">
                            {track.album}
                          </TableData>
                          <TableData data-title="Duración">
                            {this.formatLength(track.length)}
                          </TableData>
                          <TableData data-title="Acciones">
                            <DeleteButton
                              onClick={() => {
                                this.deleteSong(track.id);
                              }}
                            />
                          </TableData>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </TableStyled>
            )}
          </CardStyled>
        </Container>
      </div>
    );
  }
}
