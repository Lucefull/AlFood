import { Routes, Route } from 'react-router-dom';
import LayoutAdmin from './paginas/Adiministracao/LayoutAdmin';
import AdministracaoPratos from './paginas/Adiministracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Adiministracao/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/Adiministracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Adiministracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<LayoutAdmin/>}>
        <Route
          path="restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="restaurantes/novo"
          element={<FormularioRestaurante />}
        />
        <Route
          path="restaurantes/:id"
          element={<FormularioRestaurante />}
        />
        <Route path='pratos' element={<AdministracaoPratos/>} />      
        <Route path='pratos/novo' element={<FormularioPrato/>} />
        <Route path='pratos/:id' element={<FormularioPrato/>} />     
      </Route>
    </Routes>
  );
}

export default App;
