import MultisigCard from '../components/MultisigCard';
import React from 'react';
import { shallow } from 'enzyme';
import { Form, Button, Accordion } from 'react-bootstrap';


describe("MultisigCard Input Form", () => {
  const Component = shallow(<MultisigCard />)
  it("Render MultisigCard Input Component", () => {
    expect(Component).toMatchSnapshot();
  });

  it("Accordion Render Check", () => {
    expect(Component.find(Accordion.Toggle)).toHaveLength(1);
    expect(Component.find(Accordion.Toggle).text()).toMatch("Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) Address");
    expect(Component.find(Accordion.Collapse).props()).toMatchObject({
      eventKey: "1"
    });
  })

  it("Components rendered", () => {
    Component.find(Form.Label).forEach((node, i) => {
      switch (i) {
        case 0: {
          expect(node.text()).toMatch(`"Minimum" Signatures Required`);
          break;
        }
        case 1: {
          expect(node.text()).toMatch(`"Total" number of Parties`);
          break;
        }
        case 2: {
          expect(node.text()).toMatch(`Enter Public Key of all Parties`);
          break;
        }
      }
    })

    Component.find(Button).forEach((node, i) => {
      switch (i) {
        case 0: {
          expect(node.text()).toMatch("Generate");
          break;
        }
        case 1: {
          expect(node.text()).toMatch("Reset");
          break;
        }
      }
    });
  });
})

