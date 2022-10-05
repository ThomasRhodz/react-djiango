import { Grid } from '@mui/material'
import React from 'react'
import ReviewerCard from '../cards/ReviewerCard'
import { useGetReviewPostsQuery } from '../../services/postApi'


const PostReviewer = ({toast}) => {
    const data = useGetReviewPostsQuery()

    const posts = data.data ? data.data.data : []

    const renderPostCards = posts.map(({user_id, post_caption, id, status})=> {
        return(
            <Grid item key={id} > 
                <ReviewerCard id={id} uid={user_id} post_caption={post_caption} status={status} toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>
        )
    })
  return (
    <Grid container direction='column' alignItems='center' sx={{width:'100%', height:'100%', p:2}}>
        {renderPostCards}
    </Grid>
  )
}

export default PostReviewer