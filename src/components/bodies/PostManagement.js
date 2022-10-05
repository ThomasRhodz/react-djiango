import {Divider, Grid, Stack, Typography } from '@mui/material'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostReviewer from '../parts/PostReviewer';
import PassedReviewer from '../parts/PassedReviewer';
import RejectedReviewer from '../parts/RejectedReviewer';

const PostManagement = ({toast}) => {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

  return (
    <Grid sx={{width:'100%'}}>
        <Stack direction='column' alignItems={'center'}>
            <Stack direction='row' sx={{width:'100%', pb:2}}>
                <Typography variant='h4' sx={{fontFamily:'arvo', flexGrow:1}}>
                    Post Management System
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
                            Moderate
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
                            Passed
                        </Typography>} 
                    />
                    <Tab value= {3} label={
                        <Typography 
                            variant='h6' 
                            sx={{
                                fontFamily:'raleway', 
                                fontWeight:'bold', 
                                textTransform: 'none' 
                                }}
                        >
                            Rejected
                        </Typography>} 
                    />
                </Tabs>  
            </Stack>
            <Grid sx={{width:'100%', margin:'-15px'}}>
                <Divider/>
            </Grid>

            <Grid sx={{width:'100%', margin:'25px', display: value=== 1 ?'flex' :'none'}}>
                <PostReviewer toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>

            <Grid sx={{width:'100%', margin:'25px', display: value=== 2 ?'flex' :'none'}}>
                <PassedReviewer toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>

            <Grid sx={{width:'100%', margin:'25px', display: value=== 3 ?'flex' :'none'}}>
                <RejectedReviewer toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>

            
        </Stack>


    </Grid>
  )
}

export default PostManagement