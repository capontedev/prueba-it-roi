import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetApiByAllQuery } from '../services/api';
import { IApi } from '../interfaces/api-interface';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

export default function TableTest() {
  const { data, isLoading } = useGetApiByAllQuery(null);
  const [handleOpenModal, setHandleOpenModal] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');
  const [rows, setRows] = useState<IApi[]>([]);

  useEffect(() => {
    setRows(data || [])
  }, [data]);

  const setHandleSave = () => {
    setHandleOpenModal(false);

    const userId = 0;
    const id = rows.length + 1;

    const row = {
      userId,
      id,
      title: inputTitle,
      body: inputBody,
    };

    setRows([...rows, row]);
  }


  const styleBox = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    backgroundColor: '#fff',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button onClick={() => { setHandleOpenModal(true) }} type='button'>
        Crear
      </Button>

      <Modal
        open={handleOpenModal}>
        <Box sx={styleBox}>
          <TextField label="Title" variant="outlined" onInput={e => { setInputTitle((e.target as HTMLInputElement).value) }} />
          <br />
          <TextField label="Body" variant="outlined" onInput={e => setInputBody((e.target as HTMLInputElement).value)} />
          <br />
          <Button onClick={setHandleSave} type='button'>
            Crear
          </Button>
        </Box>
      </Modal>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isLoading ?
                'Cargando' :
                rows.map((row: IApi) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.userId}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.body}</TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
