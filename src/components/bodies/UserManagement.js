import { Button, Dialog, Divider, Grid, Stack, Typography } from '@mui/material'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {AiOutlineUserAdd} from 'react-icons/ai'

import UserTable from '../tables/UserTable';
import InactiveUserTable from '../tables/InactiveUserTable';
import NewUserForm from '../forms/NewUserForm';

const UserManagement = ({toast}) => {


    const [open, setOpen] = React.useState(false); //-> for open and close of dialog
    const [value, setValue] = React.useState(1);

    //function for opening and closing the dialog
    const handleClickOpen = () => {
        setOpen(true);

      };
      
      //Function for closing the create user dialog
      const handleClose = () => {
        setOpen(false);
      };

    // Function for changing the value of the Tab
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

  return (
    <Grid sx={{width:'100%'}}>
        <Stack direction='column' alignItems={'center'}>
            <Stack direction='row' sx={{width:'100%', pb:2}}>
                <Typography variant='h4' sx={{fontFamily:'arvo', flexGrow:1}}>
                    User Management System {value}
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

            <Grid sx={{width:'100%', pt:3, display: value===2 ? 'none':'flex'}}>
                <Stack direction='column'  >
                    <Stack direction='row'> 
                        <div style={{flexGrow:1}}/>
                        <Button onClick={()=>handleClickOpen()} variant='contained' sx={{width:180, textTransform:'none', fontFamily:'arvo'}} startIcon={<AiOutlineUserAdd />}>
                            Add user
                        </Button>
                    </Stack>
                    
                    <UserTable toast={(stringMessage) => toast(stringMessage)}/>
                </Stack>
               
            </Grid>     

            <Grid sx={{width:'100%', pt:3, display: value===2 ? 'flex':'none'}}>     
                    <InactiveUserTable toast={(stringMessage) => toast(stringMessage)}/>
            </Grid>                   
            
        </Stack>


        <Dialog open={open} onClose={handleClose} scroll='body'>
          <NewUserForm onClose={() => handleClose()} toast={(stringMessage)=>toast(stringMessage)}/>
        </Dialog>
    </Grid>
  )
}

export default UserManagement