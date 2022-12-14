import { Grid, TextField, Stack, DialogTitle, DialogActions, Divider, Button, Select, FormControl, InputLabel, MenuItem, Typography, IconButton, Tooltip  } from '@mui/material'
import React, {useState} from 'react'
import {MdCancel} from 'react-icons/md';

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAddEmployeeMutation } from '../../services/employeeApi';

//Schema: Rules for inputs
const schema = yup.object({
  first_name: yup.string().required('first name is required'),
  last_name: yup.string().required('last name is required'),
  role: yup.string().required('last name is required'),
  address: yup.string().required('name is required'),
  email: yup.string().email().required('email is required'),
  contact: yup.string().required('contact is required'),
  password: yup.string().required('password is required'),
  retype_password: yup.string().required('password is required'),
});


const NewEmployeeForm = ({onClose, toast}) => {

   //For react hook form
   const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPass] = useState('');
  const [retype_password, setRetypePass] = useState('');

  const [addEmployee] = useAddEmployeeMutation();

  const onSubmit = (data) => {

    if (data.password !== data.retype_password){
      toast('Password does not match')
      setPass('')
      setRetypePass('')
    }else{
      
      //saving teh data frok the form ans making a body taht will be pass on and use in the http request for storing a new instance of a user.
      const input = {
        'first_name': data.first_name,
        'last_name': data.last_name,
        'address': data.address,
        'email': data.email,
        'contact': data.contact,
        'role': data.role,
        'password': data.password,
        'isActive': 'Yes'
      }

      addEmployee(input);
      toast('New Employee was successfully added.');
      onClose();
    }

    
    
};

  return (
    <Grid>
        <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
            <Grid item sx={{width:'100%'}}>
                <Stack direction='row' sx={{pt:2}}>
                    <DialogTitle sx={{flexGrow:1}}>
                        <Typography variant='h6' sx={{fontFamily:'arvo'}}>
                            New Employee Form
                        </Typography>
                    </DialogTitle>
                    <Tooltip title='close' >
                        <IconButton color="primary" onClick={() => onClose()} sx={{p:2, mt:'-15px'}}>
                            <MdCancel style={{fontSize:35}} />
                        </IconButton>
                    </Tooltip>
                    
                </Stack>
            </Grid>

            <Grid item sx={{ width: '100%' }}>
                <Divider light />
            </Grid>
        </Stack>

        <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' alignItems='center' sx={{width: 500, height:'100%', p:2}}>
            
            <div style={{height:15}} />
            <Stack direction='row'>
                <Grid item style={{ width:'100%'}}>
                    <TextField 
                        {...register("first_name")}
                        label={'First Name'} 
                        style={{ width: '100%' }}
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        size='regular'
                        required
                    />
                </Grid>
                <div style={{width:10}} />
                <Grid item style={{ width:'100%'}}>
                    <TextField 
                        {...register("last_name")}
                        label={'Last Name'} 
                        style={{ width: '100%' }}
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        size='regular'
                        required
                    />
                </Grid>
            </Stack>

            <div style={{height:15}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("address")}
                    type='text'
                    label={'Address'} 
                    style={{ width: '100%' }}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    size='regular'
                    required
                />
            </Grid>

            <div style={{height:15}} />
            <Stack direction='row'>
                <Grid item style={{ width:'100%'}}>
                    <TextField 
                        {...register("email")}
                        type='email'
                        label={'Email'} 
                        style={{ width: '100%' }}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        size='regular'
                        required
                    />
                </Grid>

                <div style={{width:10}} />
                <Grid item style={{ width:'100%'}}>
                    <TextField 
                        {...register("contact")}
                        label={'Contact'} 
                        style={{ width: '100%' }}
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                        size='regular'
                        required
                    />
                </Grid>
            </Stack>

            <div style={{height:15}} />
            <Grid item  sx={{ width:'100%' }}>
                <FormControl variant="outlined" sx={{ width:'100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                    {...register("role")}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label='Role'
                    size='regular'
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                >
                    <MenuItem value={'Admin'}>
                        Admin
                    </MenuItem>
                    <MenuItem value={'Moderator'}>
                        Moderator
                    </MenuItem>
                </Select>
                </FormControl>
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
                    size='regular'
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
                    size='regular'
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

export default NewEmployeeForm