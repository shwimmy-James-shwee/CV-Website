import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import { InfoText } from '../text/InfoText';

interface TabProps {
  selectedKey?: string;
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: {
    eventKey: string;
    title: string;
  }[];
  className?: string;
  'data-testid'?: string;
}

const StyledTabs = styled(Tabs)`
  border: none;

  &&& {
    .nav-link {
      border: none;

      &.active {
        color: var(--tab-color) !important;
        border-bottom: 3px solid var(--tab-color);
      }
    }
  }
`;

export const TabComponent = ({ selectedKey, setKey, ...props }: TabProps) => {
  return (
    <StyledTabs id='tab' activeKey={selectedKey} onSelect={(k) => k !== null && setKey && setKey(k)} {...props}>
      {props.data.map((item, index) => {
        return (
          <Tab
            data-testid='tab-item'
            eventKey={item.eventKey}
            key={index}
            title={
              <InfoText
                data-testid='tab-item-text'
                size={1}
                fontWeight={600}
                color={selectedKey === item.eventKey ? 'var(--tab-color)' : undefined}
              >
                {item.title}
              </InfoText>
            }
          />
        );
      })}
    </StyledTabs>
  );
};
