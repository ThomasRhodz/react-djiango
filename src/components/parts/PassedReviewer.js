import { Grid } from '@mui/material'
import React from 'react'
import PassedCard from '../cards/PassedCard'
import { useGetPassedPostsQuery } from '../../services/postApi'



const PassedReviewer = ({toast}) => {
    const data = useGetPassedPostsQuery()

    const posts = data.data ? data.data.data : []

    const renderPassedCards = posts.map(({user_id, post_caption, id, status})=> {
        return(
            <Grid item key={id} > 
                <PassedCard id={id} uid={user_id} post_caption={post_caption} status={status} toast={(stringMessage)=>toast(stringMessage)}/>
            </Grid>
        )
    })
  return (
    <Grid container direction='column' alignItems='center' sx={{width:'100%', height:'100%', p:2}}>
        {renderPassedCards}
    </Grid>
  )
}

export default PassedReviewer