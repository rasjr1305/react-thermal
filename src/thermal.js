import linSystemSolverJordan from "./solver.js";
import fundamentalSolution from "./fundamentalSol.js";

function thermalRectangular(
  el,
  x0,
  y0,
  bc1,
  bc2,
  bc3,
  bc4,
  t1,
  q1,
  t2,
  q2,
  t3,
  q3,
  t4,
  q4,
  ip
) {
  // Creating rectangular domain mesh with inputs
  const nSide = el;
  const nIntLine = 2 * nSide + 1;
  const nInt = (nIntLine - 2) * (nIntLine - 2);
  const x = x0;
  const y = y0;
  const stepX = x / (2 * nSide);
  const stepY = y / (2 * nSide);
  const stepXd = x / nSide;
  const stepYd = y / nSide;

  let xEI = [];
  let xN = [];
  let xEF = [];
  let yEI = [];
  let yN = [];
  let yEF = [];
  let stepTempX = 0;
  let stepTempY = 0;

  for (let i = 0; i < nSide; i++) {
    xEI[i] = stepTempX;
    xN[i] = stepTempX + stepX;
    xEF[i] = stepTempX + 2 * stepX;
    yEI[i] = 0;
    yN[i] = 0;
    yEF[i] = 0;
    stepTempX = stepTempX + stepXd;
  }

  for (let i = nSide; i < 2 * nSide; i++) {
    xEI[i] = stepTempX;
    xN[i] = stepTempX;
    xEF[i] = stepTempX;
    yEI[i] = stepTempY;
    yN[i] = stepTempY + stepY;
    yEF[i] = stepTempY + 2 * stepY;
    stepTempY = stepTempY + stepYd;
  }

  for (let i = 2 * nSide; i < 3 * nSide; i++) {
    xEI[i] = stepTempX;
    xN[i] = stepTempX - stepX;
    xEF[i] = stepTempX - 2 * stepX;
    yEI[i] = stepTempY;
    yN[i] = stepTempY;
    yEF[i] = stepTempY;
    stepTempX = stepTempX - stepXd;
  }

  for (let i = 3 * nSide; i < 4 * nSide; i++) {
    xEI[i] = 0;
    xN[i] = 0;
    xEF[i] = 0;
    yEI[i] = stepTempY;
    yN[i] = stepTempY - stepY;
    yEF[i] = stepTempY - 2 * stepY;
    stepTempY = stepTempY - stepYd;
  }

  stepTempX = stepX;
  stepTempY = stepY;

  let counter = 4 * nSide;
  // Creating internal nodes
  for (let i = 0; i < nIntLine - 2; i++) {
    for (let j = 0; j < nIntLine - 2; j++) {
      xN[counter] = stepTempX;
      yN[counter] = stepTempY;
      stepTempX = stepTempX + stepX;
      counter = counter + 1;
    }
    stepTempY = stepTempY + stepY;
    stepTempX = stepX;
  }

  if (ip) {
    for (let i = 0; i < ip.length; i++) {
      xN[counter] = ip[i][0];
      yN[counter] = ip[i][1];
      counter = counter + 1;
    }
  }
  ///////////////////////////
  // Setting each boundary condition to sides
  let bCT = [];
  let bCQ = [];
  let vBCT = [];
  let vBCQ = [];
  for (let i = 0; i < 4 * nSide; i++) {
    if (i < nSide) {
      if (bc1 === 1) {
        bCT[i] = 1;
        bCQ[i] = 0;
      }
      if (bc1 === 0) {
        bCT[i] = 0;
        bCQ[i] = 1;
      }
      vBCT[i] = t1(xN[i], yN[i]);
      vBCQ[i] = q1(xN[i], yN[i]);
    }
    if (i >= nSide && i < 2 * nSide) {
      if (bc2 === 1) {
        bCT[i] = 1;
        bCQ[i] = 0;
      }
      if (bc2 === 0) {
        bCT[i] = 0;
        bCQ[i] = 1;
      }
      vBCT[i] = t2(xN[i], yN[i]);
      vBCQ[i] = q2(xN[i], yN[i]);
    }
    if (i >= 2 * nSide && i < 3 * nSide) {
      if (bc3 === 1) {
        bCT[i] = 1;
        bCQ[i] = 0;
      }
      if (bc3 === 0) {
        bCT[i] = 0;
        bCQ[i] = 1;
      }
      vBCT[i] = t3(xN[i], yN[i]);
      vBCQ[i] = q3(xN[i], yN[i]);
    }
    if (i >= 3 * nSide && i < 4 * nSide) {
      if (bc4 === 1) {
        bCT[i] = 1;
        bCQ[i] = 0;
      }
      if (bc4 === 0) {
        bCT[i] = 0;
        bCQ[i] = 1;
      }
      vBCT[i] = t4(xN[i], yN[i]);
      vBCQ[i] = q4(xN[i], yN[i]);
    }
  }
  // Creating fundamental solution integrations matrices
  let H = [];
  let G = [];
  for (let i = 0; i < 4 * nSide; i++) {
    H[i] = [];
    G[i] = [];
    for (let j = 0; j < 4 * nSide; j++) {
      let XEI1 = xEI[j];
      let XN1 = xN[i];
      let XEF1 = xEF[j];
      let YEI1 = yEI[j];
      let YN1 = yN[i];
      let YEF1 = yEF[j];
      if (i === j) {
        let s = true;
        let { intH0, intG0 } = fundamentalSolution(
          XEI1,
          XN1,
          XEF1,
          YEI1,
          YN1,
          YEF1,
          s
        );
        H[i][j] = intH0;
        G[i][j] = intG0;
      } else {
        let s = false;
        let { intH0, intG0 } = fundamentalSolution(
          XEI1,
          XN1,
          XEF1,
          YEI1,
          YN1,
          YEF1,
          s
        );
        H[i][j] = intH0;
        G[i][j] = intG0;
      }
    }
  }
  // Assigning boundary conditions to the system
  let HF = [];
  let GF = [0];

  for (let i = 0; i < 4 * nSide; i++) {
    HF[i] = [];
    GF[i] = 0;
    for (let j = 0; j < 4 * nSide; j++) {
      if (bCT[j] === 1) {
        H[i][j] = H[i][j] * vBCT[j];
        HF[i][j] = -G[i][j];
        GF[i] = GF[i] - H[i][j];
      }

      if (bCQ[j] === 1) {
        G[i][j] = G[i][j] * vBCQ[j];
        HF[i][j] = H[i][j];
        GF[i] = GF[i] + G[i][j];
      }
    }
  }
  // solving final linear system
  let GFINAL = [0];
  let TBOUNDARY = [];
  let QBOUNDARY = [];
  GFINAL = linSystemSolverJordan(4 * nSide, 4 * nSide, HF, GF);

  // Rearranging solutions and boundary conditions on the boundary of the problem
  for (let j = 0; j < 4 * nSide; j++) {
    if (bCT[j] === 1) {
      TBOUNDARY[j] = vBCT[j];
      QBOUNDARY[j] = GFINAL[j];
    }

    if (bCQ[j] === 1) {
      TBOUNDARY[j] = GFINAL[j];
      QBOUNDARY[j] = vBCQ[j];
    }
  }
  // calculating temperature in internal points
  let TINTERN = [0];

  for (let i = 0; i < (ip ? nInt + ip.length : nInt); i++) {
    TINTERN[i] = 0;
    for (let j = 0; j < 4 * nSide; j++) {
      let XEI1 = xEI[j];
      let XN1 = xN[i + 4 * nSide];
      let XEF1 = xEF[j];
      let YEI1 = yEI[j];
      let YN1 = yN[i + 4 * nSide];
      let YEF1 = yEF[j];
      let s = false;
      let { intH0, intG0 } = fundamentalSolution(
        XEI1,
        XN1,
        XEF1,
        YEI1,
        YN1,
        YEF1,
        s
      );
      TINTERN[i] = TINTERN[i] + (-intH0 * TBOUNDARY[j] + intG0 * QBOUNDARY[j]);
    }
  }

  //Creating solution matrices
  let solution = [];
  let TsolutionBoundary = [];
  let QsolutionBoundary = [];

  for (let i = 0; i < 4 * nSide; i++) {
    solution[i] = [];
    solution[i][0] = xN[i];
    solution[i][1] = yN[i];
    solution[i][2] = TBOUNDARY[i];

    TsolutionBoundary[i] = [];
    TsolutionBoundary[i][0] = xN[i];
    TsolutionBoundary[i][1] = yN[i];
    TsolutionBoundary[i][2] = TBOUNDARY[i];

    QsolutionBoundary[i] = [];
    QsolutionBoundary[i][0] = xN[i];
    QsolutionBoundary[i][1] = yN[i];
    QsolutionBoundary[i][2] = QBOUNDARY[i];
  }
  for (let i = 0; i < (ip ? nInt + ip.length : nInt); i++) {
    solution[i + 4 * nSide] = [];
    solution[i + 4 * nSide][0] = xN[i + 4 * nSide];
    solution[i + 4 * nSide][1] = yN[i + 4 * nSide];
    solution[i + 4 * nSide][2] = TINTERN[i];
  }

  return solution;
}

export default thermalRectangular;
