import React, { Component } from "react";
import styled from "styled-components";
import Modal from "@andes/modal";
import Snackbar from "@andes/snackbar";
import { fetchRequest } from "../helpers/navigation";
import ENDPOINTS from "../helpers/ENDPOINTS";

const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const TrackCard = styled.button`
  display: flex;
  flex-direction: column;
  background: 0;
  border: 0;
  text-align: left;
  margin-bottom: 20px;
  outline: 0;
  cursor: pointer;
  &.selected {
    filter: brightness(0.5);
    pointer-events: none;
  }
  .thumbnail {
    width: 200px;
    height: 200px;
  }
  .details {
    font-weight: 400;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
    font-family: "Lato";
    .songName {
      font-size: 18px;
      font-family: "proxima_novasemibold";
      margin-bottom: 0;
    }
    .albumName {
      font-size: 16px;
      margin: 0;
      margin-top: 5px;
    }
    .artistName {
      font-size: 12px;
      margin: 0;
      margin-top: 5px;
    }
  }
`;

const SnackbarOverlayModal = styled(Snackbar)`
  z-index: 9999;
`;

export default class AddMusic extends Component {
  state = {
    tracks: [],
    added: [],
    feedbackMessage: {
      type: "success",
      message: "Tu playlist fue creada!",
      show: false
    }
  };

  componentDidMount() {
    this.getMusic();
  }

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

  saveSongInPlaylist = track => {
    this.clearFeedbackMessage();
    fetchRequest({
      method: "post",
      url: ENDPOINTS.saveSongPlaylist
    })
      .then(response => {
        this.setState(prevState => ({
          added: [...prevState.added, track.id]
        }));
        this.showFeedbackMessage({
          type: "success",
          message: `Agregaste '${track.title}' de ${track.artist} a tu playlist`,
          show: true
        });
      })
      .catch(error => {
        this.showFeedbackMessage({
          type: "error",
          message: error.data.error,
          show: true
        });
      });
  };

  getMusic = () => {
    fetchRequest({
      method: "get",
      url: ENDPOINTS.tracksMany
    }).then(response => {
      this.setState({
        tracks: response
      });
    });
  };

  render() {
    const { tracks, added } = this.state;
    const { visible, onClose } = this.props;
    return (
      <div>
        <SnackbarOverlayModal
          message={this.state.feedbackMessage.message}
          type={this.state.feedbackMessage.type}
          show={this.state.feedbackMessage.show}
          delay={5000}
        />
        <Modal
          visible={visible}
          type="full"
          title={"Agregar música"}
          onClose={() => {
            this.clearFeedbackMessage();
            if (added.length === 0) {
              onClose(false);
            } else {
              onClose(true);
            }
          }}
        >
          <TracksGrid>
            {tracks.map((track, i) => {
              return (
                <TrackCard
                  className={
                    this.state.added.includes(track.id) ? "selected" : ""
                  }
                  onClick={() => {
                    this.saveSongInPlaylist(track);
                  }}
                  key={i}
                >
                  <img src={track.image} className="thumbnail"></img>
                  <div className="details">
                    <p className="songName">{track.title}</p>
                    <p className="albumName">{track.album}</p>
                    <p className="artistName">{track.artist}</p>
                  </div>
                </TrackCard>
              );
            })}
          </TracksGrid>
        </Modal>
      </div>
    );
  }
}
