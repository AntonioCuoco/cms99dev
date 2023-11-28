import FirstElement from "../FirstElement/FirstElement";
import FiveElement from "../FiveElement/FiveElement";
import FourElement from "../FourElement/FourElement";
import ThirdElement from "../daDecidere(3°componente)/ThirdElement";
import SecondElement from "../grafico/SecondElement";
import "./body.css";

const Body = () => {

    return(
        <div className="BodyLayout2">
            <FirstElement />
            <SecondElement />
            <ThirdElement />
            <FourElement />
            <FiveElement />
        </div>
    )

} 

export default Body;