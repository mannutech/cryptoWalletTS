import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Accordion, Card, Navbar, Col, Row, InputGroup } from 'react-bootstrap';
import MultisigView from './components/MultiSig';
import HdWalletComponent from './components/HdWallet';

interface IProps {
}

interface IState {
  derPath: string;
  hdSeed: string;
  showComponent: boolean;
  showMultiSigComponent: boolean,
  isSeedMnemonic: boolean;
  minSig: number;
  totalParties: number;
  publicKeys: any;
  seedInputType: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      derPath: '',
      hdSeed: '',
      showComponent: false,
      isSeedMnemonic: false,
      totalParties: 1,
      minSig: 1,
      seedInputType: "password",
      publicKeys: {

      },
      showMultiSigComponent: false
    }
    this.handleSubmit.bind(this)
    this.getFormControl.bind(this)
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

  handleSubmitMultisig = (event: any) => {
    event.preventDefault();
    this.setState({ showMultiSigComponent: true });
  }

  getFormControl = () => {

    if ((this.state.totalParties < this.state.minSig) || (this.state.totalParties < this.state.minSig)) {
      alert(" ** Total Number of Parties cannot be less than minimum signatures required");
      return;
    }
    let items = [];
    for (let i = 0; i < this.state.totalParties; i++) {
      items.push(<Form.Control type="input" required placeholder={`Public Key #${i + 1}`}
        onChange={(e) => {
          e.preventDefault();
          if (/^[0-9a-f]+/.test(e.target.value))
            this.setState(
              {
                publicKeys: { ...this.state.publicKeys, [i]: e.target.value },
                showMultiSigComponent: false
              }
            )
        }} />);
    }
    return items;
  }

  getMultiSigView = () => {
    if (!this.state.showMultiSigComponent) {
      return;
    }
    return <MultisigView minSigRequired={this.state.minSig} pubKeys={this.state.publicKeys} />
  }
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt="BTC"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////3kxv3jQD3jwD3khb//Pj4nTT+8OP2igD6xJf3lyP82rf4qFj+9uz++fL4plT83b796tb+7t76u3v+8eb6voD3kgD+9Ob6uXb959H/+/b6wZH7z6r6wI/2hgD97dr4o0z4nz/5s236wor7z6P5sGX81q/94MP4nzv3lyr7zJr7zKP5rmH94sz6v4f6wYZ+h2E+AAAHZElEQVR4nO2df3uaMBCAIURAEBVtUftjRQsoznbf/9st4OpawOW0uQNZ3n+656nz4S0hkLvLYRgajUaj0Wg0mv+M8HFY5enrJ8a1DwyfB+0c7FX4rlWBTb5+IuCs+pEf43YO9ip8Zlbgo6+fCDxe/YirDbuENtSG3UcbasPuow21YffRhtqw+2hDbdh9tKE27D7aUBt2H22oDbuPNuyt4eBhPA6OhA2GD20fdslLKHgpmZU4iyPBn5+LmfjV3qoevunF6/XOtvPcE9R+W8BWQdt2BXEtKdZE7fwUZ/ETjYam+H95vPzph60mEidnjk4NQt5izHXzzXAbtOSJa3gyFZ5WPPed3hp+aPJ4+NJjw9KSMTuhnYCIDY+Sm7DXhgKLjd76bVicyMNdvw3FeXRfe24onnnWs54bituH33NDcTXue24o1h/LvhuaDH2+advQZEnfDU1323dDbuJGO9o3NK0DheH5hToBDHWcxlZUyhXBFh4xsVClN+VrTENnNnMcZ1GEyxbi32/JcsfqYacmxLL9K5Z17UBgFM82fxmEqQs4UP6+TwSZwPezLEmGj+/pmrvuFcOAx6SGgi3gXFhnVj+z6c9Nbl1o6a5oBQ1jJR+o1r+iSjN/47ELHK05mdoHSS3IfZGhIPBT4AVdENFofaYepL/QUOBsIBd0Cf0wNfaykwgwFKM1lo6FI2yIblQ7NiWGhvEIuxz5RP5VinmQDVOgoeGDFHmOq9PAwFZkaExBA5WTB/zVGQLmZbNIxWHaNKHQ0DgA7hpsiijTiErDO8BJRF/q11BpaNwDHpGI4sN/UWoYAgzJn9uUGhpr6R3D2qCpnEGt4Vx6Em/dMJM/yN+44ZvcED/4XUGtoXy9af1CUzmDWsMXqSFFjuYrag3lt4vbfqYRo1R6Hd72cylkfcEXaCpnUGv4SzZKuY1mcg61hrE06kN+O1Rr6EQSQeqod4FSw1fpZdhCta1Kw0B6Cjlugq0RlYap9G6InQduQqFh5kpPod1Cda06w608hsEyVJdmlBkC4qW4GdJzqDKUT6PiFNKVYn5CjeFqDREkXxqWqDAMD6Bk8o5Ap4FvGwbZCJaxMNso4De+a/iSpRyYdLLoM4dH5IZn8viL6c/Us6Apbk6/LvxAahhNi01SdwLHcWar7TRLhvejnLmMwWtOLI+yav9CQ7PY7XPiVFADdTt+RUxVzn6V4bfh7n17fgSGnNmtXYIkhtwmT6dRG8bTlu6DVIZilFo2/UY2SsNC0nLzpLXt0BSGhSSL5iQ7Z1ozNIvdwkvyaDCtYeFInpYhNhQPNzb90xutoZh0uldtohrylT65oclG8qO6bUOT0Qa+WzA0GWnVUBuGtMVtcsNPjT/K5iD/6gECxSV8vpEa8l0cx5PR6HA4pOlms0kPo8na9qJysX+tKWVkUR6Javhzlx15VtPk+eC57lU7qAjH6bfjpeHTBh5yO8E9srWGkqj+LDsAw6Yn2CO+2xFVmZkgWV/kyD2qVKLCDOnbDrx1xiQsjlJaqTDN4TugyHbqqa2nGcyBu4NMurIMtYZFDS10pFINU9WGxhZ6e6SqpVVuCNwdRFfipt7QeIQpcpOmUxaCobx+788308RsMAzldbQlRFV8GIbGCHQSiUq+UQxhk41Fk1ZEMRyDziFRNS2KIayTClEpJo7hK+T59KYN6916+2YImmqqTZiRwDEE1Jr+F4apcpsmWhylRIsLHMMnkOEN3/EBu2VNsm3dOIY7yB2fqK4dxXABCkgRlX2jGEqb3hy/+XbXh7CM3S2v8UFNTm45TuMAO93R3PAxDEETqZhonuRfpQL1hpAuNaUhUWGtasPBARrXZ0hGtSNSazizobkZopWFMMxVGibwjDfZTr1AUb+2gilkf9fJkOrdENJ+K2BD/6IkMNkgNaSPHyDDQfgeXZbIJ9u2Lt8YKTUczPy5fUH7yxKe0+RHx4CU7b/3rm336S66oqIGqUNkEDz8LYAYr7LUAvzl6xVD40W49bPhMvbY1R2XI5RymkW5RYtZEY8iq9h7Bnx+tKIoKmvZogL2scHr6pIvEy0pE14wl+PCTZxiGnkjLipcpCKF9wvnOzTQkk5pC7WyTfAcqWqvlWrgJtC6JT905DJ00R65gfUD2CBm77sxlWKWJzx3YCrlLmb1M7COB1UwQq3WkzZxQofFqJsQxtIeR8hw7Fc+tTyVchZjpylASUs8Pxu/XhbQiRrPb00R325rKuXMPdB0aZPFRZH0mL0n2sHtkAuWrwXe03VTkHdpVivH2Pp9StqVBpa1/K7Zn9dze8tkRd4lYnn1u9UBYlb5Xq/IzHeT+6dtS90hkvsT8xPLT2wKGibcIjBXCHy0UWoQTOev+2y7emnrreqXUK/W4pPx3QeO49ytvJqhewNiJ+p1odUMSlB/847bWmOWK9CG2rD7aENt2H20oTbsPtpQG3YfbagNu4821IbdRxtqw+6jDXtg6Fbj/KzyMvSA19IDP27JMHwcVqlkb8e1Dwyf6d80ptFoNBqNRqPpHL8BOySbemkfMSkAAAAASUVORK5CYII="
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
                Bitcoin Wallet
              </Navbar.Brand>
        </Navbar>
        <Container fluid>
          <br></br>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <Accordion>
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
                              <Form.Control type={this.state.seedInputType} required onChange={e => {
                                this.setState({ hdSeed: e.target.value })
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
                          </Form.Group>
                          <Form.Group controlId="initial.derivatioPath">
                            <Form.Label>Derivation Path</Form.Label>
                            <Form.Control type="input" required onChange={e => {
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
                              publicKeys: {},
                              hdSeed: '',
                              derPath: '',
                              showComponent: false
                            })
                          }}>
                            Reset
                            </Button>

                        </Form>
                        <br></br>
                        {this.state.showComponent && <HdWalletComponent hdSeed={this.state.hdSeed} derPath={this.state.derPath} isSeedMnemonic={this.state.isSeedMnemonic} ></HdWalletComponent>}
                      </Container>

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) Address
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Container >
                        <Form onSubmit={(e: any) => {
                          this.handleSubmitMultisig(e);
                        }}>
                          <Form.Row>
                            <Form.Group as={Col} controlId="initial.Multisig">
                              <Form.Label>"Minimum" Signatures Required </Form.Label>
                              <Form.Control as="select" required defaultValue={this.state.minSig} onChange={
                                e => {
                                  this.setState({
                                    minSig: parseInt(e.target.value),
                                    showMultiSigComponent: false
                                  });
                                }
                              }>
                                <option >1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                              </Form.Control>
                              <Form.Text className="text-muted">
                                Should be less than or equal to Total number of parties
                      </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} controlId="initial.Multisig">
                              <Form.Label>"Total" number of Parties</Form.Label>
                              <Form.Control as="select" required defaultValue={this.state.totalParties} onChange={
                                e => {
                                  this.setState({
                                    totalParties: parseInt(e.target.value),
                                    showMultiSigComponent: false
                                  });
                                }
                              }>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                              </Form.Control>
                              <Form.Text className="text-muted">
                                Minimum 1 and Maximum 10
                      </Form.Text>
                            </Form.Group>
                          </Form.Row>
                          <Form.Group controlId="initial.derivatioPath">
                            <Form.Label>Enter Public Key of all Parties</Form.Label>
                            {this.getFormControl()}
                          </Form.Group>
                          <Button variant="primary" type="submit" >
                            Generate
                            </Button>
                          <Button variant="secondary" type="reset" onClick={(e: any) => {
                            this.setState({
                              publicKeys: {},
                              minSig: 1,
                              totalParties: 1,
                              showMultiSigComponent: false
                            })
                          }}>
                            Reset
                            </Button>
                        </Form>
                        <br></br>
                        {this.getMultiSigView()}
                      </Container>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default App;
