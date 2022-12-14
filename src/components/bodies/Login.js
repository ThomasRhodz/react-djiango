import { Grid, Stack, Typography } from '@mui/material'
import LoginForm from '../forms/LoginForm'

import React from 'react';
import Logo from '../../images/ReactDjangoLogo4.png'

const Login = () => {
  return (
    <Grid container direction='row' alignItems='center' sx={{
        width:680,
        height:'100%',
        minHeight:400,
        maxHeight:420,
        backgroundColor:'#06283D',
        borderRadius:4,
        position: 'absolute',
        top: '50%',
        left: '50%',
        overflow:'hidden',
        //border: '2px #06283D solid',
        transform: 'translate(-50%, -50%)',
        boxShadow:'4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)'
    }}>
        <Grid item sx={{p:2, pt:12, flexGrow:1, maxWidth:330, height:'100%', backgroundColor: '#06283D'}}>
          <Stack direction='column' alignItems='center' sx={{ width:'100%' }}>
            <Grid>
              <img src={Logo} alt='AppLogo' style={{width:210, height: 105}}/>
            </Grid>
            <Typography variant='caption' align='center' sx={{ fontFamily:'raleway', color: 'white' }}>
              Learn how to integrate React with Django, create a simple CRUD API with the Django REST framework.
            </Typography>
          </Stack>
            
        </Grid>
        <Grid item sx={{p:3, pt:5, flexGrow:1, maxWidth:350, height:'100%', backgroundColor: 'white'}}>
            <Typography variant='h5' align='center' sx={{ fontFamily:'raleway', fontWeight:'bold', color: '#112B3C' }}>
              Welcome back!
            </Typography>
            <Typography align='center' sx={{ fontFamily:'raleway', fontSize:15, color: '#112B3C', pb:2}}>
              Enter your credentials to sign in.
            </Typography>
            <LoginForm />
        </Grid>
       
    </Grid>
  )
}

export default Login 