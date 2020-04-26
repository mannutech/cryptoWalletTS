import React from 'react';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import { Button, Form, Container, Alert } from 'react-bootstrap';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as bitcoin from 'bitcoinjs-lib';
interface IState {
}
class HdWalletComponent extends React.Component<{ hdSeed: string, derPath: string, isSeedMnemonic: boolean }, IState> {
    constructor(props: any) {
      super(props);
    }
    render() {
      let hdseed = this.props.hdSeed;
  
      let seedBuffer = Buffer.from(hdseed);
      if (this.props.isSeedMnemonic) {
        if (!bip39.validateMnemonic(hdseed)) {
          return <Alert variant="warning">
            Your 12-word mnemonic phrase is not valid !
          </Alert>
        }
        seedBuffer = bip39.mnemonicToSeedSync(hdseed);
      }
      let seedNode = bip32.fromSeed(seedBuffer, bitcoin.networks.bitcoin);
      return (
        <div>
          <Container>
            <Alert variant="primary">
              Please find your generated details below
          </Alert>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Derived Path </Form.Label>
                <Form.Control type="textarea" readOnly value={this.props.derPath} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Public Key</Form.Label>
                <Form.Control type="textarea" readOnly value={seedNode.derivePath(this.props.derPath).publicKey.toString('hex')} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Private Key (WIF)</Form.Label>
                <Form.Control type="textarea" readOnly value={seedNode.derivePath(this.props.derPath).toWIF()} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Segwit Address(Legacy) </Form.Label>
                <Form.Control type="textarea" readOnly value={bitcoin.payments.p2wpkh({ pubkey: seedNode.derivePath(this.props.derPath).publicKey }).address} />
              </Form.Group>
            </Form>
          </Container>
        </div>
  
      )
    }
  }

  export default HdWalletComponent;