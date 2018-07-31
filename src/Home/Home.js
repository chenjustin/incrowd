import React from 'react';

class Home extends React.Component {
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
            <div>Hello sir</div>
        );
    }
}

export default Home;