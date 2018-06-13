import React, { Component } from "react";
import API from "./API";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "React Image Search",
      searchTerm: "",
      loading: false,
      images: []
    };
  }
  searchTermChanged(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }
  formSubmitted(event) {
    event.preventDefault();

    this.setState({
      loading: true
    });

    API.search(this.state.searchTerm).then(images => {
      this.setState({
        loading: false,
        images
      });
    });
  }

  render() {
    const { title, searchTerm, loading, images } = this.state;
    return (
      <div className="App text-center">
        <h1>{title}</h1>
        <form onSubmit={this.formSubmitted.bind(this)}>
          <label htmlFor="searchTerm">Search Term</label>
          <input
            type="text"
            onChange={this.searchTermChanged.bind(this)}
            id="searchTerm"
            name="searchTerm"
            value={searchTerm}
          />
          <button type="submit">Search</button>
        </form>
        {loading ? (
          <img
            id="loadingImage"
            alt="loading"
            src="https://i.imgur.com/LVHmLnb.gif"
          />
        ) : (
          ""
        )}

        <section>
          {images.map((image, index) => {
            return (
              <img
                className="col-md-4"
                key={index}
                src={image.image_url[0]}
                alt={image.description}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
