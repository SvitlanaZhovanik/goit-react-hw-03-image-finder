import s from "./App.module.css";
import Cat from "./img/Cat.gif";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import Searchbar from "./components/Searchbar/Searchbar";
import getImg from "./search/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Error from "./components/Error/Error";
import Modal from "./components/Modal/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class App extends Component {
  state = {
    query: "",
    cards: [],
    error: null,
    page: 1,
    status: Status.IDLE,
    itemToScroll: null,
    cardImg: null,
    imgAlt: null,
    showModal: false,
  };
  async componentDidUpdate(_, prevState) {
    const { query, cards, page } = this.state;
    try {
      if (prevState.query !== query) {
        this.setState({
          page: 1,
          cards: [],
          status: Status.PENDING,
          itemToScroll: null,
        });
      }
      if (prevState.query !== query && page === 1) {
        const cardsPromise = getImg(query, page);
        cardsPromise.then((cards) => {
          if (cards.length === 0) {
            this.setState({ status: Status.REJECTED });
            return;
          }
          this.setState({ cards, status: Status.RESOLVED });
        });
      }
      if (prevState.page !== page) {
        this.setState({
          status: Status.PENDING,
        });
        const cardsPromise = getImg(query, page);
        cardsPromise.then((cardsNew) => {
          if (cardsNew.length === 0) {
            this.setState({ status: Status.REJECTED });
            return;
          }
          this.setState({
            cards: [...cards, ...cardsNew],
            itemToScroll: cardsNew[0].id,
            status: Status.RESOLVED,
          });
        });
      }
    } catch (error) {
      this.setState({ error, status: Status.REJECTED });
    }
    if (prevState.cards !== cards && page > 1) {
      document.getElementById(this.state.itemToScroll)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  receiveRequest = (query) => {
    this.setState({ query });
  };
  handleButtonClick = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };
  handleImgClick = (cardImg, imgAlt) => {
    this.setState({ cardImg, imgAlt });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { status, showModal, cardImg, imgAlt } = this.state;
    if (status === "idle") {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={this.receiveRequest} />
          <div className={s.wrapper}>
            <img className={s.img} src={Cat} width="600px" alt="Cat prints" />
          </div>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className={s.wrapper}>
          <Loader
            arialLabel="loading-indicator"
            type="MutatingDots"
            color="#1a84db"
            secondaryColor="#b72de0"
          />
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div>
          <Searchbar onSubmit={this.receiveRequest} />
          <Error />
        </div>
      );
    }

    if (status === "resolved") {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={this.receiveRequest} />
          <ImageGallery
            cards={this.state.cards}
            onClick={this.toggleModal}
            imgData={this.handleImgClick}
          />
          <Button onClick={this.handleButtonClick} />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={cardImg} alt={imgAlt} />
            </Modal>
          )}
        </div>
      );
    }
  }
}

export default App;
