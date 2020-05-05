import React from 'react';
import { Form, Container, Alert, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bitcoin from 'bitcoinjs-lib';
import * as secp256k1 from 'secp256k1';

interface IState {
  pubKeyValid: boolean;
  pubKeys: any;
}
class MultisigCore extends React.Component<{ minSigRequired: number, pubKeys: any }, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pubKeyValid: false,
      pubKeys: this.props.pubKeys
    }
  }
  validate = () => {
    if (this.state.pubKeys == undefined) return false;
    if (!Object.keys(this.state.pubKeys).length) return false;

    Object.keys(this.state.pubKeys).forEach((key: any) => {
      try {
        this.state.pubKeys[key].toString('hex');
        if (!secp256k1.publicKeyVerify(Buffer.from(this.state.pubKeys[key], 'hex'))) {
          return false;
        }
      } catch (error) {
        return false;
      }
    });
    return true;
  }
  generate = () => {
    if (this.validate()) {
      const pubkeys = Object.keys(this.props.pubKeys).map((key: any) => Buffer.from(this.props.pubKeys[key], 'hex'));
      const { address, redeem } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: this.props.minSigRequired, pubkeys })
      });
      const redeemScript = redeem?.output?.toString('hex');
      return { address, redeem: redeemScript };
    }
    return { address: "", redeem: "" }
  }

  getPublicKeys = () => {
    let items = [];
    for (let val in this.props.pubKeys) {
      items.push(<Form.Control key={`pubkey#${val}`} type="textarea" readOnly value={`#${parseInt(val) + 1} : ${this.props.pubKeys[val]} \n`} />)
    }
    return items;
  }
  render() {
    return (
      <>
        {this.validate() && (<Container key="containerMultisig">
          <Alert variant="primary">
            Please find generated details below
          </Alert>
          < Form >
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="MultisigScheme">
                <Form.Label> Multisig Scheme </Form.Label>
                <Form.Control type="textarea" readOnly value={this.props.minSigRequired + "-of-" + Object.keys(this.props.pubKeys).length} />
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="AddressBTC">
                <Form.Label> Address </Form.Label>
                <Form.Control type="textarea" readOnly value={this.generate().address} />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="RedeemScript">
              <Form.Label>Redeem Script</Form.Label>
              <Form.Control type="textarea" readOnly value={this.generate().redeem} />
            </Form.Group>
            <Form.Group controlId="AllPubKeys">
              <Form.Label>Public Key for All Participants</Form.Label>
              {this.getPublicKeys()}
            </Form.Group>
          </Form>
        </Container>)
        }
      </>)
  }
}

export default MultisigCore;