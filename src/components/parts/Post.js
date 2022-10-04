import { Grid, Avatar, Button, Dialog } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import NewPost from '../forms/NewPost'

const Post = ({toast}) => {
    const [open, setOpen] = useState(false);

    const handleOpenPost = () => {
        setOpen(true)
    }

    const handleClosePost = () => {
        setOpen(false)
    }

  return (
    <Grid 
        container 
        direction='row' 
        alignItems={'center'} 
        sx={{
            pr:2,
            pl:2,
            width:800, 
            height:80, 
            backgroundColor:'white',
            borderRadius: 20,
            boxShadow:'2.0px 4.0px 4.0px hsl(0deg 0% 0% / 0.38)'
        }}
    >
       
        <Grid item>
            <Avatar 
                alt="Remy Sharp"
                sx={{
                    border:'3px solid #06283D',
                    width:60,
                    height:60
                }}
                src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/306135216_3145837202335408_6820955250381812804_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=104&ccb=1-7&_nc_sid=5b7eaf&_nc_ohc=I5BTfZ03yVgAX_CT9GK&tn=S4hOybkp2Wg8NLQB&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT_LOoYeDFP98C81LlJ9p_-iVqiRzHvXKOI-vd_1y1pKcg&oe=63402C18" 
            />
        </Grid>

        <Grid item sx={{flexGrow:1, pr:2, pl:2}}>
            <Button onClick={() => handleOpenPost()} variant='contained' sx={{width:'100%', height:50, borderRadius:8, textTransform: 'none', fontFamily:'arvo', fontSize:18}}>
                What's on your kokote?
            </Button>
            
        </Grid>

        <Dialog open={open} onClose={handleClosePost} scroll='body'>
            <NewPost onClose={() => handleClosePost()} toast={(stringMessage)=>toast(stringMessage)}/>
        </Dialog>
    </Grid>
        
  )
}

export default Post