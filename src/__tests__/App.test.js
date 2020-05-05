import App from '../App';
import HDWalletInputCard from '../components/HDWalletCard';
import MultisigCard from '../components/MultisigCard';
import React from 'react';
import { shallow } from 'enzyme';
import { Row, Button, Accordion, Container } from 'react-bootstrap';

describe("MultisigCard Input Form", () => {
  const Component = shallow(<App />)

  it("Render App Component", () => {
    expect(Component.find(Container)).toHaveLength(1);
    expect(Component.find(Row)).toHaveLength(2);
    expect(Component.find(Row).find(Accordion).find(HDWalletInputCard)).toHaveLength(1);
    expect(Component.find(Row).find(Accordion).find(MultisigCard)).toHaveLength(1);
  })
});
