import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import BlackBackground from "./components/shared/BlackBackground";
import Playlist from "./containers/Playlist";
import YoutubePlayer from "./components/YoutubePlayer";

export default class App extends Component {
  state = {
    videoId: ""
  };

  loadYoutubeVideo = id => {
    this.setState({
      videoId: id
    });
  };

  changeVideoToCat = () => {
    this.setState({
      videoId: "sW00p9VJ34A"
    });
  };

  render() {
    const { videoId } = this.state;
    return (
      <div className="App">
        <YoutubePlayer
          videoId={videoId}
          changeVideoToCat={this.changeVideoToCat}
        ></YoutubePlayer>
        <BlackBackground />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/playlist/:id">
              <Playlist loadYoutubeVideo={this.loadYoutubeVideo} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
