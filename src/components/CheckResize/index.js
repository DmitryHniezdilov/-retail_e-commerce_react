import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInnerWidth } from "../../store/reducers/innerWidthSlice";

const CheckResize = () => {
  const dispatch = useDispatch();

  const handleWindowResize = () => {
    dispatch(setInnerWidth(window.innerWidth));
  };

  handleWindowResize();

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
};

export default CheckResize;
