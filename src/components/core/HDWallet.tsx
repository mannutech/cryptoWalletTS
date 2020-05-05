import React from 'react';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import { Button, Form, Container, Alert, InputGroup } from 'react-bootstrap';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bitcoin from 'bitcoinjs-lib';

interface IState {
  seedShowType : string;
  privKeyShowType: string;
}
class HdWalletCore extends React.Component<{ hdSeed: string, derPath: string, isSeedMnemonic: boolean }, IState> {
    constructor(props: any) {
      super(props);
      this.state= {
        seedShowType: "password",
        privKeyShowType: "password"
      };
    }
    render() {
      let hdseed = this.props.hdSeed;
      let seedBuffer;
      if(/^m(\/(\d+|\d+'))+$/.test(this.props.derPath) === false){
        return <Alert variant="warning">
            Check Your Derivation Path
          </Alert>
      }
      let userMnemonic = '', xpriv = '';
      let seedNode ;
      if (this.props.isSeedMnemonic) {

        if (!bip39.validateMnemonic(hdseed)) {
          return <Alert variant="warning">
            Your 12-word mnemonic phrase is not valid !
          </Alert>
        }
        seedBuffer = bip39.mnemonicToSeedSync(hdseed);
        seedNode = bip32.fromSeed(seedBuffer, bitcoin.networks.bitcoin);
        userMnemonic = hdseed;
        xpriv = seedNode.toBase58();
      } else{
        seedBuffer = Buffer.from(hdseed);
        seedNode = bip32.fromSeed(seedBuffer, bitcoin.networks.bitcoin);
        userMnemonic = "N.A as You entered random seed.";
        xpriv = seedNode.toBase58();
      }
      
      return (
        <div>
          <Container>
            <Alert variant="primary">
              Please find your generated details below
          </Alert>
            <Form>
              <Form.Group controlId="form.derivedPath">
                <Form.Label>Derived Path </Form.Label>
                <Form.Control type="textarea" readOnly value={this.props.derPath} />
              </Form.Group>
              <Form.Group controlId="form.pubkey.full">
                <Form.Label>Public Key</Form.Label>
                <Form.Control type="textarea" readOnly value={seedNode.derivePath(this.props.derPath).publicKey.toString('hex')} />
              </Form.Group>
              <Form.Group controlId="form.privkey.wif">
                <Form.Label>Private Key (WIF)</Form.Label>
                <InputGroup>
                <Form.Control type={this.state.privKeyShowType} readOnly value={seedNode.derivePath(this.props.derPath).toWIF()} />
                <InputGroup.Append>
                                <Button variant="outline-dark" onClick={
                                  (e: any) => {
                                    if (this.state.privKeyShowType == "password") {
                                      this.setState({
                                        privKeyShowType: "textarea"
                                      })
                                    } else {
                                      this.setState({
                                        privKeyShowType: "password"
                                      })
                                    }

                                  }
                                }>view</Button>
                              </InputGroup.Append>
                </InputGroup>
                
              </Form.Group>
              <Form.Group controlId="form.segwit">
                <Form.Label>Segwit Address(Legacy) </Form.Label>
                <Form.Control type="textarea" readOnly value={bitcoin.payments.p2wpkh({ pubkey: seedNode.derivePath(this.props.derPath).publicKey }).address} />
              </Form.Group>
              <Form.Group controlId="form.mnemonic">
                <Form.Label>Your 12-Word Mnemonic </Form.Label>
                <InputGroup>
                <Form.Control type={this.state.seedShowType} readOnly value={userMnemonic} />
                <InputGroup.Append>
                                <Button variant="outline-dark" onClick={
                                  (e: any) => {
                                    if (this.state.seedShowType == "password") {
                                      this.setState({
                                        seedShowType: "textarea"
                                      })
                                    } else {
                                      this.setState({
                                        seedShowType: "password"
                                      })
                                    }

                                  }
                                }>view</Button>
                              </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="form.xpriv">
                <Form.Label>Root Extended Private Key (xpriv format) </Form.Label>
                <InputGroup>
                <Form.Control type={this.state.seedShowType} readOnly value={xpriv} />
                <InputGroup.Append>
                                <Button variant="outline-dark" onClick={
                                  (e: any) => {
                                    if (this.state.seedShowType == "password") {
                                      this.setState({
                                        seedShowType: "textarea"
                                      })
                                    } else {
                                      this.setState({
                                        seedShowType: "password"
                                      })
                                    }

                                  }
                                }>view</Button>
                              </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
          </Container>
        </div>
  
      )
    }
  }

  export default HdWalletCore;