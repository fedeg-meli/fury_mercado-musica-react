import React, { Component } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const YoutubePlayerContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 25px;
  width: 384px;
  height: 216px;
  transition: all 250ms ease-in-out;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0);
  &.hide {
    bottom: -100%;
  }
`;

const CloseIcon = styled.button`
  display: block;
  width: 18px;
  height: 18px;
  background: url("/images/close_icon.png");
  background-size: cover;
  border: 0;
  cursor: pointer;
  outline: 0;
  margin-bottom: 10px;
`;

export default class YoutubePlayer extends Component {
  state = {
    show: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
    }
  }

  _onChange = event => {
    const playerStatus = event.target.getPlayerState();
    if (playerStatus === 0) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  onPlayerReady = event => {
    this.player = event.target;
  };

  closeVideo = () => {
    this.setState({
      show: false
    });
    this.props.changeVideoToCat();
    this.player.pauseVideo();
  };

  render() {
    const { show } = this.state;
    const { videoId } = this.props;
    const opts = {
      height: "216",
      width: "384",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <YoutubePlayerContainer className={show ? "" : "hide"}>
        <CloseIcon onClick={this.closeVideo}></CloseIcon>
        <YouTube
          id="video"
          videoId={videoId}
          opts={opts}
          onStateChange={this._onChange}
          onReady={this.onPlayerReady}
        />
      </YoutubePlayerContainer>
    );
  }
}
