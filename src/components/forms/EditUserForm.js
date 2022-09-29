import { Grid, TextField, Stack, DialogTitle, DialogActions, Divider, Button, IconButton, Tooltip, Typography } from '@mui/material'
import React, {useState} from 'react'
import {AiTwotoneDelete} from 'react-icons/ai'

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useUpdateUserMutation } from '../../services/userAPi';

//Schema: Rules for inputs
const schema = yup.object({
  name: yup.string().required('name is required'),
  email: yup.string().email().required('email is required'),
  contact: yup.string().required('contact is required'),
  password: yup.string().required('password is required'),
  retype_password: yup.string().required('password is required'),
});


const EditUserForm = ({onClose, toast, user_id, user_name, user_email, user_contact, user_password, user_status}) => {

   //For react hook form
   const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });

  const [name, setName] = useState(user_name);
  const [email, setEmail] = useState(user_email);
  const [contact, setContact] = useState(user_contact);
  const [password, setPass] = useState(user_password);
  const [retype_password, setRetypePass] = useState(user_password);
  const [status, setStatus] = useState(user_status);

  const [editUser] = useUpdateUserMutation();

  const onSubmit = (data) => {

    if (data.password !== data.retype_password){
        toast('Password does not match')
        setPass('')
        setRetypePass('')
    }else if (name===user_name && email===user_email && contact===user_contact && password===user_password && status===user_status ){
        toast('No actions can be done')
    }
    else{
         //saving teh data frok the form ans making a body taht will be pass on and use in the http request for storing a new instance of a user.
        const input = {
            id: user_id,
            data:{
                'name': data.name,
                'email': data.email,
                'contact': data.contact,
                'role': 'User',
                'password': data.password,
            }
        }

        editUser(input);
        toast('User was successfully updated.');
        onClose();
    }
    
};



const handleDisableUser = () => {

    const input = {
        id: user_id,
        data:{
            'name': name,
            'email': email,
            'contact': contact,
            'role': 'User',
            'password': password,
            'isActive': 'No'
        }
    }

    editUser(input);
    toast('User was successfully disabled.');
    onClose();
};


  return (
    <Grid>
      <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
          <Grid item>
            <DialogTitle>
                <Typography variant='h6' sx={{fontFamily:'arvo'}}>
                    Edit User Detail 
                </Typography>
            </DialogTitle>
          </Grid>

          <Grid item sx={{ width: '100%' }}>
            <Divider light />
          </Grid>
      </Stack>

      <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' sx={{width: 300, height:320, p:2}}>
        <div style={{height:15}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("name")}
                label={'Name'} 
                style={{ width: '100%' }}
                value={name}
                onChange={(event) => setName(event.target.value)}
                size='small'
                required
            />
        </Grid>

        <div style={{height:15}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("email")}
                type='email'
                label={'Email'} 
                style={{ width: '100%' }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                size='small'
                required
            />
        </Grid>

        <div style={{height:15}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("contact")}
                label={'Contact'} 
                style={{ width: '100%' }}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                size='small'
                required
            />
        </Grid>

        <div style={{height:15}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("password")}
                type='password'
                label={'Password'} 
                style={{ width: '100%' }}
                value={password}
                onChange={(event) => setPass(event.target.value)}
                size='small'
                required
            />
        </Grid>

        <div style={{height:15}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("retype_password")}
                type='password'
                label={'Retype Pasword'} 
                style={{ width: '100%' }}
                value={retype_password}
                onChange={(event) => setRetypePass(event.target.value)}
                size='small'
                required
            />
        </Grid>
      </Grid>

      <Stack direction='row'>
        <Grid sx={{pl: 2, flexGrow:1}}>
            <Tooltip title='Disable User'> 
                <IconButton
                    color="inherit"
                    onClick={( )=> handleDisableUser()}
                >
                    <AiTwotoneDelete style={{fontSize: 28}} />
                </IconButton>
            </Tooltip>
        </Grid>
        <DialogActions sx={{ paddingRight:2 }}>
          <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
              Discard
          </Button>
          <Button variant='contained' type='submit'  sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'none', fontFamily:'Playfair Display',}}>
              Submit
          </Button>
        </DialogActions>
      </Stack>

      
      </form>
   
    </Grid>
  )
}

export default EditUserForm