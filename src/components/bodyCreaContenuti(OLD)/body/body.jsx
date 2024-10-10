import { useState } from "react";
import "./body.css";
import axios from "axios";
import { ColorPicker, Modal } from "antd";
import { useEffect } from "react";
import ChatGpt from "../../chatGpt/chatGpt";

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
  const [Category,setCategory] = useState([]);
  const [CategoryForImport,setCategoryForImport] = useState("");

  useEffect(() => {
    (function async() {
      handleGetListImage();
      getDataCategory();
    })();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const showModal2 = () => {
    setVisible2Modale(true);
  };

  const showModalChatGpt = () => {
    setVisibleModaleChatGpt(true);
  };

  const handleOk = () => {
    handleSubmit();
    setVisible(false);
  };

  const handleOk2 = () => {
    setVisible2Modale(false);
    setBodyArticle(bodyArticle + "\nimg");
    setTestoSplittato(bodyArticle.split("img"));
    console.log(testoSplittato);
    console.log(bodyArticle.split("img"));
  };

  const handleOkChatGpt = () => {
    setVisibleModaleChatGpt(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setimmagineImportata(null);
  };

  const handleCancel2 = () => {
    setVisible2Modale(false);
  };

  const handleCancelChatGpt = () => {
    setVisibleModaleChatGpt(false);
  };

  const onChange = (e) => {
    setCategoryForImport(e.target.value.toString());
    console.log("aa");
  }
  // };
  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };

  const onChangeTitolo = (e) => {
    setTitolo(e.target.value);
  };

  const onChangeBodyArticle = (e) => {
    setBodyArticle(e.target.value);
  };

  const onChangeSubtitle = (e) => {
    setSubtitle(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor("#" + color.toHex());
    console.log(color.toHex());
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

  const handleImmagineImportata = (e) => {
    setimmagineImportata(e.target.value);
  }

  const handleSubmit = async () => {
    const dataToPost = {
      titleArticle: titolo,
      bodyArticle: bodyArticle,
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

  const getDataCategory = async() => {
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

  return (
    <div className="BodyLayout">
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        className="modale-preview"
      >
        <div
          style={{ maxHeight: "400px", overflowY: "auto", width: 750 }}
          className="div-modale"
        >
          <div className="div-Preview1">
            <img
              src={imgCopertina}
              alt="imgCopertina"
              className="img-copertina-modale"
            />
            <h1>{titolo}</h1>
          </div>
          <div className="div-Preview3">
            {testoSplittato[0]}
            <img src={immagineImportata} className="img_articlePreview"></img>
            {testoSplittato[1]}
          </div>
        </div>
      </Modal>
      <Modal
        open={visible2Modale}
        onOk={(e) => handleOk2(e)}
        onCancel={handleCancel2}
        closable={false}
        className="modale-preview"
      >
        <div className="div-modale">
          <div className="div-Preview1">
            {/* <img src={imgCopertina} alt="imgCopertina" className="img-copertina-modale"/> */}
            <h1>Scegli Immagine</h1>
          </div>
          <div className="div-Preview2">
            {listImage.map((ithElement) =>
              ithElement.listImage.map((ithSubElement) => (
                <div key={ithSubElement}>
                  <img
                  src={ithSubElement}
                  className="img_import_modale"
                  style={{ width: 250, height: 250 }}
                  />
                  <input type="checkbox" onChange={(e) => handleImmagineImportata(e)} value={ithSubElement}/>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
      <Modal
        open={visibleModaleChatGpt}
        onOk={(e) => handleOkChatGpt(e)}
        onCancel={handleCancelChatGpt}
        closable={false}
        className="modale-ChatGpt"
      >
        <div className="div-modale">
          {/* <ChatGpt /> */}
        </div>
      </Modal>
      <div className="divBodyArticle">
        <div className="DivTitoloArticolo">
          {/* toolbar con grassetto,aggiunta immagini ecc.... */}
          <h3 className="titlePage">Crea Un Nuovo Articolo:</h3>
          <div className="DivToolbar">
            {/* <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="input-upload"
                        /> */}
            <button className="btn-importImage" onClick={() => showModal2()}>
              Scegli immagine
            </button> 
              {/* <Select 
                showSearch
                placeholder="Select a Category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[Category]} 
              />*/}
              <select className="mySelect" onChange={(e) => onChange(e)}>
                <option value="">Seleziona...</option>
                {Category.map((ithCategory) => (
                  <option key={ithCategory.category}  value={ithCategory.category}>{ithCategory.category}</option>
                ))}
              </select>
              <input
                type="file"
                className="importImgCopertina"
                accept="image/*"
                onChange={handleSingleImageChange}
              />
            <ColorPicker
              showText
              className="colorPicker"
              onChange={(color) => handleColorChange(color)}
            />
          </div>
        </div>
        <div className="DivScritturaArticolo">
          <textarea
            onChange={(e) => onChangeBodyArticle(e)}
            className="inputBodyArticle"
            value={bodyArticle}
            style={{ color: selectedColor ? selectedColor : "#000" }}
          />
        </div>
      </div>

      <div className="DivPreview">
        <div className="DivTitolo">
          <h3 style={{ color: "black" }}>titolo:</h3>
          <input
            type="text"
            onChange={(e) => onChangeTitolo(e)}
            className="inputTitle"
          />
          <h3 style={{ color: "black", marginLeft: 24 }}>subTitle:</h3>
          <input
            type="text"
            onChange={(e) => onChangeSubtitle(e)}
            className="inputSubtitle"
          />
        </div>
        <div className="divBtn">
          {/* <Upload {...props} className="importImgCopertina" onChange={(e) => handleSingleImageChange(e)} accept="image/*" showUploadList={false}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
          <button onClick={() => showModal()} className="btnPublica">
            Pubblica Articolo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
