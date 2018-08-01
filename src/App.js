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

    fetch('https://www.stellarbiotechnologies.com/media/press-releases/json?limit=1&offset=' + this.state.offset.toString())
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log("There might have been a problem!");
            return;
          }

          response.json().then(function(data) {
            let articles = self.state.articles;
            data.news.forEach((article, index) => {
              articles.push(data.news);
            })

            self.setState({
              articles: articles,
              offset: self.state.offset + 1
            });
          });
        }
      )
      .catch(function(err) {
        console.log("Fetch error", err);
      });
  }

  render() {
    const loader = <div>Loading ...</div>;

    var items = [];

    console.log(this.state.articles);

    this.state.articles.forEach((article, index) => {
      console.log(article[index], index);
      items.push(
        <Article 
          title = {article[index].title}
          published = {article[index].published}
          key = {article[index].title + article[index].published}
        />
      );
    });

    return (
      // <div>{items}</div>
      <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchArticles.bind(this)}
          hasMore={this.state.hasMore}
          loader={loader}
          useWindow={true}
      >
          {items}
      </InfiniteScroll>
    );
  }
}

export default App;