import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { PiMagnifyingGlass } from 'react-icons/pi';

export default function SearchBar({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();

    onSearch(event.currentTarget.elements.query.value.trim());
  }

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <label className={css.searchBoxLabel}>
          <input name='query' type='text' autoComplete='off' autoFocus placeholder='Search images and photos' className={css.searchBox} />
          <button type='submit' className={css.searchButton}>
            <PiMagnifyingGlass />
          </button>
        </label>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
