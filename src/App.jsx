import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login';
import ProtectedRoutes from './protectedRoutes/protectedRoutes';
import Layout from './pages/layout-dashboard/layout';
import Layout2 from './pages/layout-creaContenuti/layout';
import ThirdElement from './components/daDecidere(3°componente)/ThirdElement';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<ProtectedRoutes />}>
    //       <Route index element={<Layout />} />
    //       <Route path="creaContenuti" element={<Layout2 />} />
    //       <Route path="impostazioni" element={<Layout />} />
    //     </Route>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="*" element={<p>no page</p>} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoutes />}>
          <Route index element={<Layout />} />
          <Route path="creaContenuti" element={<Layout2 />} />
          <Route path="impostazioni" element={<ThirdElement />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>no page</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
