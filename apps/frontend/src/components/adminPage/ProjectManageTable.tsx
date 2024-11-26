import useFetchWithAuth from '@/hooks/useFetchWithAuth';
import { formatDate } from '@/utils/HelperFunctions';
import { Project } from '@core/db/schema';
import { API } from '@core/routes';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { MarkDownRenderer } from '../toolkit/MarkDownUtils';

const ProjectTable = styled(TableContainer)`
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid var(--mui-palette-secondary-dark);
`;

const ProjectTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: var(--mui-palette-secondary-light);
  }
`;

const MarkdownWrapper = styled('div')`
  padding: 20px;
  background-color: var(--mui-palette-secondary-main);
  /* white-space: pre-wrap; */
`;

function ProjectManageTable() {
  const { execute, error } = useFetchWithAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    if (!projects && !error) {
      execute('GET', API.project.getAll).then((response: Project[]) => {
        if (response) {
          setProjects(response);
        } else if (error) {
          // eslint-disable-next-line no-console
          console.error(error); // TODO replace
        } else {
          // eslint-disable-next-line no-console
          console.error('Something went wrong, please try again later');
        }
      });
    }
  }, [execute, projects]);

  const handleRowClick = (projectId: string) => {
    setExpandedRow(expandedRow === projectId ? null : projectId);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <ProjectTable>
        <Table sx={{ minWidth: 650 }} aria-label='project management table'>
          <TableHead sx={{ backgroundColor: 'var(--mui-palette-primary-main)', textAlign: 'center' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date Started</TableCell>
              <TableCell>Date Completed</TableCell>
              <TableCell>Highlighted</TableCell>
              <TableCell>Image Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects ? (
              projects.map((project: Project) => (
                <>
                  <ProjectTableRow key={project.id} onClick={() => handleRowClick(project.id)}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.client ? project.client : 'N/A'}</TableCell>
                    <TableCell>{formatDate(new Date(project.dateStarted).toISOString())}</TableCell>
                    <TableCell>{formatDate(new Date(project.dateEnded).toISOString())}</TableCell>
                    <TableCell>{project.highlighted ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{project.Images?.length || 0}</TableCell>
                  </ProjectTableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedRow === project.id} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant='h6' gutterBottom component='div'>
                            Images
                          </Typography>
                          <Typography variant='h6' gutterBottom component='div'>
                            Full Description
                          </Typography>
                          <MarkdownWrapper>
                            <MarkDownRenderer markDownStr={project.description} />
                          </MarkdownWrapper>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No projects found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ProjectTable>
    </Box>
  );
}

export default ProjectManageTable;
