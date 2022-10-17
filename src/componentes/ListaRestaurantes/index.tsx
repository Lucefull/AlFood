import React, { useEffect, useState } from 'react';
import http from '../../http';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>();
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevtPage] = useState('');
  const [searchRestraurant, setSearchRestaurant] = useState('');
  useEffect(() => {
    http
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
    http.get<IPaginacao<IRestaurante>>(url).then((response) => {
      setRestaurantes(response.data.results);
      setNextPage(response.data.next);
      setPrevtPage(response.data.previous);
    });
  };

  const filterRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     http
      .get<IRestaurante[]>(
        `restaurantes/?search=${searchRestraurant}`
      )
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={filterRestaurant}>
        <input
          type="text"
          onChange={(e) => setSearchRestaurant(e.target.value)}
          placeholder="Buscar"
        />
        <button type="submit">buscar</button>
      </form>
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
