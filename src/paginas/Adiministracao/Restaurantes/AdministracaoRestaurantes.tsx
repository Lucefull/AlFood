import { TableContainer, TableHead } from '@mui/material';
import { Table, TableBody,TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
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

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NOME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes?.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
