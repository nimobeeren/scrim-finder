import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import MapPool from "../containers/MapPool";
import PostLower from "./PostLower";
import "../../styles/Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.getTeamNameString = this.getTeamNameString.bind(this);
    this.getAuthor = this.getAuthor.bind(this);
    this.getAgeString = this.getAgeString.bind(this);
    this.getLevelString = this.getLevelString.bind(this);
    this.getMapList = this.getMapList.bind(this);
    this.getServerPrefString = this.getServerPrefString.bind(this);
  }

  getTeamNameString() {
    const { post } = this.props;

    if (post.body && post.body.teamName) {
      return post.body.teamName;
    } else {
      return "Anonymous";
    }
  }

  getAuthor() {
    const { post } = this.props;

    if (post.author && post.author.name && post.author.name.length > 0) {
      return "By " + post.author.name;
    } else {
      return "By Anonymous";
    }
  }

  getAgeString() {
    const { post } = this.props;

    if (!post.createdAt) {
      return null;
    }

    const age = Date.now() - new Date(post.createdAt);

    let seconds = age / 1000;
    if (seconds < 30) {
      return "Just now";
    }
    if (seconds < 60) {
      let floored = Math.floor(seconds);
      return `${floored} seconds ago`;
    }

    let minutes = seconds / 60;
    if (minutes < 60) {
      let floored = Math.floor(minutes);
      return `${floored} minute${floored === 1 ? "" : "s"} ago`;
    }

    let hours = minutes / 60;
    if (hours < 24) {
      let floored = Math.floor(hours);
      return `${floored} hour${floored === 1 ? "" : "s"} ago`;
    }

    let days = hours / 24;
    let floored = Math.floor(days);
    return `${floored} day${floored === 1 ? "" : "s"} ago`;
  }

  getLevelString() {
    const { post, levelNames } = this.props;

    if (post.body) {
      // Make sure we have a number
      let number = parseInt(post.body.level, 10);
      if (Number.isNaN(number)) {
        return "Unknown";
      }

      // Make sure number is in range of the defined levels
      if (number >= levelNames.length) {
        number = levelNames.length - 1;
      } else if (number < 0) {
        number = 0;
      }

      return levelNames[number];
    } else {
      return "Unknown";
    }
  }

  getMapList() {
    const { post } = this.props;
    if (!post.body) {
      return [];
    }
    return post.body.maps;
  }

  getServerPrefString() {
    const { post } = this.props;

    if (post.body) {
      const server = post.body.server;

      if (typeof server !== "boolean") {
        return "On/Off";
      } else if (server) {
        return "On";
      }
    }
    return "Off";
  }

  render() {
    const { post } = this.props,
      teamName = this.getTeamNameString(),
      author = this.getAuthor(),
      age = this.getAgeString(),
      level = this.getLevelString(),
      maps = this.getMapList(),
      server = this.getServerPrefString();

    return (
      <Card className="card post" title={teamName} note={author} subtitle={age}>
        <table className="post__fields">
          <tbody>
            <tr>
              <td>Level:</td>
              <td>{level}</td>
            </tr>
            <tr className="maps">
              <td>Maps:</td>
              <td>
                <MapPool maps={maps} />
              </td>
            </tr>
            <tr>
              <td>Server:</td>
              <td>{server}</td>
            </tr>
          </tbody>
        </table>
        <PostLower post={post} />
      </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  levelNames: PropTypes.array
};
Post.defaultProps = {
  levelNames: ["Unknown"]
};

export default Post;
