import React from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function CompactPaper({ feed, post, onClick }) {
    return (
        <Paper elevation={1}
            sx={{ p: 1, m: 1, border:'1px solid black' }} 
            onClick={onClick.bind(this, post)}
            title={post.contentSnippet}>
            <Typography variant="subtitle" component="div"
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220, height: 20 }}>
                {post.title}
            </Typography>
        </Paper>
    )
}

export default CompactPaper