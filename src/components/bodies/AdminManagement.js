import {Divider, Grid, Stack, Typography, Button, Dialog } from '@mui/material'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {AiOutlineUserAdd} from 'react-icons/ai'

import NewEmployeeForm from '../forms/NewEmployeeForm';
import ActiveEmployeeTable from '../tables/ActiveEmployeeTable';
import InActiveEmployeeTable from '../tables/InactiveEmployeeTable';

const AdminManagement = ({toast}) => {
    const [value, setValue] = React.useState(1);
    const [open, setOpen] = React.useState(false); //-> for open and close of dialog

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    //function for opening and closing the dialog
    const handleClickOpen = () => {
        setOpen(true);

      };
      
      //Function for closing the create user dialog
      const handleClose = () => {
        setOpen(false);
      };


  return (
    <Grid sx={{width:'100%'}}>
        <Stack direction='column' alignItems={'center'}>
            <Stack direction='row' sx={{width:'100%', pb:2}}>
                <Typography variant='h4' sx={{fontFamily:'arvo', flexGrow:1}}>
                    Employee Management System
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

            <Grid sx={{width:'100%', pt:5, display: value===1 ? 'flex':'none'}}>
                <Stack direction='column' sx={{width:'100%'}}>
                    <Stack direction='row'  sx={{width:'100%', marginBottom:'-10px'}}> 
                        <div style={{flexGrow:1}}/>
                        <Button onClick={()=>handleClickOpen()} variant='contained' sx={{width:180, textTransform:'none', fontFamily:'arvo', color: 'white'}} startIcon={<AiOutlineUserAdd />}>
                            Add employee
                        </Button>
                    </Stack>
                    
                    <ActiveEmployeeTable toast={(stringMessage) => toast(stringMessage)}/>
                </Stack>
               
            </Grid>     

            <Grid sx={{width:'100%', pt:3, display: value===2 ? 'flex':'none'}}>     
                   <InActiveEmployeeTable toast={(stringMessage) => toast(stringMessage)}/>
            </Grid>             
            
        </Stack>

        <Dialog open={open} onClose={handleClose} scroll='body'>
          <NewEmployeeForm onClose={() => handleClose()} toast={(stringMessage)=>toast(stringMessage)}/>
        </Dialog>


    </Grid>
  )
}

export default AdminManagement