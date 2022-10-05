import { Grid } from '@mui/material'
import React from 'react'
import RejectedCard from '../cards/RejectedCard'
import { useGetRejectedPostsQuery } from '../../services/postApi'



const RejectedReviewer = ({toast}) => {
    const data = useGetRejectedPostsQuery()

    const posts = data.data ? data.data.data : []

    const renderRejectedCards = posts.map(({user_id, post_caption, id, status})=> {
        return(
            <Grid item key={id} > 
                <RejectedCard id={id} uid={user_id} post_caption={post_caption} status={status} toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>
        )
    })
  return (
    <Grid container direction='column' alignItems='center' sx={{width:'100%', height:'100%', p:2}}>
        {renderRejectedCards}
    </Grid>
  )
}

export default RejectedReviewer