import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>();
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevtPage] = useState('');
  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        'http://localhost:8000/api/v1/restaurantes/'
      )
      .then((response) => {
        setRestaurantes(response.data.results);
        setNextPage(response.data.next);
        setPrevtPage(response.data.previous);
      })
      .catch((err) => console.log(err));
  }, []);

  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url).then((response) => {
      setRestaurantes(response.data.results);
      setNextPage(response.data.next);
      setPrevtPage(response.data.previous);
    });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}

      <button onClick={(e) => carregarDados(prevPage)} disabled={!prevPage}>
        Página anterior
      </button>

      <button onClick={(e) => carregarDados(nextPage)} disabled={!nextPage}>
        Próxima página
      </button>
    </section>
  );
};

export default ListaRestaurantes;
