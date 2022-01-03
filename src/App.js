import s from "./App.module.css";
import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import getImg from "./search/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    query: "",
    cards: [],
    error: null,
    page: 1,
  };
  async componentDidUpdate(_, prevState) {
    const { query, cards, page } = this.state;
    try {
      if (prevState.query !== query) {
        this.setState({
          page: 1,
          cards: [],
        });
      }
      if (prevState.query !== query && page === 1) {
        const cardsPromise = getImg(query, page);
        cardsPromise.then((cards) => this.setState({ cards }));
      }
      if (prevState.page !== page) {
        const cardsPromise = getImg(query, page);
        cardsPromise.then((cardsNew) =>
          this.setState({
            cards: [...cards, ...cardsNew],
            currentIdScroll: cardsNew[0].id,
          })
        );
      }
    } catch (error) {
      this.setState({ error });
    }
    if (prevState.cards !== cards) {
      document.getElementById("#button")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  receiveRequest = (query) => {
    this.setState({ query });
  };
  handleButtonClick = () => {
    this.setState({ page: this.state.page + 1 });
  };
  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.receiveRequest} />
        <ImageGallery cards={this.state.cards} />
        <Button onClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default App;
