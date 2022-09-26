import { Grid } from '@mui/material'
import LoginForm from '../forms/LoginForm'

import React from 'react';
import Logo from '../../images/ReactDjangoLogo.png'

const Login = () => {
  return (
    <Grid container direction='column' alignItems='center' sx={{
        width:450,
        p: 4,
        pt:7,
        backgroundColor:'white',
        border: '2px #A7C4BC solid',
        borderRadius:4,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }}>
        <Grid item sx={{pb:1}}>
            <img src={Logo} alt='AppLogo' style={{width:210, height: 105}}/>
        </Grid>

        <LoginForm />
    </Grid>
  )
}

export default Login