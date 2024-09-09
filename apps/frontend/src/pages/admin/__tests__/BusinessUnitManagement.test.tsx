import { expect, test, describe, vi, afterEach } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import BusinessUnitManagement from '../BusinessUnitManagement';
import { FakeResponsiveContainer, mockUseFetchWithMsal } from '../../../tests/utils';
import { businessUnitTestData } from '../../TestData';
import { API } from '@core/routes';

FakeResponsiveContainer();

const ToRender = () => {
  return <BusinessUnitManagement />;
};

describe('Test BusinessUnitManagement', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('BusinessUnitManagement should render business unit list', async () => {
    const executeMock = vi.fn(() => {
      return Promise.resolve(businessUnitTestData);
    });
    mockUseFetchWithMsal({ execute: executeMock });

    render(ToRender());

    expect(await screen.findAllByTestId('business-unit-item')).toHaveLength(4);
  });

  test("BusinessUnitManagement should show each business unit's details and they are editable", async () => {
    const executeMock = vi.fn((method, endpoint) => {
      if (method && endpoint.includes(API.admin.businessUnit.root)) {
        return Promise.resolve(businessUnitTestData);
      } else {
        return Promise.resolve(businessUnitTestData[0]);
      }
    });
    mockUseFetchWithMsal({ execute: executeMock });

    render(ToRender());

    const businessUnitList = await screen.findAllByTestId('business-unit-item');
    expect(businessUnitList).toHaveLength(4);

    const businessUnitItem = businessUnitList[0];

    fireEvent.click(businessUnitItem);

    const nameField = await screen.findByTestId('name-field');
    expect(nameField).toBeDefined();
    fireEvent.change(nameField, { target: { value: 'New Name' } });

    const descriptionField = await screen.findByTestId('description-field');
    expect(descriptionField).toBeDefined();
    fireEvent.change(descriptionField, { target: { value: 'New Description' } });

    const typeField = await screen.findByTestId('type-field');
    expect(typeField).toBeDefined();
    fireEvent.change(typeField, { target: { value: 'Department' } });

    const featureField = await screen.findByTestId('feature-field');
    expect(featureField).toBeDefined();

    // Find the checkboxes within feature-field
    const checkboxes = featureField.querySelectorAll('input[ type="checkbox" ]');

    // Simulate clicking on each checkbox
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });
  });
});
