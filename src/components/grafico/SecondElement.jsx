import axios from "axios";
import "./SecondElement.css";
import { useState } from "react";

const SecondElement = () => {
    const [Category,setCategory] = useState("");
    const [Topic,setTopic] = useState("");
    // const [flagStart,setFlagStart] = useState(false);

    const sendDataCategory = async(e) => {
        e.preventDefault();

        const categoryObject = {
            category: Category
        }

        try {
          const response = await axios.post('http://localhost:8080/cms/postCategory',categoryObject);
    
          // Ecco la risposta dal server
          console.log('Risposta dal server:', response.status);
        } catch (error) {
          // Gestisci eventuali errori qui
          console.log('Errore durante la chiamata POST:', error.stack);
        }
    }

    const sendDataTopic = async(e) => {
        e.preventDefault();

        const topicObject = {
            topic: Topic   
        }

        try {
            const response = await axios.post('http://localhost:8080/cms/postTopic',topicObject);

            // Ecco la risposta dal server
            console.log('Risposta dal server:', response.status);
          } catch (error) {
            // Gestisci eventuali errori qui
            console.log('Errore durante la chiamata POST:', error);
          }
    }

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    }

    const onChangeTopic = (e) => {
        setTopic(e.target.value);
    }

    return(
        <div className="SecondElementLayout2">
            <form className="formCreazione">
                <label htmlFor="" className="label-creaCategorie">Crea una nuova categoria:</label>
                <input type="text" className="input-creaCategorie" onChange={(e) => onChangeCategory(e)}/>
                <label htmlFor="" className="label-creaTopic">Crea nuovo topic:</label>
                <input type="text" className="input-creaTopic" onChange={(e) => onChangeTopic(e)}/>
                <button className="btn-invia" onClick={(e) => sendDataCategory(e)}>Invia Categoria</button>
                <button className="btn-invia" onClick={(e) => sendDataTopic(e)} style={{marginLeft:16}}>Invia Topic</button>
            </form>
            <div>
                <p className="paragraph-visualizza">Categorie: primi tre campi da db</p>
                <p className="paragraph-visualizza">Topic:primi tre campi a db</p>
            </div>
        </div>
    )

} 

export default SecondElement;