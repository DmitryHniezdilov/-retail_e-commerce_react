import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearch } from "../../store/reducers/searchSlice";
import SvgIcon from "../SvgIcon";
import "./styles.scss";

const Search = ({ isDesktop, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector((state) => state.search);
  const [searchValueComponent, setSearchValueComponent] = useState("");

  const actionSearch = () => {
    dispatch(updateSearch(searchValueComponent));
    navigate("/catalogs");
    !isDesktop && onClose();
  };

  const handleOnSearch = () => {
    actionSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      actionSearch();
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setSearchValueComponent("");
    }
  }, [searchValue]);

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
        value={searchValueComponent}
        onChange={(e) => setSearchValueComponent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
