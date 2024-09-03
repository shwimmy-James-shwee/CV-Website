import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
// import { CurrentUserType } from '../../context/UserContext'
import { API } from '../shared/endpoints';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type userActivityLogType = {
  sessionIdentifier: string;
  eventUrl: string;
  email: string;
  eventStartTime: string;
  eventEndTime: string;
  eventDuration: number;
  eventParams: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

type userAttributeData = {
  id: string;
  loginEmail: string;
};
type userAttributeDic = {
  [key: string]: { loginEmail: string };
};
function UserActivityPage() {
  const { execute, error } = useFetchWithMsal();
  const [tableData, setTableData] = useState<userActivityLogType[]>([]);
  const [userAttributes, setUserAttributes] = useState<userAttributeDic>({});
  const [chartData, setChartData] = useState<userActivityLogType[]>([]);
  const [aggBy, setAggBy] = useState<string>('eventUrl');

  function getData() {
    execute('GET', API.userActivityLog.root).then(
      (response: { data: userActivityLogType[]; attributes: { users: userAttributeData[] } }) => {
        if (response) {
          const users: userAttributeDic = {};
          response.attributes.users.forEach((x) => {
            users[x.id] = x;
          });
          setTableData(response.data.map((x) => ({ ...x, email: users[x.userId].loginEmail })));
        }
      },
    );

    execute('GET', `${API.userActivityLog.root}?by=${aggBy}`).then(
      (response: { data: userActivityLogType[]; attributes: { users: userAttributeData[] } }) => {
        if (response) {
          const users: userAttributeDic = {};
          response.attributes.users.forEach((x) => {
            users[x.id] = x;
          });
          setUserAttributes(users);
          setChartData(response.data);
        }
      },
    );
  }

  useEffect(() => {
    if (!error) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, execute, aggBy]);

  const refreshData = () => {
    getData();
  };

  const columns = [
    // { name: 'id', selector: (row: userActivityLogType) => row.id, sortable: true },
    { name: 'email', selector: (row: userActivityLogType) => row.email, sortable: true },
    {
      name: 'sessionIdentifier',
      selector: (row: userActivityLogType) => row.sessionIdentifier.slice(0, 6) + '...',
      sortable: true,
    },
    { name: 'eventUrl', selector: (row: userActivityLogType) => row.eventUrl, sortable: true },
    {
      name: 'eventStartTime',
      selector: (row: userActivityLogType) => row.eventStartTime,
      sortable: true,
    },
    {
      name: 'eventEndTime',
      selector: (row: userActivityLogType) => row.eventEndTime,
      sortable: true,
    },
    {
      name: 'eventDuration',
      selector: (row: userActivityLogType) => row.eventDuration / 1000,
      sortable: true,
    },
    { name: 'createdAt', selector: (row: userActivityLogType) => row.createdAt, sortable: true },
    { name: 'updatedAt', selector: (row: userActivityLogType) => row.updatedAt, sortable: true },
  ];

  return (
    <>
      <Container>
        <br />
        <Row>
          <Col>
            <Button variant='secondary' onClick={refreshData} data-testid='useractivity-refresh'>
              refresh data
            </Button>
          </Col>
          <Col>
            <Form.Select
              defaultValue={aggBy}
              onChange={(e) => setAggBy(e.target.value)}
              data-testid='useractivity-options'
            >
              {['eventUrl', 'userId'].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <br />
        <Row data-testid='useractivity-chart'>
          <Col>
            <ResponsiveContainer height={250} width={'99%'} data-testid='useractivity-chart-container'>
              <AreaChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 15,
                  left: 15,
                  bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray='1 4' />
                <defs>
                  <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey={aggBy}
                  padding={{ left: 20, right: 30 }}
                  // angle={-45}
                  dx={5}
                  dy={10}
                  height={40}
                  tickFormatter={(x) =>
                    aggBy === 'userId'
                      ? userAttributes?.[x]?.loginEmail
                      : x.length <= 10
                        ? x
                        : `${x.toString().slice(0, 10)}...`
                  }
                />
                <YAxis />
                <Area
                  type='monotone'
                  dataKey={(x) => x['_sum']['eventDuration'] / 1000}
                  stroke='#8884d8'
                  fillOpacity={1}
                  fill='url(#color)'
                  name='Duration (s)'
                />
                <Tooltip />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </Col>
        </Row>
        <br />
        <Row data-testid='useractivity-table'>
          <Col>
            <DataTable
              columns={columns}
              data={tableData}
              pagination
              paginationPerPage={7}
              data-testid='useractivity-table-rendered'
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserActivityPage;
