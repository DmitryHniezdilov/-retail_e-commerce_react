import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearch } from "../../store/reducers/searchSlice";
import SvgIcon from "../SvgIcon";
import "./styles.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleOnSearch = () => {
    dispatch(updateSearch(searchValue));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(updateSearch(searchValue));
    }
  };

  return (
    <div className="search">
      <button
        className="search__btn"
        aria-hidden="true"
        onClick={handleOnSearch}
      >
        <SvgIcon addСlass="search__icon" icon="search" />
      </button>
      <input
        type="text"
        className="search__input"
        placeholder="search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
