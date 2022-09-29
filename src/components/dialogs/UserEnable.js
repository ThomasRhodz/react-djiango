import { Button, Grid, Typography, DialogActions } from '@mui/material'
import { Stack } from '@mui/system'
import { useUpdateUserMutation } from '../../services/userAPi'
import React from 'react'

const UserEnable = ({onClose, toast, user_id, user_name, user_email, user_contact, user_password, user_status}) => {

  const [updateUser] = useUpdateUserMutation();

  const handleEnableUser = (id) => {
    const input = {
        id: id,
        data: {
            'name': user_name,
            'email': user_email,
            'contact': user_contact,
            'role': 'User',
            'password': user_password,
            'isActive': 'Yes'
        }
    };

    updateUser(input)
    toast('User account was successfully enabled.')
    onClose()
  }
  return (
    <Grid sx={{width:350, height:150, p:3}}>
        <Stack>
            <Typography variant='body1' align='justify' sx={{pb:2, fontFamily:'raleway'}}>
                Do you want to enable the account of {user_name}?
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

export default UserEnable