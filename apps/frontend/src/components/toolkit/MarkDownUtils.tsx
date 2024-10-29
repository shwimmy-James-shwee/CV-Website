import { Typography } from '@mui/material';
import Markdown, { Components } from 'react-markdown';

const mdRenderComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='h6' component='h1' sx={{ marginBottom: '5px', marginTop: '5px' }}>
      {children}
    </Typography>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='h6' component='h2' sx={{ marginBottom: '5px', marginTop: '5px' }}>
      {children}
    </Typography>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='h6' component='h3' sx={{ marginBottom: '5px', marginTop: '5px' }}>
      {children}
    </Typography>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='h6' component='h4' sx={{ marginBottom: '5px', marginTop: '5px' }}>
      {children}
    </Typography>
  ),
  h5: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='h6' component='h5' sx={{ marginBottom: '5px', marginTop: '5px' }}>
      {children}
    </Typography>
  ),
  h6: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='h6' component='h6'>
      {children}
    </Typography>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <Typography variant='body1' component='p'>
      {children}
    </Typography>
  ),
} as Partial<Components>;

export function MarkDownRenderer({ markDownStr }: { markDownStr: string }) {
  return <Markdown components={mdRenderComponents}>{markDownStr}</Markdown>;
}

export function MarkDownEditor() {
  return <></>;
}
