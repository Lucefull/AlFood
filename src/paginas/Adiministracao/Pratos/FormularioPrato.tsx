import {
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';
import IPrato from '../../../interfaces/IPrato';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {
  const param = useParams();
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState('');
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImage] = useState<File | null>(null);
  useEffect(() => {
    http
      .get<{ tags: ITag[] }>('tags/')
      .then((res) => setTags(res.data.tags))
      .catch((err) => console.log(err));
    http
      .get<IRestaurante[]>('restaurantes/')
      .then((res) => setRestaurantes(res.data))
      .catch((err) => console.log(err));
    if (param.id) {
      http.get<IPrato>(`pratos/${param.id}/`).then((res) => {        
        setNomePrato(res.data.nome);
        setDescricao(res.data.descricao);
        setTag(res.data.tag);
        //setRestaurante( getRestauranteById(res.data.restaurante));
        //setImage(res.data.imagem);
      });
    }
  }, [param]);


  const aoSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    http
      .request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
      .then(() => {
        setNomePrato('');
        setDescricao('');
        setTag('');
        setRestaurante('');
        setImage(null);
        alert('Prato cadastrado com sucesso!');
      })
      .catch((err) => console.log(err));
  };

  const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <Typography component="h1" variant="h6">
        Fromulario de Pratos
      </Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmitForm}>
        <TextField
          value={nomePrato}
          onChange={(e) => setNomePrato(e.target.value)}
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          label="Descricao do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}>
            {tags.map((e) => (
              <MenuItem key={e.id} value={e.value}>
                {e.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(e) => setRestaurante(e.target.value)}>
            {restaurantes.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" onChange={selecionarArquivo} />
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
export default FormularioPrato;
