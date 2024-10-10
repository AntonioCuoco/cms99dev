import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { ParserHtml } from "../../parserHtml/parserHtml";
import HtmlParser from "react-html-parser";
import { Input } from "antd";
import "./bodyCreaContenuti.css";

const Body = () => {
  const [titolo, setTitolo] = useState("");
  const [bodyArticle, setBodyArticle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgCopertina, setImgCopertina] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2Modale, setVisible2Modale] = useState(false);
  const [visibleModaleChatGpt, setVisibleModaleChatGpt] = useState(false);
  const [listImage, setListImage] = useState([]);
  const [immagineImportata, setimmagineImportata] = useState(null);
  const [testoSplittato, setTestoSplittato] = useState([]);
  const [Category, setCategory] = useState([]);
  const [CategoryForImport, setCategoryForImport] = useState("");
  const [value, setValue] = useState('');

  useEffect(() => {
    (function async() {
      handleGetListImage();
      getDataCategory();
    })();
  }, []);

  const onChange = (e) => {
    setCategoryForImport(e.target.value);
  }

  const onChangeTitolo = (e) => {
    setTitolo(e.target.value);
  };

  const onChangeSubtitle = (e) => {
    setSubtitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Leggi e memorizza le immagini selezionate
      const imagePromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((imageDataArray) => {
        setSelectedImages([...selectedImages, ...imageDataArray]);
      });
    }
  };

  const handleSingleImageChange = (e) => {
  const imagePromises = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
        if (event.target.result != undefined || event.target.result != null) {
          setImgCopertina(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    });

    return imagePromises;

    // Promise.all(imagePromises).then((imageData) => {
    //   setImgCopertina([...imgCopertina, ...imageData]);
    // });
  };

  const handleSubmit = async () => {
    const dataToPost = {
      titleArticle: titolo,
      bodyArticle: value,
      imgCopertina: imgCopertina,
      category: CategoryForImport,
      subTitle: subtitle,
    };

    const listToPost = {
      listImage: selectedImages,
      dataDiInserimento: null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/cms/postArticle",
        dataToPost
      );
      const responseUpload = await axios.post(
        "http://localhost:8080/image/upload",
        listToPost
      );

      setTitolo("");
      setBodyArticle("");
      setSubtitle("");
      setImgCopertina(null);
      setCategoryForImport("");
      //gli input devono dipendere dai valori qui sopra
      // Ecco la risposta dal server
      console.log("Risposta dal server:", response.status + response.data);
      console.log("Risposta dal server di Upload:" + responseUpload.data);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.error("Errore durante la chiamata POST:", error);
    }
  };

  const handleGetListImage = async () => {
    try {
      const response = await axios.get("http://localhost:8080/image/getImg");
      setListImage(response.data);
      // Ecco la risposta dal server
      console.log("Risposta dal server: ", response.status);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.error("Errore durante la chiamata get della lista: ", error);
    }
  };

  const getDataCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cms/getCategory');
      setCategory(response.data);
      // Ecco la risposta dal server
      console.log('Risposta dal server:', response.status);
      console.log(response.data);
    } catch (error) {
      // Gestisci eventuali errori qui
      console.log('Errore durante la chiamata POST:', error.stack);
    }
  }

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleValueEditor = (value) => {
    setValue(value);
  }

  return (
    <div className="BodyLayout">
      <div className="wrapper-form-contenuti">
        <div>
          <label className="label-class">Blog Title: </label>
          <Input
            onChange={(e) => onChangeTitolo(e)}
          />
        </div>
        <div>
          <label className="label-class">Blog Description: </label>
          <Input
            onChange={(e) => onChangeSubtitle(e)}
          />
        </div>
        <div>
          <label className="label-class">Scegli Immagine Di Copertina: </label>
          <Input
            type="file"
            className="importImgCopertina"
            accept="image/*"
            onChange={(e) => handleSingleImageChange(e)}
          />
        </div>
        <div>
          <label className="label-class">Article Content:</label>
          <ReactQuill theme="snow" value={value} onChange={(value) => handleValueEditor(value)} modules={modules} />
        </div>
      </div>
      <div className="DivPreview">
        <div className="DivTitolo">
          <h3 style={{ color: "black" }}>categoria:</h3>
          <input
            type="text"
            className="inputTitle"
            onChange={(e) => onChange(e)}
          />
          {/* <h3 style={{ color: "black", marginLeft: 24 }}>subTitle:</h3>
          <input
            type="text"
            onChange={(e) => onChangeSubtitle(e)}
            className="inputSubtitle"
          /> */}
        </div>
        <div className="divBtn">
          <button onClick={() => handleSubmit()} className="btnPublica">
            Pubblica Articolo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
