import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

interface ContactQuery {
  dateSubmitted: string;
  name: string;
  email: string;
  company: string;
  message: string;
}

const QueriesTable = styled(TableContainer)`
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid var(--mui-palette-secondary-dark);
`;

function ContactQueries() {
  // Mock data - replace with actual data from API/backend
  const queries: ContactQuery[] = [
    {
      dateSubmitted: '2024-01-20',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'ABC Corp',
      message: 'Interested in your services',
    },
    {
      dateSubmitted: '2024-01-20',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'ABC Corp',
      message: 'Interested in your services',
    },
    {
      dateSubmitted: '2024-01-20',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'ABC Corp',
      message: 'Interested in your services',
    },
    // {
    //   dateSubmitted: '2024-01-20',
    //   name: 'John Doe',
    //   email: 'john@example.com',
    //   company: 'ABC Corp',
    //   message:
    //     'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
    // },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <QueriesTable>
        <Table sx={{ minWidth: 650 }} aria-label='contact queries table'>
          <TableHead sx={{ backgroundColor: 'var(--mui-palette-primary-main)', textAlign: 'center' }}>
            <TableRow>
              <TableCell>Date Submitted</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries.map((query, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{query.dateSubmitted}</TableCell>
                <TableCell>{query.name}</TableCell>
                <TableCell>{query.email}</TableCell>
                <TableCell>{query.company}</TableCell>
                <TableCell>{query.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueriesTable>
    </Box>
  );
}

export default ContactQueries;
