import {Divider, Grid, Stack, Typography } from '@mui/material'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const AdminManagement = ({toast}) => {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

  return (
    <Grid sx={{width:'100%'}}>
        <Stack direction='column' alignItems={'center'}>
            <Stack direction='row' sx={{width:'100%', pb:2}}>
                <Typography variant='h4' sx={{fontFamily:'arvo', flexGrow:1}}>
                    Admin Management System
                </Typography>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    TabIndicatorProps={{
                        sx: { height: 3, borderRadius:5 } 
                      }}
                >
                    <Tab value= {1} label={
                        <Typography 
                            variant='h6' 
                            sx={{
                                fontFamily:'raleway', 
                                fontWeight:'bold',
                                textTransform: 'none' 
                                }}
                        >
                            Active accounts
                        </Typography>} 
                    />
                    <Tab value= {2} label={
                        <Typography 
                            variant='h6' 
                            sx={{
                                fontFamily:'raleway', 
                                fontWeight:'bold', 
                                textTransform: 'none' 
                                }}
                        >
                            InActive accounts
                        </Typography>} 
                    />
                </Tabs>  
            </Stack>
            <Grid sx={{width:'100%', margin:'-15px'}}>
                <Divider/>
            </Grid>
            
        </Stack>


    </Grid>
  )
}

export default AdminManagement