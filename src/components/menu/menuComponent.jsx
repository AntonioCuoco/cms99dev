  import {
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
  import { useNavigate,useLocation } from 'react-router-dom';
  import {Menu} from 'antd';
  import "./menuComponent.css";

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Crea Contenuti', '2', <DesktopOutlined />),
  getItem('Impostazioni', '3', <ContainerOutlined />),
];

  const MenuComponent = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const switchPage = (key) => {
      switch(key.key) {
        case "1" :
          navigate("/");
        break;
    
        case "2" : 
        navigate("/creaContenuti");
        break;
    
        case "3":
        navigate("/impostazioni");
      }
    }

    const switchActive = () => {
      switch(location.pathname) {
        case "/" :
          return "1";
        case "/creaContenuti" : 
          return "2";
        case "/impostazioni":
          return "3";
      }
    }

    return (
      <div
        style={{
          width: 256,
          height:"100%",
        }}
      >
        <Menu
          className='MenuComponent'
          defaultSelectedKeys={() => switchActive()}
          mode="inline"
          theme="dark"
          items={items}
          onClick={(key) => switchPage(key)}
        /> 
      </div>
    );
  } 

export default MenuComponent;