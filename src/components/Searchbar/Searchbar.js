import s from "../Searchbar/searchbar.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../img/search.svg";

class Searchbar extends Component {
  state = {
    search: "",
  };
  handleInput = (evt) => {
    this.setState({ search: evt.target.value });
  };
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.search !== "") {
      this.props.onSubmit(this.state.search);
      this.setState({ search: "" });
    }
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <Logo />
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onInput={this.handleInput}
            value={this.state.search}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
