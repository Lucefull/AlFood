import { Button, TableContainer, TableHead } from '@mui/material';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then((res) => {
        setRestaurantes(res.data);
      });
  }, []);

  const excluir = (excluido: IRestaurante) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${excluido.id}/`)
      .then(() => {
        const listRestaurant = restaurantes.filter((e) => e.id !== excluido.id);
        setRestaurantes(listRestaurant);
      });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes?.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.nome}</TableCell>
              <TableCell>
                [<Link to={`/admin/restaurantes/${e.id}`}>editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(e)}>
                  EXCLUIR
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
