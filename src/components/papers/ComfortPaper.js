import React from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function ComfortPaper({ feed, post, onClick }) {
    return (
        <Paper elevation={1}
            sx={{ p: 1, m:1, border: '1px solid blue', textAlign: 'justify', width: '25em', height: '6em', display:'inline-block',verticalAlign:'top' }}
            onClick={onClick.bind(this, post)}
            title={post.contentSnippet}>
            <Typography variant="caption" component="h6">
                {post.title}
            </Typography>
            <Typography variant="body2"
                color="text.secondary" dangerouslySetInnerHTML={{ __html: post.content }}>
            </Typography>
            <Typography variant="caption" component="span">
                {post.pubDate}
            </Typography>
        </Paper>
    )
}

export default ComfortPaper