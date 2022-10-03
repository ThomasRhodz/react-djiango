import { Button, Grid, Typography, DialogActions } from '@mui/material'
import { Stack } from '@mui/system'
import { useUpdateEmployeeMutation } from '../../services/employeeApi'
import React from 'react'

const EmployeeEnable = ({onClose, toast,user_id, user_first_name, user_last_name, user_address, user_role, user_email, user_contact, user_password, user_status}) => {

  const [updateEmployee] = useUpdateEmployeeMutation();

  const handleEnableUser = (id) => {
    const input = {
        id: id,
        data:{
            'first_name': user_first_name,
            'last_name': user_last_name,
            'address': user_address,
            'email': user_email,
            'contact': user_contact,
            'role': user_role,
            'password': user_password,
            'isActive': 'Yes'
        }
      }

      updateEmployee(input);
      toast('Employee account was successfully activated.');
      onClose();
  }
  return (
    <Grid sx={{width:350, height:150, p:3}}>
        <Stack>
            <Typography variant='body1' align='justify' sx={{pb:2, fontFamily:'raleway'}}>
                Do you want to enable the account of {user_first_name + ' ' + user_last_name}?
            </Typography>
            <DialogActions >
                <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
                    Discard
                </Button>
                <Button variant='contained' type='button' onClick={() => handleEnableUser(user_id)} sx={{ height:35, minWidth:40, borderRadius:1, color: 'white', textTransform:'none', fontFamily:'Playfair Display',}}>
                    Yes
                </Button>
            </DialogActions>
        </Stack>
    </Grid>
  )
}

export default EmployeeEnable