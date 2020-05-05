import * as bip39 from 'bip39';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Accordion, Button, Card, Container, Form, InputGroup } from 'react-bootstrap';
import HdWalletComponent from './core/HDWallet';
interface IState {
  hdSeed: string,
  derPath: string;
  isSeedMnemonic: boolean;
  showComponent: boolean;
  seedInputType: string;
  autoGenerateSwitch: boolean;
}
class HDWalletInputCard extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      hdSeed: "",
      derPath: "",
      isSeedMnemonic: false,
      showComponent: false,
      seedInputType: "password",
      autoGenerateSwitch: false
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    // React.useState(true);
    let seedRegex = /^[0-9a-zA-Z]{16,64}$/;
    let seedMnemonicRegex = /^([a-zA-Z]+(\s|$)){12,}/;
    let derivationPathRegex = /^m(\/(\d+|\d+'))+$/;

    if (seedMnemonicRegex.test(this.state.hdSeed)) {
      this.setState({
        isSeedMnemonic: true
      })
    }
    if (!derivationPathRegex.test(this.state.derPath)) {
      alert("** Please check your derivation Path ** ");
      return;
    }
    if (!(seedRegex.test(this.state.hdSeed) || seedMnemonicRegex.test(this.state.hdSeed))) {

      alert("** Please Check Your HD Seed Input Value **")
      return;
    }
    this.setState({
      showComponent: true,
      isSeedMnemonic: seedMnemonicRegex.test(this.state.hdSeed) ? true : false
    });

  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Hierarchical Deterministic (HD) Segregated Witness (SegWit) Address
                    </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container >
              <Form onSubmit={(e: any) => {
                this.handleSubmit(e);
              }}>

                <Form.Group controlId="initial.HDSeed">
                  <Form.Label>Enter your HD Wallet Seed</Form.Label>
                  <InputGroup>
                    <Form.Control type={this.state.seedInputType} required value={this.state.hdSeed} onChange={e => {
                      this.setState({ hdSeed: e.target.value, showComponent: false })
                    }}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-dark" onClick={
                        (e: any) => {
                          if (this.state.seedInputType == "password") {
                            this.setState({
                              seedInputType: "textarea"
                            })
                          } else {
                            this.setState({
                              seedInputType: "password"
                            })
                          }

                        }
                      }>view</Button>
                    </InputGroup.Append>
                  </InputGroup>

                  <Form.Text className="text-muted">
                    You can either enter a 12-word mnemonic phrase or your own random seed
                            </Form.Text>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Auto-Generate"
                    checked={this.state.autoGenerateSwitch}
                    onChange={
                      (e: any) => {
                        this.setState({
                          hdSeed: (!this.state.autoGenerateSwitch) ? bip39.generateMnemonic() : "",
                          showComponent: false,
                          autoGenerateSwitch: !this.state.autoGenerateSwitch
                        });
                      }
                    }
                  />
                </Form.Group>
                <Form.Group controlId="initial.derivatioPath">
                  <Form.Label>Derivation Path</Form.Label>
                  <Form.Control type="input" required placeholder="m/0" onChange={e => {
                    this.setState({ derPath: e.target.value })
                  }} />
                  <Form.Text className="text-muted">
                    Please enter path in the format: m/1/3'/0
                       </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" >
                  Generate
                          </Button>
                <Button variant="secondary" type="reset" onClick={(e: any) => {
                  this.setState({
                    hdSeed: "",
                    derPath: "",
                    isSeedMnemonic: false,
                    showComponent: false,
                    seedInputType: "password",
                    autoGenerateSwitch: false
                  })
                }}>Reset</Button>

              </Form>
              <br></br>
              {this.state.showComponent && <HdWalletComponent hdSeed={this.state.hdSeed} derPath={this.state.derPath} isSeedMnemonic={this.state.isSeedMnemonic} ></HdWalletComponent>}
            </Container>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}


export default HDWalletInputCard;

