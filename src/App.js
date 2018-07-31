import React, { Component } from 'react';
import './App.css';
import Article from './components/article/article';
import InfiniteScroll from 'react-infinite-scroller';


class App extends Component {
  constructor() {
    super();
    fetch('https://www.stellarbiotechnologies.com/media/press-releases/json?limit=2&offset=1')
      .then(
        function(response) {
          console.log(response);
          if (response.status !== 200) {
            console.log("There might have been a problem!");
            return;
          }

          response.json().then(function(data) {
            console.log(data);
          });
        }
      )
      .catch(function(err) {
        console.log("Fetch error", err);
      });
  }


  render() {
    return (
      // <div style="height:700px;overflow:auto;">
      //   <InfiniteScroll
      //       pageStart={0}
      //       loadMore={loadFunc}
      //       hasMore={true || false}
      //       loader={<div className="loader" key={0}>Loading ...</div>}
      //       useWindow={false}
      //   >
      //       {items}
      //   </InfiniteScroll>
      // </div>
      <div>Hello sir</div>
    );
  }
}

export default App;