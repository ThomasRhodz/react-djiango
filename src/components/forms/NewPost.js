import { Grid, TextField, Stack, DialogTitle, DialogActions, Divider, Button, Typography, IconButton, Tooltip } from '@mui/material'
import React, {useState} from 'react'
import {MdCancel} from 'react-icons/md';

// Form and Data Handling
import {useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useSelector } from 'react-redux'
import { useAddPostMutation } from '../../services/postApi';


//Schema: Rules for inputs
const schema = yup.object({
  post_caption: yup.string().required('post name is required'),
});


const NewPost = ({onClose, toast}) => {

  const userID = useSelector(state => state.user.id);

   //For react hook form
   const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  });

  const [post, setPost] = useState('');

  const [addPost] = useAddPostMutation();

  const onSubmit = (data) => {

      const input = {
        'post_caption': data.post_caption,
        'user_id': userID,
        'status': '2',
      }

      addPost(input)
      toast('New post was successfully posted.');
      onClose();
};

  return (
    <Grid>
      <Stack direction='column' alignItems='center' sx={{ width: '100%' }}>
          <Grid item sx={{width:'100%'}}>
            <Stack direction='row'>
                <DialogTitle sx={{flexGrow:1}}>
                    <Typography variant='h6' sx={{fontFamily:'arvo'}}>
                        Add a new post
                    </Typography>
                </DialogTitle>
                <Tooltip title='close'>
                    <IconButton color="primary" onClick={() => onClose()}>
                        <MdCancel style={{fontSize:35}} />
                    </IconButton>
                </Tooltip>
                
            </Stack>
          </Grid>

          <Grid item sx={{ width: '100%' }}>
            <Divider light />
          </Grid>
      </Stack>

      <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column' alignItems='center' sx={{width: 500, height:'100%', p:2}}>
        
       
        <div style={{height:15}} />
        <Grid item style={{ width:'100%'}}>
            <TextField 
                {...register("post_caption")}
                type='text'
                multiline
                minRows={4}
                maxRows={4}
                label={"What's on your mind?"} 
                style={{ width: '100%' }}
                value={post}
                onChange={(event) => setPost(event.target.value)}
                size='regular'
            />
        </Grid>
      </Grid>

      <DialogActions sx={{ paddingRight:2 }}>
          <Button type='button' onClick={()=>onClose()} sx={{ height:45, minWidth:40, borderRadius:1, color: 'black', backgroundColor:'transparent', fontFamily:'Playfair Display', textTransform:'NONE'}}>
              Discard
          </Button>
          <Button variant='contained' type='submit'  sx={{ height:45, minWidth:40, borderRadius:1, color: 'white', textTransform:'none', fontFamily:'Playfair Display',}}>
              Post
          </Button>
      </DialogActions>
      </form>
   
    </Grid>
  )
}

export default NewPost