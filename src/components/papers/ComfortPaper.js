import React from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function ComfortPaper({ feed, post, onClick }) {
    return (
        <Paper elevation={2}
            sx={{ p: 1, m: 1, textAlign: 'justify', width: '42vh', minHeight: '8vh', display: 'block', verticalAlign: 'top' }}
            onClick={onClick.bind(this, post)}
            title={post.contentSnippet}>
            <Typography variant="subtitle1" component="h1">
                {post.title}
            </Typography>
            {post.enclosure ?
                <img src={post.enclosure.url} alt={post.title} />
                :
                <Typography variant="body1"
                    color="text.secondary" dangerouslySetInnerHTML={{ __html: post.content }}>
                </Typography>
            }
            <Typography variant="caption" component="span">
                {post.pubDate}
            </Typography>
        </Paper>
    )
}

export default ComfortPaper