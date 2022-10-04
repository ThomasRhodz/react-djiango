import { Grid } from '@mui/material'
import React from 'react'
import Post from '../parts/Post'
import PostCard from '../cards/PostCard'
import { useGetPostsQuery } from '../../services/postApi'

const Feed = ({toast}) => {

  const data = useGetPostsQuery()

  const posts = data.data ? data.data.data : []

  const renderPostCards = posts.map(({user_id, post_caption, id, status})=> {
      return(
        <Grid key={id} item sx={{pt:2, height:'100%'}}>
            <PostCard id={id} caption={post_caption} uid={user_id} stats={status} toast={(stringMessage)=>toast (stringMessage)} />
        </Grid>
      )
    })

  return (
    <Grid container direction={'column'} alignItems='center' sx={{width:'100%', height:'100%' }}>
        <Grid item>
            <Post toast={(stringMessage)=>toast(stringMessage)}/>
        </Grid>
        
        {renderPostCards}
    </Grid>
  )
}

export default Feed