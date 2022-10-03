import { Button, Grid, TextField, Typography, Stack } from '@mui/material'
import { navigate } from 'gatsby'
import React from 'react'
import { useGetUsersInfoQuery } from '../../services/userAPi'
import { useGetEmployeeInfoQuery } from '../../services/employeeApi'

import { useSelector, useDispatch } from 'react-redux'
import { setRole } from '../../redux/user'

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Schema: Rules for inputs
const schema = yup.object({
    email: yup.string().email().required('email is required'),
    password: yup.string().required('password is required'),
  });
 
//---------------------------------------------------------------------------------------------------------------------------

const LoginForm = () => {
   
    const dispatch = useDispatch()

   //For react hook form
   const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });
  
  const input ={
   email: '',
   password: ''
  }
   const [data, setData] = React.useState(input)
   const [warning, setWarning] = React.useState('')
   const [count, setCount] = React.useState(0)
   
   const handleWarning = (bool) => {
        if (bool){
           setWarning('Invalid Credentials')
            setCount(0)
        }
   }


    const User = useGetUsersInfoQuery(data);
    const Employee = useGetEmployeeInfoQuery(data)

    const onSubmit = (data) => {
        const findInput ={
            email: data.email,
            password: data.password
        }
        setData(findInput)
        setCount(1)
        
    }

    
    React.useEffect (() => {
        let userResult = User.data ? User.data.data.length : 2;
        let employeeResult = Employee.data ? Employee.data.data.length : 2;

        if (User.isSuccess && userResult === 1){
            let role = User.data ? User.data.data[0].role : '';
            dispatch(setRole(role));
            navigate('/module') ;
        } else if (Employee.isSuccess && employeeResult === 1){
            let role = Employee.data ? Employee.data.data[0].role : '';
            dispatch(setRole(role));
            navigate('/module') ;
        }

        if (employeeResult === 0 && userResult === 0 && count ===1){
            handleWarning(true)
        }
    }, [data])
    
    

    

  return (
    <Grid item sx={{
        width: '100%',
        height:'100%',
        pt:3,
    }}>
        <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{pb:2, width:'100%'}}>
            <Stack direction='column' align='center' sx={{width:'100%'}}>
                <Typography variant='caption' align='center' sx={{fontFamily:'raleway'}}>
                    {warning}
                </Typography>  
            </Stack>
            
        </Grid>
        <Grid sx={{pb:2}}>
            <TextField  
                {...register("email")} 
                type='email'
                label="Email" 
                size='small' 
                variant="filled" 
                sx={{width:'100%'}}
            />
        </Grid>

        <Grid sx={{pb:2}}>
            <TextField
                {...register("password")} 
                type='password'
                label="Password" 
                size='small' 
                variant="filled" 
                sx={{width:'100%'}}
            />
        </Grid>

        <Grid sx={{pb:5}}>
            <Typography variant='subtitle2'  align='right' sx={{fontFamily:'Arvo'}}>
              Forgot your password?
            </Typography>
        </Grid>

        <Grid sx={{pb:2}}>
            <Button type='submit'  variant='contained' sx={{width:'100%', backgroundColor:'#06283D', fontFamily: 'Arvo', textTransform:'none', borderRadius: 5, color:'white'}}>
                Login
            </Button>
            {/* onClick={()  => navigate('/module')} */}
        </Grid>
        </form>
    </Grid>
  )
}

export default LoginForm