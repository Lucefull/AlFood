import { Button, TableContainer, TableHead } from '@mui/material';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/').then((res) => {
      setPratos(res.data);
    });
  }, []);

  const excluir = (excluido: IPrato) => {
    http.delete(`pratos/${excluido.id}/`).then(() => {
      const listRestaurant = pratos.filter((e) => e.id !== excluido.id);
      setPratos(listRestaurant);
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos?.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.nome}</TableCell>
              <TableCell>{e.tag}</TableCell>
              <TableCell>
                [<a href={e.imagem} target='_blank' rel='noreferrer'>Ver imagem</a>]
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${e.id}`}>editar</Link>]
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

export default AdministracaoPratos;
