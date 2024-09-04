import { Row, Col, ListGroup, Form } from 'react-bootstrap';
import useFetchWithMsal from '../../hooks/useFetchWithMsal';
import { API } from '../../shared/endpoints';
import { Fragment, useEffect, useState } from 'react';
import TextFormField from '../../components/Form/TextFormField';
import ButtonComponent from '../../components/toolkit/Button';
import { User } from '../../shared/schema';

function UserManagement() {
  const { execute, error } = useFetchWithMsal();

  const [userListData, setUserListData] = useState<User[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!error) {
      execute('GET', API.admin.user.root).then((data: User[]) => {
        if (data) {
          setUserListData(data);
        }
      });
    }
  }, [error, execute]);

  useEffect(() => {
    // console.log(businessUnitData)
  }, [userData]);
  function getUserDetail(id: string) {
    setUserData(null);
    execute('GET', `${API.admin.user.byId}${id}`).then((data: User) => {
      if (data) {
        setUserData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      }
    });
    return undefined;
  }

  const handleSubmit = (event: {
    currentTarget: HTMLFormElement;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    // invalidation check
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const payload = {
        firstName: firstName,
        lastName: lastName,
      };

      execute('PATCH', `${API.admin.user.byId}${userData?.id}`, payload).then((response: User) => {
        if (response) {
          // TODO: Add alerts here for successfull or fail cases
          getUserDetail(response.id);
          execute('GET', API.admin.user.root).then((data: User[]) => {
            if (data) {
              setUserListData(data);
            }
          });
        }
      });
    }

    setValidated(true);
  };

  return (
    <>
      <br />
      <Row>
        <Col md lg xl={3}>
          <ListGroup as={'ol'}>
            {userListData.map((user) => {
              return (
                <ListGroup.Item
                  key={user.id}
                  id={user.id.toString()}
                  as={'li'}
                  onClick={() => getUserDetail(user.id)}
                  action
                  href={user.id}
                  data-testid='user-list-item'
                >
                  {user.loginEmail} - ({user.firstName}, {user.lastName})
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          {userData && (
            <Fragment>
              <Row>
                <h3>
                  User Details - {userData.loginEmail} ({userData.firstName}, {userData.lastName})
                </h3>

                <Form
                  onSubmit={handleSubmit}
                  noValidate
                  validated={validated}
                  onChange={() => {
                    setValidated(false);
                  }}
                >
                  <TextFormField
                    data-testid='first-name-field'
                    type='text'
                    label='First Name'
                    value={firstName ?? ''}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <TextFormField
                    type='text'
                    data-testid='last-name-field'
                    label='Last Name'
                    value={lastName ?? ''}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <ButtonComponent data-testid='save-button' label='Save' type='submit' className='mt-2' />
                </Form>
              </Row>
            </Fragment>
          )}
        </Col>
      </Row>
    </>
  );
}

export default UserManagement;
