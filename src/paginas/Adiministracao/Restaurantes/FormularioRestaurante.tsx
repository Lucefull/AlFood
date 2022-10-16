import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`
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
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        aoSubmitForm(e);
      }}>
      <TextField
        value={nomeRestaurante}
        onChange={(e) => setNomeRestaurante(e.target.value)}
        label="Nome do restaurante"
        variant="standard"
      />

      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};
export default FormularioRestaurante;
