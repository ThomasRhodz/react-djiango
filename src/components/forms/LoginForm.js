import { Button, Grid, TextField, Typography } from '@mui/material'
import { navigate } from 'gatsby'
import React from 'react'

const LoginForm = () => {
  return (
    <Grid item sx={{
        width: '100%',
        pt:3,
    }}>
        <Grid sx={{pb:3}}>
            <TextField  label="Username" variant="filled" sx={{width:'100%'}}/>
        </Grid>

        <Grid sx={{pb:2}}>
            <TextField  label="Password" variant="filled" sx={{width:'100%'}}/>
        </Grid>

        <Grid sx={{pb:7}}>
            <Typography variant='subtitle2'  align='right' sx={{fontFamily:'Arvo'}}>
              Forgot your password?
            </Typography>
        </Grid>

        <Grid sx={{pb:2}}>
            <Button onClick={()=>{navigate('/module')}} variant='contained' sx={{width:'100%', backgroundColor:'#61A8A4', fontFamily: 'Arvo', textTransform:'none'}}>
                Login
            </Button>
        </Grid>
    </Grid>
  )
}

export default LoginForm