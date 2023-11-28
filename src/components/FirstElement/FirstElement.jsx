import { useEffect, useState } from "react";
import "./FirstElement.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const FirstElement = () => {
  const [dataResponseArticle, setDataResponseArticle] = useState([]);
  const [dataResponseCategory, setDataResponseCategory] = useState([]);
  const [dataResponseTopic, setDataResponseTopic] = useState([]);
  const [dataResponseImage, setDataResponseImage] = useState([]);

  useEffect(() => {
    (function async() {
      getDataArticle();
      getDataCategory();
      getDataTopic();
      getDataImage();
    })();
  }, []);

  const getDataArticle = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cms/getArticle");
      setDataResponseArticle(response.data);
      // Ecco la risposta dal server
      console.log("Risposta dal server 1:", response.status);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.error("Errore durante la chiamata GET1:", error);
    }
  };

  const getDataCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cms/getCategory");
      setDataResponseCategory(response.data);
      // Ecco la risposta dal server
      console.log("Risposta dal server 2:", response.status);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.error("Errore durante la chiamata GET2:", error);
    }
  };

  const getDataTopic = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cms/getTopic");
      setDataResponseTopic(response.data);
      // Ecco la risposta dal server
      console.log("Risposta dal server3:", response.status);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.error("Errore durante la chiamata GET 3:", error);
    }
  };

  const getDataImage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/image/getImg");
      setDataResponseImage(response.data);
      // Ecco la risposta dal server
      console.log("Risposta dal server Image:", response.status);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.error("Errore durante la chiamata GET Image:", error);
    }
  };

  return (
    <div className="FirstElementLayout">
        <div className="SecondElement">
          <p style={{ color: "white" }}>
            numero di post: {dataResponseArticle.length}
          </p>
        </div>
        <div className="ThirdElement">
        <p style={{ color: "white" }}>
          numero di categorie: {dataResponseCategory.length}
        </p>
        </div>
        <div className="FourElement">
        <p style={{ color: "white" }}>
          numero di topic: {dataResponseTopic.length}
        </p>
        </div>
        <div className="FiveElement">
        <p style={{ color: "white" }}>
          numero di immagini: {dataResponseImage.length}
        </p>
        </div>
    </div>
  );
};

export default FirstElement;
