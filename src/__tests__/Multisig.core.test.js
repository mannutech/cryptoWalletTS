import MultisigView from '../components/core/MultiSig';
import React from 'react';
import { Form } from 'react-bootstrap';
import { shallow } from 'enzyme';

let pubkeys = {
  '0': '020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f9',
  '1': '020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f9'
}
describe("MULTISIG CORE TEST", () => {
  const Component = shallow(<MultisigView pubKeys={pubkeys} minSigRequired={2} />)
  it("Render MultisigView Component", () => {
    expect(Component).toMatchSnapshot();
  });
  it("State Check", () => {
    // console.log(Component.state());
    expect(Component.state()).toEqual({
      pubKeyValid: false,
      pubKeys: {
        '0': '020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f9',
        '1': '020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f9'
      }
    })
  });
  it("Number of Rendered Nodes", () => {

    expect(Component.find(Form.Control)).toHaveLength(5);

  });
  it("Derived Multisig Address", () => {
    expect(Component.find(Form.Group).at(1).name()).toMatch("FormGroup");

    Component.find(Form.Group).at(1).children().forEach((node, i) => {
      if (node.name() == "FormLabel") {
        expect(node.text()).toMatch("Address");
      }
      if (node.name() == "FormControl") {
        expect(node.props()).toMatchObject({
          type: 'textarea',
          readOnly: true,
          value: '3DmHPhCNV5sWbzyAdSeASp9Tj8AUniCwRV'
        })
      }

    })
  });

  it("Checking scheme value", () => {
    expect(Component.find(Form.Group).at(0).name()).toMatch("FormGroup");
    Component.find(Form.Group).at(0).children().forEach((node, i) => {
      if (node.name() == "FormLabel") {
        expect(node.text()).toMatch("Multisig Scheme");
      }
      if (node.name() == "FormControl") {
        expect(node.props()).toMatchObject({
          type: 'textarea',
          readOnly: true,
          value: '2-of-2'
        })
      }
    });
  });

  it("Checking Redeem Script Value", () => {
    expect(Component.find(Form.Group).at(2).name()).toMatch("FormGroup");
    Component.find(Form.Group).at(2).children().forEach((node, i) => {
      if (node.name() == "FormLabel") {
        expect(node.text()).toMatch("Redeem Script");
      }
      if (node.name() == "FormControl") {
        expect(node.props()).toMatchObject({ "readOnly": true, "type": "textarea", "value": "5221020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f921020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f952ae" })
      }
    });
  });

  it("Check Participating Public Keys", () => {
    expect(Component.find(Form.Group).at(3).name()).toMatch("FormGroup");
    Component.find(Form.Group).at(3).children().forEach((node, i) => {
      if (node.name() == "FormLabel") {
        expect(node.text()).toMatch("Public Key for All Participants");
      }
      if (node.name() == "FormControl") {
        if (i == 1) expect(node.props()).toMatchObject({
          type: 'textarea',
          readOnly: true,
          value: '#1 : 020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f9 \n'
        })
        if (i == 2)
          expect(node.props()).toMatchObject({
            type: 'textarea',
            readOnly: true,
            value: '#2 : 020ea682dc7cd9c3e586a255aa1a74035cdbb5f19080004ce0bd47c975a894d5f9 \n'
          })
      }
    });
  });
})

