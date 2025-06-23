import './LabelHistory.css'
import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'acao', label: 'Ação', minWidth: 100, align: 'center' },
  {
    id: 'tipo',
    label: 'Tipo',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'editor',
    label: 'Editor',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'data',
    label: 'Data',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

function createData(nome, acao, tipo, editor, data) {
  return { nome, acao, tipo, editor, data };
}

const rows = [
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
  createData('Richard P.', 'Deletar', "-----", "richardp@gmail.com", "17/10/2024, 18:22:20"),
];

export default function LabelHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.acao}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
