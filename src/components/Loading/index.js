import { useSelector } from "react-redux";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.general);
  const activeLoading = isLoading ? "flex" : "";

  return (
    <section className="loading">
      <div className="loading__inner">
        <p className="loading__text">Loading...</p>
      </div>
    </section>
    // <Box className={classes.loading} style={{ display: `${activeLoading}` }}>
    //   <CircularProgress />
    // </Box>
  );
};

export default Loading;
