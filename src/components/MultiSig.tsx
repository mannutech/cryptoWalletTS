import React from 'react';
import {  Form, Container, Alert, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bitcoin from 'bitcoinjs-lib';

class MultisigView extends React.Component<{ minSigRequired: number, pubKeys: any }, { pubKeyValid: boolean }> {
    constructor(props: any) {
      super(props);
      this.state = {
        pubKeyValid: true
      }
    }
   
    generate = () => {
      if (this.state.pubKeyValid) {
        const pubkeys = Object.keys(this.props.pubKeys).map((key: any) => Buffer.from(this.props.pubKeys[key], 'hex'));
        const { address, redeem } = bitcoin.payments.p2sh({
          redeem: bitcoin.payments.p2ms({ m: this.props.minSigRequired, pubkeys })
        });
        const redeemScript = redeem?.output?.toString('hex');
        return { address, redeem: redeemScript };
      }
      return { address: "", redeem: "" }
    }
    render() {
      return (<div>
        <Container>
          <Alert variant="primary">
            Please find generated details below
          </Alert>
          {this.state.pubKeyValid &&
            (< Form >
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="exampleForm.ControlTextarea1">
                  <Form.Label> Multisig Scheme </Form.Label>
                  <Form.Control type="textarea" readOnly value={this.props.minSigRequired + "-of-" + Object.keys(this.props.pubKeys).length} />
                </Form.Group>
                <Form.Group as={Col} md="8" controlId="exampleForm.ControlTextarea1">
                  <Form.Label> Address </Form.Label>
                  <Form.Control type="textarea" readOnly value={this.generate().address} />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Redeem Script</Form.Label>
                <Form.Control type="textarea" readOnly value={this.generate().redeem} />
              </Form.Group>
            </Form>)}
        </Container>
      </div>)
    }
  }

  export default MultisigView;