import { Button, Grid, Stack } from '@mui/material'
import React from 'react'
import PostCard from './PostCard'
import { useUpdatePostMutation } from '../../services/postApi'

const PassedCard = ({id, uid, post_caption, status, key, toast}) => {

    const [updatePost] = useUpdatePostMutation();

    const handleReEvaluatePost = () => {
        const input = {
            id: id,
            data: {
                'post_caption': post_caption,
                'user_id': uid,
                'status': '2',
            }
          }

          console.log(input)
    
          updatePost(input)
          toast('Post No: 00' + id + ' was rejected.');
    }

    const handleRejectPost = () => {
        const input = {
            id: id,
            data: {
                'post_caption': post_caption,
                'user_id': uid,
                'status': '0',
            }
          }

          console.log(input)
    
          updatePost(input)
          toast('Post No: 00' + id + ' was rejected.');
    }

  return (
    <Grid key={key} item sx={{width:900, height:' 100%', backgroundColor:'white', p:2, pt:6,  boxShadow:'2.0px 4.0px 4.0px hsl(0deg 0% 0% / 0.38)', borderRadius:5, marginTop:2}}>
        <Grid container direction='column' alignItems={'center'} sx={{width:'100%'}}>
            <Grid item>
                <PostCard usedIn={true} id={id} uid={uid} stats={status} caption={post_caption}/>
            </Grid>
            <Grid item sx={{width:'100%', height:'100%', p:2, pr:5}}>
                <Stack direction='row'>
                    <Grid sx={{flexGrow:1}} />
                    <Button 
                        onClick={() => handleRejectPost()}
                        variant='contained'
                        sx={{
                            border:'1px solid #d85b4c',
                            color:'#d85b4c',
                            width:200,
                            height:50,
                            borderRadius:20,
                            fontSize:17,
                            backgroundColor:'transparent',
                            textTransform:'none',
                            fontFamily:'Arvo'
                        }}
                    >
                        Reject
                    </Button>
                    <div style={{width:10}}/>
                    <Button 
                        onClick={() => handleReEvaluatePost()}
                        variant='contained'
                        sx={{
                            border:'1px solid #649b72',
                            color:'#649b72',
                            width:200,
                            height:50,
                            borderRadius:20,
                            fontSize:17,
                            backgroundColor:'transparent',
                            textTransform:'none',
                            fontFamily:'Arvo'
                        }}
                    >
                        Re-Evaluate
                    </Button>
                   
                </Stack>
                
            </Grid>
        </Grid>
        

    </Grid>
  )
}

export default PassedCard