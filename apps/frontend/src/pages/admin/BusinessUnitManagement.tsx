import { Row, Col, ListGroup, Form } from 'react-bootstrap';
import useFetchWithMsal from '../../hooks/useFetchWithMsal';
import { API } from '../../shared/endpoints';
import { Fragment, useEffect, useState } from 'react';
import { BusinessUnit, BusinessUnitType, Feature } from '../../shared/schema';
import TextFormField from '../../components/Form/TextFormField';
import SelectFormField from '../../components/Form/SelectFormField';
import RadioFormField from '../../components/Form/RadioFormField';

function BusinessUnitManagement() {
  const { execute, error } = useFetchWithMsal();

  const [businessUnitListData, setBusinessUnitListData] = useState<BusinessUnit[]>([]);
  const [businessUnitData, setBusinessUnitData] = useState<BusinessUnit | null>(null);

  useEffect(() => {
    if (!error) {
      execute('GET', API.admin.businessUnit.root).then((data: BusinessUnit[]) => {
        if (data) {
          setBusinessUnitListData(data);
        }
      });
    }
  }, [error, execute]);

  useEffect(() => {}, [businessUnitData]);
  function getBusinessUnitDetail(id: string) {
    setBusinessUnitData(null);
    execute('GET', `${API.admin.businessUnit.byId}${id}`).then((data: BusinessUnit) => {
      if (data) {
        setBusinessUnitData(data);
      }
    });
    return undefined;
  }

  return (
    <>
      <br />
      <Row>
        <Col md lg xl={3}>
          <ListGroup as={'ol'}>
            {businessUnitListData.map((unit) => {
              return (
                <ListGroup.Item
                  key={unit.id}
                  id={unit.id.toString()}
                  as={'li'}
                  onClick={() => getBusinessUnitDetail(unit.id)}
                  action
                  href={unit.id.toString()}
                  data-testid='business-unit-item'
                >
                  {unit.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          {businessUnitData && (
            <Fragment>
              <Row>
                <h3>Business Unit Details</h3>
                <Form>
                  <TextFormField
                    type='text'
                    label='Name'
                    data-testid='name-field'
                    value={businessUnitData.name || ''}
                    required
                    onChange={(e) => setBusinessUnitData({ ...businessUnitData, name: e.target.value })}
                  />
                  <TextFormField
                    type='textarea'
                    label='Description'
                    data-testid='description-field'
                    value={businessUnitData.description || ''}
                    onChange={(e) =>
                      setBusinessUnitData({
                        ...businessUnitData,
                        description: e.target.value,
                      })
                    }
                  />
                  <SelectFormField
                    defaultValue={businessUnitData.type}
                    onChange={(e) =>
                      setBusinessUnitData({
                        ...businessUnitData,
                        type: BusinessUnitType[e.target.value as keyof typeof BusinessUnitType],
                      })
                    }
                    data-testid='type-field'
                  >
                    {Object.entries(BusinessUnitType).map((item) => {
                      return (
                        <option key={item[1]} value={item[1]}>
                          {item[1]}
                        </option>
                      );
                    })}
                  </SelectFormField>

                  <Row data-testid='feature-field'>
                    {Object.entries(Feature).map((item) => {
                      return (
                        <Col key={item[1]}>
                          <RadioFormField
                            label={item[1]}
                            defaultChecked={businessUnitData.features?.includes(item[1])}
                            onChange={(e) => {
                              setBusinessUnitData({
                                ...businessUnitData,
                                features: e.target.checked
                                  ? [...(businessUnitData.features || []), item[1]]
                                  : businessUnitData.features?.filter((f) => f !== item[1]),
                              });
                            }}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </Form>
              </Row>
              <Row></Row>
            </Fragment>
          )}
        </Col>
      </Row>
    </>
  );
}

export default BusinessUnitManagement;
