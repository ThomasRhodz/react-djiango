import { Grid, TextField, Stack, DialogTitle, DialogActions, Divider, Button } from '@mui/material'
import React, {useState} from 'react'

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAddUserMutation } from '../../services/userAPi';

//Schema: Rules for inputs
const schema = yup.object({
  name: yup.string().required('name is required'),
  email: yup.string().email().required('email is required'),
  contact: yup.string().required('contact is required'),
  password: yup.string().required('password is required'),
  retype_password: yup.string().required('password is required'),
});


const NewUserForm = ({onClose, toast}) => {

   //For react hook form
   const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPass] = useState('');
  const [retype_password, setRetypePass] = useState('');

  const [addUser] = useAddUserMutation();

  const onSubmit = (data) => {

    if (data.password !== data.retype_password){
      toast('Password does not match')
      setPass('')
      setRetypePass('')
    }else{
      
      //saving teh data frok the form ans making a body taht will be pass on and use in the http request for storing a new instance of a user.
      const input = {
        'name': data.name,
        'email': data.email,
        'contact': data.contact,
        'role': 'User',
        'password': data.password,
        'isActive': 'Yes'
      }

      addUser(input);
      toast('New User was successfully added.');
      onClose();
    }

    
    
};

  return (
    <Grid>
      <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
          <Grid item>
            <DialogTitle>Add New User</DialogTitle>
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

      <DialogActions sx={{ paddingRight:2 }}>
          <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
              Discard
          </Button>
          <Button variant='contained' type='submit'  sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'none', fontFamily:'Playfair Display',}}>
              submit
          </Button>
      </DialogActions>
      </form>
   
    </Grid>
  )
}

export default NewUserForm