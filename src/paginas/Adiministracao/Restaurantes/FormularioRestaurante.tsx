import { Button, TextField, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(
          `restaurantes/${parametros.id}/`
        )
        .then((res) => {
          setNomeRestaurante(res.data.nome);
        })
        .catch((err) => console.log(err));
    }
  }, [parametros]);
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const aoSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        })
        .catch((err) => console.log(err));
    } else {
      http
        .post('restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        });
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h6">
        Fromulario Restaurantes
      </Typography>
      <Box component="form" onSubmit={aoSubmitForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(e) => setNomeRestaurante(e.target.value)}
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required
        />

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
export default FormularioRestaurante;
