import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { formatDate } from '@/utils/HelperFunctions';
import { ContactUsNotification } from '@core/db/schema';
import { API } from '@core/routes';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';

const QueriesTable = styled(TableContainer)`
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid var(--mui-palette-secondary-dark);
`;

function ContactQueries() {
  const { execute, error } = useFetchWithAuth();
  const [contactQueries, setContactQueries] = useState<ContactUsNotification[] | null>(null);

  useEffect(() => {
    if (!contactQueries && !error) {
      execute('GET', API.contact.getAll).then((response: ContactUsNotification[]) => {
        if (response) {
          setContactQueries(response);
        } else if (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          // TODO create info pop up to display to user
        } else {
          // eslint-disable-next-line no-console
          console.log('Something went wrong, please try again later');
          // TODO create info pop up to display to user
        }
      });
    }
  }, [execute, contactQueries]);

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
              <TableCell>Confirmation email sent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactQueries ? (
              contactQueries.map((query: ContactUsNotification, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(new Date(query.createdAt).toISOString())}</TableCell>
                  <TableCell>{query.name}</TableCell>
                  <TableCell>{query.submittedByEmail}</TableCell>
                  <TableCell>{query.company}</TableCell>
                  <TableCell>{query.message}</TableCell>
                  <TableCell>{query.sentTimestamp ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </QueriesTable>
    </Box>
  );
}

export default ContactQueries;
