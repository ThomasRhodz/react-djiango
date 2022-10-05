import { Grid, TextField, Stack, DialogTitle, DialogActions, Divider, Button, Select, FormControl, InputLabel, MenuItem, Typography, IconButton, Tooltip } from '@mui/material'
import React, {useState} from 'react';
import {MdCancel} from 'react-icons/md';

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useUpdateEmployeeMutation } from '../../services/employeeApi';

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


const EditEmployeeForm = ({onClose, toast,user_id, user_first_name, user_last_name, user_address, user_role, user_email, user_contact, user_password, user_status}) => {

   //For react hook form
   const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });

  const [firstName, setFirstName] = useState(user_first_name);
  const [lastName, setLastName] = useState(user_last_name);
  const [address, setAddress] = useState(user_address);
  const [role, setRole] = useState(user_role);
  const [email, setEmail] = useState(user_email);
  const [contact, setContact] = useState(user_contact);
  const [password, setPass] = useState(user_password);
  const [retype_password, setRetypePass] = useState(user_password);
  const [contentChange, setContentChange] = useState(true);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const onSubmit = (data) => {

    if (data.password !== data.retype_password){
      toast('Password does not match')
      setPass('')
      setRetypePass('')
    }else{
      
      //saving teh data frok the form ans making a body taht will be pass on and use in the http request for storing a new instance of a user.
      const input = {
        id: user_id,
        data:{
            'first_name': data.first_name,
            'last_name': data.last_name,
            'address': data.address,
            'email': data.email,
            'contact': data.contact,
            'role': data.role,
            'password': data.password,
            'isActive': 'Yes'
        }
      }

      updateEmployee(input);
      toast('New Employee was successfully updated.');
      onClose();
    }   
};

const handleDeactivate = () => {

      //saving teh data frok the form ans making a body taht will be pass on and use in the http request for storing a new instance of a user.
      const input = {
        id: user_id,
        data:{
            'first_name': user_first_name,
            'last_name': user_last_name,
            'address': user_address,
            'email': user_email,
            'contact': user_contact,
            'role': user_role,
            'password': user_password,
            'isActive': 'No'
        }
      }

      updateEmployee(input);
      toast('New Employee was successfully deactivated.');
      onClose();
};


  return (
    <Grid sx={{p:2}}>
      <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
          <Grid item sx={{width:'100%'}}>
            <Stack direction='row'>
                <DialogTitle sx={{flexGrow:1}}>
                    <Typography variant='h6' sx={{fontFamily:'arvo'}}>
                        Edit Employee Form
                    </Typography>
                </DialogTitle>
                <Tooltip title='close'>
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
        
        <div style={{height:20}} />
        <Stack direction='row'>
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("first_name")}
                    label={'First Name'} 
                    style={{ width: '100%' }}
                    value={firstName}
                    onChange={(event) => {
                        setFirstName(event.target.value)
                        setContentChange(false)
                    }}
                    size='regular'
                    required
                />
            </Grid>
            <div style={{width:20}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("last_name")}
                    label={'Last Name'} 
                    style={{ width: '100%' }}
                    value={lastName}
                    onChange={(event) => {
                        setLastName(event.target.value)
                        setContentChange(false)
                    }}
                    size='regular'
                    required
                />
            </Grid>
        </Stack>

        <div style={{height:20}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("address")}
                type='text'
                label={'Address'} 
                style={{ width: '100%' }}
                value={address}
                onChange={(event) => {
                    setAddress(event.target.value)
                    setContentChange(false)
                }}
                size='regular'
                required
            />
        </Grid>

        <div style={{height:20}} />
        <Stack direction='row'>
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("email")}
                    type='email'
                    label={'Email'} 
                    style={{ width: '100%' }}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                        setContentChange(false)
                    }}
                    size='regular'
                    required
                />
            </Grid>

            <div style={{width:20}} />
            <Grid item style={{ width:'100%'}}>
                <TextField 
                    {...register("contact")}
                    label={'Contact'} 
                    style={{ width: '100%' }}
                    value={contact}
                    onChange={(event) => {
                        setContact(event.target.value)
                        setContentChange(false)
                    }}
                    size='regular'
                    required
                />
            </Grid>
        </Stack>

        <div style={{height:20}} />
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
                onChange={(event) => {
                    setRole(event.target.value)
                    setContentChange(false)
                }}
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
        

        <div style={{height:20}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("password")}
                type='password'
                label={'Password'} 
                style={{ width: '100%' }}
                value={password}
                onChange={(event) => {
                    setPass(event.target.value)
                    setContentChange(false)
                }}
                size='regular'
                required
            />
        </Grid>

        <div style={{height:20}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("retype_password")}
                type='password'
                label={'Retype Pasword'} 
                style={{ width: '100%' }}
                value={retype_password}
                onChange={(event) => {
                    setRetypePass(event.target.value)
                    setContentChange(false)
                }}
                size='regular'
                required
            />
        </Grid>
      </Grid>

      <DialogActions sx={{ paddingRight:2 }}>
          <Button type='button' onClick={()=>handleDeactivate()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
              Deactivate
          </Button>
          <Button variant='contained' type='submit' disabled={contentChange} sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'none', fontFamily:'Playfair Display',}}>
              Submit
          </Button>
      </DialogActions>
      </form>
   
    </Grid>
  )
}

export default EditEmployeeForm