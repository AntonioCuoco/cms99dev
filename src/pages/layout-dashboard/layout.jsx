import MenuComponent from "../../components/menu/menuComponent"
import Body from "../../components/body/body"
import "./layout.css";

const Layout = () => {
    return(
        <div className="layout-container">
            <MenuComponent />
            <Body />
        </div>
    )
} 

export default Layout;