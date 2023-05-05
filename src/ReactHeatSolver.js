import "./ReactHeatSolver.css";
import thermalRectangular from "./thermal.js";
import Plot from "react-plotly.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function ReactHeatSolver() {
  const [type1, setType1] = useState(1);
  const [type2, setType2] = useState(1);
  const [type3, setType3] = useState(1);
  const [type4, setType4] = useState(1);
  const [temp1, setTemp1] = useState("100");
  const [temp2, setTemp2] = useState("0");
  const [temp3, setTemp3] = useState("100");
  const [temp4, setTemp4] = useState("0");
  const [flux1, setFlux1] = useState("0");
  const [flux2, setFlux2] = useState("100");
  const [flux3, setFlux3] = useState("0");
  const [flux4, setFlux4] = useState("100");
  const [zPoints, setZpoints] = useState([]);
  const [xPoints, setXpoints] = useState([]);
  const [yPoints, setYpoints] = useState([]);
  const [x0, setX0] = useState(1);
  const [y0, setY0] = useState(1);
  const [el, setEL] = useState(32);

  useEffect(() => {
    if (
      temp1 &&
      temp2 &&
      temp3 &&
      temp4 &&
      flux1 &&
      flux2 &&
      flux3 &&
      flux4 &&
      x0 &&
      y0 &&
      el
    ) {
      const solution = thermalRectangular(
        el,
        x0,
        y0,
        type1,
        type2,
        type3,
        type4,
        (x, y) => {
          try {
            return eval(temp1);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(flux1);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(temp2);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(flux2);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(temp3);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(flux3);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(temp4);
          } catch (e) {
            return 0;
          }
        },
        (x, y) => {
          try {
            return eval(flux4);
          } catch (e) {
            return 0;
          }
        }
      );

      let xPointsTemp = [];
      let yPointsTemp = [];
      let zPointsTemp = [];
      if (solution) {
        for (let i = 0; i < solution.length; i++) {
          xPointsTemp[i] = solution[i][0];
          yPointsTemp[i] = solution[i][1];
          zPointsTemp[i] = Number(solution[i][2]).toFixed(4);
        }

        if (zPointsTemp) {
          setZpoints(zPointsTemp);
          setXpoints(xPointsTemp);
          setYpoints(yPointsTemp);
        }
      }
    }
  }, [
    temp1,
    temp2,
    temp3,
    temp4,
    flux1,
    flux2,
    flux3,
    flux4,
    type1,
    type2,
    type3,
    type4,
    x0,
    y0,
    el,
  ]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="topRow">
            <h2>Steady State Heat Transfer Laplace Problems Solver</h2>
          </Col>
        </Row>
        <Row>
          <Col className="topRow">
            <h8>
              This is a javascript Steady State Heat Transfer Laplace Problems
              Solver, it uses the boundary element method to calculate the
              problem in real time, the solution is shown as the properties of
              the problem are modified. The user can choose the number of
              elements, width and height of the rectangular domain. The boundary
              conditions can be choosen in each side of the domain, the user can
              input numbers and javascript math expressions in function of x and
              y (for example Math.sin(x) + y) in the boundary conditions. The
              contour plot is done using the react-plotly.js component can be
              found in https://www.npmjs.com/package/react-plotly.js.
            </h8>
          </Col>
        </Row>
        <Row>
          <Col className="formLeftTextColumn">
            <span>Number of boundary elements:</span>
          </Col>
          <Col className="formRightInputRow">
            {el}
            <Form.Range
              style={{ width: 250, paddingLeft: 5 }}
              value={el}
              onChange={(e) => {
                setEL(e.target.value);
              }}
              min="8"
              max="48"
              step="8"
            />
          </Col>
        </Row>
        <Row>
          <Col className="formLeftTextColumn">
            <span>Width:</span>
          </Col>
          <Col className="formRightInputRow">
            <Form.Control
              style={{ width: 250 }}
              value={x0}
              onChange={(e) => {
                setX0(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="formLeftTextColumn">
            <span>Height:</span>
          </Col>
          <Col className="formRightInputRow">
            <Form.Control
              style={{ width: 250 }}
              value={y0}
              onChange={(e) => {
                setY0(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="formLeftTextColumnBig">
            <Form.Select
              onChange={(e) => {
                setType3(Number(e.target.value));
              }}
              aria-label="Default select example"
              style={{
                width: 250,
                height: 50,
              }}
            >
              <option value="1">Temperature</option>
              <option value="0">Flux</option>
            </Form.Select>
          </Col>
          <Col className="formRightInputStart">
            {type3 === 1 ? (
              <>
                <Form.Label>Temperature T3</Form.Label>
                <Form.Control
                  style={{ width: 250 }}
                  value={temp3}
                  onChange={(e) => {
                    setTemp3(e.target.value);
                  }}
                />
                <Form.Text>Set a Value for temperature T3</Form.Text>
              </>
            ) : type3 === 0 ? (
              <>
                <Form.Label>Flux Q3</Form.Label>
                <Form.Control
                  style={{ width: 250 }}
                  value={flux3}
                  onChange={(e) => {
                    setFlux3(e.target.value);
                  }}
                />
                <Form.Text>Set a Value for flux Q3</Form.Text>
              </>
            ) : (
              <span>Select a Boundary Condition Type for side 3 (up).</span>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="mainColumn">
            <Col className="formLeftTextColumnBigEnd">
              <Form.Select
                onChange={(e) => {
                  setType4(Number(e.target.value));
                }}
                aria-label="Default select example"
                style={{
                  width: 250,
                  height: 50,
                }}
              >
                <option value="1">Temperature</option>
                <option value="0">Flux</option>
              </Form.Select>
            </Col>
            <Col className="formRightInputStartEnd">
              {type4 === 1 ? (
                <>
                  <Form.Label>Temperature T4</Form.Label>
                  <Form.Control
                    style={{ width: 250 }}
                    value={temp4}
                    onChange={(e) => {
                      setTemp4(e.target.value);
                    }}
                  />
                  <Form.Text>Set a Value for temperature T4</Form.Text>
                </>
              ) : type4 === 0 ? (
                <>
                  <Form.Label>Flux Q4</Form.Label>
                  <Form.Control
                    style={{ width: 250 }}
                    value={flux4}
                    onChange={(e) => {
                      setFlux4(e.target.value);
                    }}
                  />
                  <Form.Text>Set a Value for flux Q4</Form.Text>
                </>
              ) : (
                <span>Select a Boundary Condition Type for side 4 (left).</span>
              )}
            </Col>
          </Col>
          <Col>
            <div className="App">
              <Plot
                data={[
                  {
                    z: zPoints,
                    x: xPoints,
                    y: yPoints,
                    mode: "markers",
                    type: "contour",
                    showscale: true,
                    colorscale: "Viridis",
                  },
                ]}
                layout={{
                  width: 700,
                  height: 700,
                  title: "Temperature Plot",
                  showscale: true,
                }}
              />
            </div>
          </Col>
          <Col className="mainColumn">
            <Col className="formLeftTextColumnBigStart">
              <Form.Select
                onChange={(e) => {
                  setType2(Number(e.target.value));
                }}
                aria-label="Default select example"
                style={{
                  width: 250,
                  height: 50,
                }}
              >
                <option value="1">Temperature</option>
                <option value="0">Flux</option>
              </Form.Select>
            </Col>
            <Col className="formRightInputStartStart">
              {type2 === 1 ? (
                <>
                  <Form.Label>Temperature T2</Form.Label>
                  <Form.Control
                    style={{ width: 250 }}
                    value={temp2}
                    onChange={(e) => {
                      setTemp2(e.target.value);
                    }}
                  />
                  <Form.Text>Set a Value for temperature T2</Form.Text>
                </>
              ) : type2 === 0 ? (
                <>
                  <Form.Label>Flux Q2</Form.Label>
                  <Form.Control
                    style={{ width: 250 }}
                    value={flux2}
                    onChange={(e) => {
                      setFlux2(e.target.value);
                    }}
                  />
                  <Form.Text>Set a Value for flux Q2</Form.Text>
                </>
              ) : (
                <span>
                  Select a Boundary Condition Type for side 2 (right).
                </span>
              )}
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="formLeftTextColumnBig">
            <Form.Select
              defaultValue={"2"}
              onChange={(e) => {
                setType1(Number(e.target.value));
              }}
              aria-label="Default select example"
              style={{
                width: 250,
                height: 50,
              }}
            >
              <option value="1">Temperature</option>
              <option value="0">Flux</option>
            </Form.Select>
          </Col>
          <Col className="formRightInputStart">
            {type1 === 1 ? (
              <>
                <Form.Label>Temperature T1</Form.Label>
                <Form.Control
                  style={{ width: 250 }}
                  value={temp1}
                  onChange={(e) => {
                    setTemp1(e.target.value);
                  }}
                />
                <Form.Text>Set a Value for temperature T1</Form.Text>
              </>
            ) : type1 === 0 ? (
              <>
                <Form.Label>Flux Q1</Form.Label>
                <Form.Control
                  style={{ width: 250 }}
                  value={flux1}
                  onChange={(e) => {
                    setFlux1(e.target.value);
                  }}
                />
                <Form.Text>Set a Value for flux Q1</Form.Text>
              </>
            ) : (
              <span>Select a Boundary Condition Type for side 1 (down).</span>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReactHeatSolver;
