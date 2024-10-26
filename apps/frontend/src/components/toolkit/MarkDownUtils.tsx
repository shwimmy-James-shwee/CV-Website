import { Typography } from '@mui/material';
import Markdown from 'react-markdown';

export function MarkDownRenderer({ markDownStr }: { markDownStr: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => (
          <Typography variant='h6' component='h1' sx={{ marginBottom: '5px', marginTop: '5px' }}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant='h6' component='h2' sx={{ marginBottom: '5px', marginTop: '5px' }}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant='h6' component='h3' sx={{ marginBottom: '5px', marginTop: '5px' }}>
            {children}
          </Typography>
        ),
        h4: ({ children }) => (
          <Typography variant='h6' component='h4' sx={{ marginBottom: '5px', marginTop: '5px' }}>
            {children}
          </Typography>
        ),
        h5: ({ children }) => (
          <Typography variant='h6' component='h5' sx={{ marginBottom: '5px', marginTop: '5px' }}>
            {children}
          </Typography>
        ),
        h6: ({ children }) => (
          <Typography variant='h6' component='h6'>
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography variant='body1' component='p'>
            {children}
          </Typography>
        ),
      }}
    >
      {markDownStr}
    </Markdown>
  );
}

export function MarkDownEditor() {
  return <></>;
}
