import HdWalletComponent from '../components/core/HDWallet';
import React from 'react';
import { Form, FormGroup, Alert, Col, Container } from 'react-bootstrap';
import { shallow, mount } from 'enzyme';

const mnemonic = "capable arrange hidden hole urge pioneer furnace draw raccoon prize burden derive";
const derivationPath = "m/0";

describe("Segwit HD WALLET CORE TEST", () => {
  const Component = shallow(<HdWalletComponent hdSeed={mnemonic} derPath={derivationPath} isSeedMnemonic={true} />)
  it("Render HDWallet Component", () => {
    expect(Component).toMatchSnapshot();
  });

  it("State Check", () => {
    // console.log(Component.state());
    expect(Component.state()).toEqual({ seedShowType: 'password', privKeyShowType: 'password' })
  });
  it("Rendered Form Components", () => {
    Component.find(Form).children().forEach((node, i) => {
      switch (i) {
        case 0: {
          expect(node.text()).toMatch("Derived Path")
          expect(node.props().controlId).toMatch("form.derivedPath")
          break;
        }
        case 1: {
          expect(node.text()).toMatch("Public Key")
          expect(node.props().controlId).toMatch("form.pubkey.full")
          break;
        }
        case 2: {
          expect(node.text()).toMatch("Private Key (WIF)")
          expect(node.props().controlId).toMatch("form.privkey.wif")
          break;
        }
        case 3: {
          expect(node.text()).toMatch("Segwit Address(Legacy)")
          expect(node.props().controlId).toMatch("form.segwit")
          break;
        }
        case 4: {
          expect(node.text()).toMatch("Your 12-Word Mnemonic")
          expect(node.props().controlId).toMatch("form.mnemonic")
          break;
        }
        case 5: {
          expect(node.text()).toMatch("Root Extended Private Key (xpriv format)")
          expect(node.props().controlId).toMatch("form.xpriv")
          break;
        }
      }
    });
  });

  it("Form Values Check", () => {
    Component.find(Form.Control).forEach((node, idx) => {
      switch (idx) {
        case 0: {
          expect(node.props()).toMatchObject({ type: 'textarea', readOnly: true, value: 'm/0' })
          break;
        }
        case 1: {
          expect(node.props()).toMatchObject({
            type: 'textarea',
            readOnly: true,
            value: '03c80d61009e54d776739f344ea30daec028c443eb49cd6d1611fbbfabc460f87a'
          })
          break;
        }
        case 2: {
          expect(node.props()).toMatchObject({
            type: 'password',
            readOnly: true,
            value: 'L29VGn2vP6hLHr9q4s1Uyig43usYpo3XPSX9i2kCZCAY8fU7cUsv'
          })
          break;
        }
        case 3: {
          expect(node.props()).toMatchObject({
            type: 'textarea',
            readOnly: true,
            value: 'bc1qchah83mnehwj72rd37xqn6f4e7ecw2swyd7ru9'
          })
          break;
        }
        case 4: {
          expect(node.props()).toMatchObject({
            type: 'password',
            readOnly: true,
            value: 'capable arrange hidden hole urge pioneer furnace draw raccoon prize burden derive'
          })
          break;
        }
        case 5: {
          expect(node.props()).toMatchObject({
            type: 'password',
            readOnly: true,
            value: 'xprv9s21ZrQH143K3XCKRr7MJuyELAeX2m3WXimsv15uxKRJJNkpUNVEP8H54NBiLEtGd8ySCybBB9Qp3cKkL4GVEG2CiYNvh1njo4XX7YJ9XNn'
          })
          break;
        }
      }
    })
  });
});