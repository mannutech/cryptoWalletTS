import HDWalletInputCard from '../components/HDWalletCard';
import React from 'react';
import { shallow } from 'enzyme';
import { Card, Form, Button } from 'react-bootstrap';

describe("HDwallet Input Form", () => {
  const Component = shallow(<HDWalletInputCard />)
  it("Render HDWALLET Input Component", () => {
    // expect(Component).toMatchSnapshot();
  });

  it("Initial State", () => {
    expect(Component.state()).toMatchObject({
      hdSeed: '',
      derPath: '',
      isSeedMnemonic: false,
      showComponent: false,
      seedInputType: 'password',
      autoGenerateSwitch: false
    });
  });

  it("Checking Input Fields", () => {
    Component.find(Form.Label).forEach((node, i) => {
      switch (i) {
        case 0: {
          expect(node.text()).toMatch("Enter your HD Wallet Seed");
          break;
        }
        case 1: {
          expect(node.text()).toMatch("Derivation Path");
          break;
        }
      }
    })
  });
  it("Checking Buttons Fields", () => {
    Component.find(Button).forEach((node, i) => {
      switch (i) {
        case 0: {
          expect(node.text()).toMatch("view");
          break;
        }
        case 1: {
          expect(node.text()).toMatch("Generate");
          break;
        }
        case 2: {
          expect(node.text()).toMatch("Reset");
          break;
        }
      }
    })
  });
})
