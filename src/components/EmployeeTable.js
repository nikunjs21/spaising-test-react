// react
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

//services
import { getEmployees, deleteEmployee } from './../services/employee-service';

// material-ui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const { useState, useEffect } = React;

const columns = [
  { id: 'action', label: 'Action', minWidth: 30, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'dob', label: 'Date\u00A0of\u00A0Birth', minWidth: 50 },
  { id: 'mobile', label: 'Mobile', minWidth: 50 },
  { id: 'image', label: 'Image', minWidth: 20 },
  { id: 'address', label: 'Address', minWidth: 100 },
  { id: 'pincode', label: 'Pincode', minWidth: 20 },
];

const EmployeeTable = () => {

  const [rows, setRows] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getEmployeesData = async () => {
      try {
        const data = await getEmployees();
        console.log(data.data);
        setRows(data.data);
      } catch (error) {
        console.log(error);
        setRows([]);
      }
    }
    getEmployeesData();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteHandler = (id) => {
    deleteEmployee(id).then(res => {
      if (res.status) {
        const newRows = rows.filter(row => row.id !== id);
        setRows(newRows);
      } else {
        alert(res.message);
        console.log(res.message);
      }
    }).catch(err => {
      alert('Something went wrong');
      console.log(err);
    });
  }

  return (
    <>
      {rows.length && <div>
        <div style={{
          display: "flex",
          justifyContent: "end",
          margin: "20px 0",
        }}>
          <Button variant="contained">
            <Link to="/" className="btn-link">Add New Employee</Link>
          </Button>
        </div>
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          if (column.id === 'action') {
                            return <TableCell key={column.id} align={column.align}>
                              <Button variant="contained">
                                <Link to={"/edit/" + row.id} className="btn-link">Edit</Link>
                              </Button>&nbsp;
                              <Button color="error" variant="contained" onClick={onDeleteHandler.bind(this, row.id)}>
                                Delete
                              </Button>
                            </TableCell>
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : (column.id === 'image' ? <img src={value} alt="employee" width="50" height="50" /> : value)}
                              </TableCell>
                            );
                          }
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
      </div>}
    </>
  );
}

export default EmployeeTable;