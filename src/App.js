import React, { Component } from 'react';
import './App.css';
import Article from './components/article/article';
import InfiniteScroll from 'react-infinite-scroller';

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      offset: 0,
      hasMore: true,
    }
  }

  componentDidMount() {
    this.fetchArticles(this.state.offset);
  }

  fetchArticles() {
    var self = this;

    fetch('https://www.stellarbiotechnologies.com/media/press-releases/json?limit=3&offset=' + this.state.offset.toString())
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log("There might have been a problem!");
            return;
          }

          response.json().then(function(data) {
            if(data.news.length == 0) {
              self.setState({
                hasMore: false
              });
            } else {
              let articles = self.state.articles;
              data.news.forEach((article, index) => {
                articles.push(article);
              })
  
              self.setState({
                articles: articles,
                offset: self.state.offset + 3
              });
            }
          });
        }
      )
      .catch(function(err) {
        console.log("Fetch error", err);
      });
  }

  render() {
    const loader = <div>Loading...</div>;

    var items = [];

    this.state.articles.forEach((article, index) => {
      items.push(
        <Article 
          title = {article.title}
          published = {article.published}
          key = {article.title + article.published}
        />
      );
    });

    return (
      <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchArticles.bind(this)}
          hasMore={this.state.hasMore}
          loader={loader}
          useWindow={true}
          threshold={2}
      >
        <div class="article-container">
          {items}
        </div>
      </InfiniteScroll>
    );
  }
}

export default App;