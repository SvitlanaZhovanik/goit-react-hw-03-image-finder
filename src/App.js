import s from "./App.module.css";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import Searchbar from "./components/Searchbar/Searchbar";
import getImg from "./search/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Error from "./components/Error/Error";
import Modal from "./components/Modal/Modal";
import HomePage from "./components/HomePage/HomePage";

class App extends Component {
  state = {
    query: "",
    cards: [],
    error: null,
    page: 1,
    itemToScroll: null,
    cardImg: null,
    imgAlt: null,
    showModal: false,
    isLoading: false,
    button: false,
  };
  componentDidUpdate(_, prevState) {
    const { query, cards, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      if (prevState.query !== query) {
        this.setState({
          page: 1,
          cards: [],
          itemToScroll: null,
          button: false,
          isLoading: false,
        });
      }
      this.getImage();
    }
    if (prevState.cards !== cards && page > 1) {
      document.getElementById(this.state.itemToScroll)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  getImage = async () => {
    try {
      this.setState({ isLoading: true });
      const { query, page } = this.state;
      getImg(query, page).then((cardsNew) => {
        if (cardsNew.length === 0) {
          toast("😿 Sorry, there aren't pictures here", {
            position: "bottom-center",
            autoClose: 3000,
          });
          return this.setState({ isLoading: false, button: false });
        }
        this.setState({
          cards: page === 1 ? cardsNew : [...this.state.cards, ...cardsNew],
          itemToScroll: page === 1 ? null : cardsNew[0].id,
          button: true,
          isLoading: false,
        });
      });
    } catch (error) {
      this.setState({ error, button: false, isLoading: false });
    }
  };
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
    const { error, cards, showModal, cardImg, imgAlt, isLoading, button } =
      this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.receiveRequest} />
        {cards.length === 0 && !isLoading && !error && <HomePage />}

        {error && <Error />}
        {cards.length > 0 && (
          <ImageGallery
            cards={this.state.cards}
            onClick={this.toggleModal}
            imgData={this.handleImgClick}
          />
        )}
        {isLoading && (
          <div className={s.wrapper}>
            <Loader
              arialLabel="loading-indicator"
              type="Hearts"
              color="#e60e0e"
              height="60"
              width="60"
            />
          </div>
        )}
        {button && !isLoading && <Button onClick={this.handleButtonClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={cardImg} alt={imgAlt} />
          </Modal>
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
export default App;
