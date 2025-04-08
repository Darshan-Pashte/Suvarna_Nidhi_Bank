import classes from "../../containers/MainContainer/MainContainer.module.css";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Loader = ({ loading }) => {


  const [LoaderSrc, setLoaderSrc] = useState(null);
  const bankNames = process.env.REACT_APP_FLAVOUR;

  useEffect(() => {
    const importedImage = async () => {
      const backgroundimage = await import(
        `../../assets/Banks/${bankNames}/loader.json`
      );
      setLoaderSrc(backgroundimage.default);
    };
    importedImage();
  }, [bankNames]);

  return (
    <>
      {loading && (
        <div className={classes.loader}>
          <Lottie animationData={LoaderSrc} />
        </div>
      )}
    </>
  );
};

export default Loader;
