function linSystemSolverJordan(A, L, H2, HFINAL) {
  let H = new Array(A).fill().map(() => new Array(L + 1));
  let AUXILIAR = new Array(A).fill().map(() => new Array(L + 1));

  for (let i = 0; i < A; i++) {
    for (let j = 0; j < L; j++) {
      H[i][j] = H2[i][j];
    }
  }

  for (let i = 0; i < A; i++) {
    H[i][L] = HFINAL[i];
  }

  for (let i = 0; i < A; i++) {
    for (let j = 0; j < L + 1; j++) {
      if (i == j) {
        if (Math.abs(H[i][j]) < 1.0e-20) {
          if (i < A) {
            for (let kk = i + 1; kk < A; kk++) {
              if (Math.abs(H[kk][j]) < 1.0e-20) {
                continue;
              }
              for (let k = 0; k < L + 1; k++) {
                AUXILIAR[i][k] = H[kk][k];
                H[kk][k] = H[i][k];
                H[i][k] = AUXILIAR[i][k];
              }
              break;
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < A; i++) {
    for (let j = 0; j < L + 1; j++) {
      if (i == j) {
        let pivot = H[i][j];
        for (let k = 0; k < L + 1; k++) {
          H[i][k] = H[i][k] / pivot;
        }
        if (i < A) {
          for (let kk = i + 1; kk < A; kk++) {
            let pivot2 = H[kk][j];
            for (let k = 0; k < L + 1; k++) {
              H[kk][k] = H[kk][k] - H[i][k] * pivot2;
            }
          }
        }
      }
    }
  }

  for (let i = A - 1; i >= 0; i--) {
    for (let j = L; j >= 0; j--) {
      if (i == j) {
        if (i > 0) {
          for (let kk = i - 1; kk >= 0; kk--) {
            let pivot2 = H[kk][j];
            for (let k = L; k >= 0; k--) {
              H[kk][k] = H[kk][k] - H[i][k] * pivot2;
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < A; i++) {
    HFINAL[i] = H[i][L];
  }
  return HFINAL;
}

export default linSystemSolverJordan;
