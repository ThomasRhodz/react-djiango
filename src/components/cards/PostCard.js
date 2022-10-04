import { Grid, Typography, Stack, Avatar, IconButton, Tooltip, Divider, Menu, MenuItem, Dialog } from '@mui/material'
import { BsThreeDots } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import EditPost from '../forms/EditPost'

import React from 'react'


const PostCard = ({toast, id, caption, uid, stats}) => {
    const userID = useSelector(state => state.user.id);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEditPost = () => {
        setOpenEdit(false);
    };

  return (
    <Grid 
        container 
        direction='column' 
        alignItems='center'
        sx={{
            width:800, 
            height:'100%', 
            backgroundColor:'white',
            borderRadius: 2,
            boxShadow:'2.0px 4.0px 4.0px hsl(0deg 0% 0% / 0.38)',
            overflow:'hidden'
        }} 
    >
        <Grid item sx={{p:2, width:'100%'}}>
           <Stack direction='row' sx={{width:'100%'}}>
                <Avatar 
                    alt="Remy Sharp"
                    sx={{
                        border:'3px solid #06283D',
                        width:50,
                        height:50
                    }}
                    src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/306135216_3145837202335408_6820955250381812804_n.jpg?stp=cp6_dst-jpg_s1080x2048&_nc_cat=104&ccb=1-7&_nc_sid=5b7eaf&_nc_ohc=I5BTfZ03yVgAX_CT9GK&tn=S4hOybkp2Wg8NLQB&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT_LOoYeDFP98C81LlJ9p_-iVqiRzHvXKOI-vd_1y1pKcg&oe=63402C18" 
                />
                <Stack direction='column' sx={{pl:2}}>
                    <Typography variant='body1' sx={{fontFamily:'Arvo', fontWeight:'bold'}}>
                        John ELiezar Rodis
                    </Typography>
                    <Typography variant='body2' sx={{fontFamily:'Arvo'}}>
                       { 'UID: 000 ' + id}
                    </Typography>
                </Stack>
                <Grid sx={{flexGrow:1}} />
                <Tooltip title={'Options'}>
                    <IconButton 
                        disabled = {!(id === userID )}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{p:2, mt:'-10px'}}
                    >
                        <BsThreeDots style={{fontSize:20}} />
                    </IconButton>
                </Tooltip>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleOpenEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Archive</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
           </Stack>
        </Grid>

        <Grid item sx={{width:'100%', mt:'-5px'}}>
            <Divider />
        </Grid>

        <Grid item sx={{p:4, pl:2, width:'100%'}} >
            <Typography variant='h5' sx={{fontFamily:'Arvo'}}>
                {caption}
            </Typography>
        </Grid>

        <Dialog open={openEdit} onClose={handleCloseEditPost} scroll='body'>
            <EditPost user_id={uid} stats={stats} caption={caption} id={id} onClose={() => handleCloseEditPost()} toast={(stringMessage)=>toast(stringMessage)}/>
        </Dialog>

    </Grid>
  )
}

export default PostCard