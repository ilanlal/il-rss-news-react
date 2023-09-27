import React from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function WidePaper({ feed, post, onClick }) {
    return (
        <Paper elevation={1} sx={{ p: 3, m: 'auto', maxWidth: '100%' }} onClick={onClick.bind(this, post)}>
            <Typography variant="h4" component="h4">
                {post.title}
            </Typography>
            <Typography variant="body1"
                color="text.secondary" dangerouslySetInnerHTML={{ __html: post.content }}>
            </Typography>
            <Typography variant="caption" component="span">
                {post.pubDate}
            </Typography>
        </Paper>
    )
}

export default WidePaper