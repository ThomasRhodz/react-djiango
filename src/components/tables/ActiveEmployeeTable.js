import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

//Dialog
import Dialog from '@mui/material/Dialog';
import EditEmployeeForm from '../forms/EditEmployeeForm';
import { useGetActiveEmployeesQuery } from '../../services/employeeApi';

const columns = [
    { id: 'UID', label: 'Employee ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 180 },
    { id: 'address', label: 'Address', minWidth: 180 },
    { id: 'email', label: 'Email', minWidth: 180 },
    { id: 'contact', label: 'Contact', minWidth: 180 },
    { id: 'role', label: 'Role', minWidth: 150 },
    { id: 'password', label: 'Password', minWidth: 150 },
    { id: 'isActive', label: 'IsActive', minWidth: 100 },
  ];

  const renderColumns = columns.map(({id, label, minWidth}) => {
    return (
      <TableCell key={id} align="center" colSpan={1} sx={{ minWidth: minWidth, backgroundColor:'white', fontFamily: 'arvo', fontWeight:'bold'}}>
        {label}
      </TableCell>
    )
  })
  
  function createData(UID, name, address, email, contact, role, password, isActive, first_name, last_name) {
    return { UID, name, address, email, contact, role, password, isActive, first_name, last_name};
  }

const ActiveEmployeeTable = ({search, toast}) => {

    
    const users = useGetActiveEmployeesQuery();
    const rows = users.data ? users.data.data.map(({id, first_name, last_name, address, email, contact, role, password, isActive}) => createData(id, (first_name+' '+last_name), address, email, contact, role, password, isActive, first_name, last_name)) : [];
    
    const [id, setID] = React.useState('');
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [role, setRole] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };


    //function for opening and closing the opening user view dialog
    const handleUserOpen = (ID, fname, lname, address, role, email, contact, pass, stat) => {
        setOpen(true)
        setID(ID)
        setFirstName(fname)
        setLastName(lname)
        setAddress(address)
        setRole(role)
        setEmail(email)
        setPass(pass)
        setContact(contact)
        setStatus(stat)
    };
    
    //Function for closing the user view dialog
    const handleUserClose = () => {
      setOpen(false)
      
    };
  
    return (
      <Paper sx={{ width: '100%', mt:2, border: '1px #c3cbd0 solid'}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {renderColumns}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.UID} onClick={() => handleUserOpen(row.UID, row.first_name, row.last_name, row.address, row.role, row.email, row.contact, row.password, row.is_active)}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align='center' sx={{fontFamily: 'raleway',}}>
                            {value}
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

        <Dialog open={open} onClose={handleUserClose} scroll='body'>
          <EditEmployeeForm 
            onClose={() => handleUserClose()} 
            user_id={id} 
            user_first_name={first_name}
            user_last_name={last_name}  
            user_address={address} 
            user_role={role} 
            user_email={email} 
            user_contact={contact} 
            user_password={pass} 
            user_status={status} 
            toast={(stringMessage)=>toast(stringMessage)}
          />
        </Dialog>
      </Paper>
  )
}

export default ActiveEmployeeTable