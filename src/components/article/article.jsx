import React, { Component } from 'react';

class Article extends Component {

  render() {
    return (
        <div class="article">
          <h1>{this.props.title}</h1>
          <span><b>Published:</b> {this.props.published}</span>
        </div>
    );
  }
}

export default Article;