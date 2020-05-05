import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Accordion, Card, Navbar, Col, Row, InputGroup } from 'react-bootstrap';
import MultisigView from './core/MultiSig';
import * as secp256k1 from 'secp256k1';

interface IState {
    totalParties: number;
    minSig: number;
    publicKeys: any;
    showMultiSigComponent: boolean;
}

function validate(pubKeys: any) {
    if (pubKeys == undefined) return false;
    if (!Object.keys(pubKeys).length) return false;
    let isValid = true;
    Object.keys(pubKeys).forEach((key: any) => {
        try {
            if (!secp256k1.publicKeyVerify(Buffer.from(pubKeys[key], 'hex'))) {
                isValid = false;
            }
        } catch (error) {
            isValid = false;
        }
    });
    return isValid;
}

class MultiSigCard extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            totalParties: 1,
            minSig: 1,
            publicKeys: {},
            showMultiSigComponent: false
        };
    }
    handleSubmitMultisig = (event: any) => {
        event.preventDefault();
        if (validate(this.state.publicKeys)) {
            this.setState({ showMultiSigComponent: true });
        } else {
            alert(" ** Please check the input Public Keys ** ")
        }
        return;
    }

    getFormControl = () => {

        if ((this.state.totalParties < this.state.minSig) || (this.state.totalParties < this.state.minSig)) {
            alert(" ** Total Number of Parties cannot be less than minimum signatures required");
            return;
        }
        let items = [];
        for (let i = 0; i < this.state.totalParties; i++) {
            items.push(<Form.Control type="input" key={`totalPar:#${i}`} required placeholder={`Public Key #${i + 1}`}
                value={this.state.publicKeys[i] || ""}
                onChange={(e) => {
                    // e.preventDefault();
                    if (/^[0-9a-f]+/.test(e.target.value)) {
                        let publicKeysCopy = JSON.parse(JSON.stringify(this.state.publicKeys));
                        publicKeysCopy[i] = e.target.value;
                        this.setState(
                            {
                                publicKeys: publicKeysCopy,
                                showMultiSigComponent: false
                            }
                        )
                    }
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
            <>
                <Card key="multisigCard">
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
                                        <Form.Group as={Col} controlId="initial.MinSigRequired">
                                            <Form.Label>"Minimum" Signatures Required </Form.Label>
                                            <Form.Control as="select" required defaultValue={this.state.minSig} onChange={
                                                e => {
                                                    this.setState({
                                                        minSig: parseInt(e.target.value),
                                                        publicKeys: {},
                                                        showMultiSigComponent: false
                                                    });
                                                }
                                            }>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                                    (value: number, index: number) => {
                                                        return <option key={`Min${index}`}>{value}</option>
                                                    }
                                                )}
                                            </Form.Control>
                                            <Form.Text className="text-muted">
                                                Should be less than or equal to Total number of parties
                      </Form.Text>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="initial.TotalParties">
                                            <Form.Label>"Total" number of Parties</Form.Label>
                                            <Form.Control as="select" required defaultValue={this.state.totalParties} onChange={
                                                e => {
                                                    this.setState({
                                                        totalParties: parseInt(e.target.value),
                                                        publicKeys: {},
                                                        showMultiSigComponent: false
                                                    });
                                                }
                                            }>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                                    (value: number, index: number) => {
                                                        return <option key={`Tota${index}`}>{value}</option>
                                                    }
                                                )}
                                            </Form.Control>
                                            <Form.Text className="text-muted">
                                                Minimum 1 and Maximum 10
                      </Form.Text>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="initial.PubKeys">
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
            </>
        )
    }
}

export default MultiSigCard;

