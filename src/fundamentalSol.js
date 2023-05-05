function fundamentalSolution(XEI1, XN1, XEF1, YEI1, YN1, YEF1, s) {
  if (s) {
    let intH0 = 0.5;
    let intG0 =
      (-Math.sqrt((XEF1 - XEI1) ** 2 + (YEF1 - YEI1) ** 2) *
        (Math.log(Math.sqrt((XEF1 - XEI1) ** 2 + (YEF1 - YEI1) ** 2) / 2) -
          1)) /
      3.1415926535897932385 /
      2;
    return { intH0, intG0 };
  }
  if (!s) {
    let intH0 = -(
      (Math.atan(
        (-(XEI1 ** 2) +
          XEI1 * XEF1 -
          YEI1 ** 2 +
          YEI1 * YEF1 +
          YEI1 * YN1 -
          XEF1 * XN1 -
          YEF1 * YN1 +
          XEI1 * XN1) /
          (-XEF1 * YN1 -
            XEI1 * YEF1 +
            YEF1 * XN1 -
            YEI1 * XN1 +
            XEF1 * YEI1 +
            XEI1 * YN1)
      ) -
        Math.atan(
          (-XEI1 * XEF1 +
            XEF1 ** 2 -
            YEI1 * YEF1 +
            YEF1 ** 2 +
            YEI1 * YN1 -
            XEF1 * XN1 -
            YEF1 * YN1 +
            XEI1 * XN1) /
            (-XEF1 * YN1 -
              XEI1 * YEF1 +
              YEF1 * XN1 -
              YEI1 * XN1 +
              XEF1 * YEI1 +
              XEI1 * YN1)
        )) /
      3.1415926535897932385 /
      2
    );

    let inta = 4;
    let intb = 16;
    let intG0 =
      ((-(
        0.5 *
        (-(
          (1 / (XEI1 ** 2 - 2 * XEI1 * XEF1 + XEF1 ** 2 + (YEI1 - YEF1) ** 2)) *
          (2 * XEI1 ** 2 -
            4 * XEI1 * XEF1 +
            2 * XEF1 ** 2 +
            2 * YEI1 ** 2 -
            4 * YEI1 * YEF1 +
            2 * YEF1 ** 2 +
            4 *
              (YN1 * (XEI1 - XEF1) +
                XEF1 * YEI1 -
                XEI1 * YEF1 +
                XN1 * (-YEI1 + YEF1)) *
              Math.atan(
                (-(XEI1 ** 2) +
                  XN1 * (XEI1 - XEF1) +
                  XEI1 * XEF1 +
                  (YN1 - YEI1) * (YEI1 - YEF1)) /
                  (YN1 * (XEI1 - XEF1) +
                    XEF1 * YEI1 -
                    XEI1 * YEF1 +
                    XN1 * (-YEI1 + YEF1))
              ) -
            XEI1 ** 2 * Math.log(inta) -
            2 * XN1 * XEF1 * Math.log(inta) +
            XEF1 ** 2 * Math.log(inta) -
            YEI1 ** 2 * Math.log(inta) -
            2 * YN1 * YEF1 * Math.log(inta) +
            YEF1 ** 2 * Math.log(inta) +
            XN1 * XEI1 * Math.log(intb) +
            YN1 * YEI1 * Math.log(intb) -
            2 *
              (XEI1 ** 2 -
                XEI1 * XEF1 +
                XN1 * (-XEI1 + XEF1) -
                (YN1 - YEI1) * (YEI1 - YEF1)) *
              Math.log(
                XN1 ** 2 +
                  YN1 ** 2 -
                  2 * XN1 * XEI1 +
                  XEI1 ** 2 -
                  2 * YN1 * YEI1 +
                  YEI1 ** 2
              ))
        ) -
          (1 / (XEI1 ** 2 - 2 * XEI1 * XEF1 + XEF1 ** 2 + (YEI1 - YEF1) ** 2)) *
            (2 * XEI1 ** 2 -
              4 * XEI1 * XEF1 +
              2 * XEF1 ** 2 +
              2 * YEI1 ** 2 -
              4 * YEI1 * YEF1 +
              2 * YEF1 ** 2 -
              4 *
                (YN1 * (XEI1 - XEF1) +
                  XEF1 * YEI1 -
                  XEI1 * YEF1 +
                  XN1 * (-YEI1 + YEF1)) *
                Math.atan(
                  (XN1 * XEI1 -
                    XN1 * XEF1 -
                    XEI1 * XEF1 +
                    XEF1 ** 2 +
                    YN1 * YEI1 -
                    YN1 * YEF1 -
                    YEI1 * YEF1 +
                    YEF1 ** 2) /
                    (YN1 * XEI1 -
                      YN1 * XEF1 -
                      XN1 * YEI1 +
                      XEF1 * YEI1 +
                      XN1 * YEF1 -
                      XEI1 * YEF1)
                ) -
              2 * XN1 * XEI1 * Math.log(inta) +
              XEI1 ** 2 * Math.log(inta) -
              XEF1 ** 2 * Math.log(inta) -
              2 * YN1 * YEI1 * Math.log(inta) +
              YEI1 ** 2 * Math.log(inta) -
              YEF1 ** 2 * Math.log(inta) +
              XN1 * XEF1 * Math.log(intb) +
              YN1 * YEF1 * Math.log(intb) -
              2 *
                (XN1 * (XEI1 - XEF1) -
                  XEI1 * XEF1 +
                  XEF1 ** 2 +
                  YN1 * YEI1 -
                  YN1 * YEF1 -
                  YEI1 * YEF1 +
                  YEF1 ** 2) *
                Math.log(
                  XN1 ** 2 +
                    YN1 ** 2 -
                    2 * XN1 * XEF1 +
                    XEF1 ** 2 -
                    2 * YN1 * YEF1 +
                    YEF1 ** 2
                )))
      ) /
        (2 * 3.1415926535897932385)) *
        Math.sqrt(
          XEF1 ** 2 -
            2 * XEF1 * XEI1 +
            XEI1 ** 2 +
            YEF1 ** 2 -
            2 * YEF1 * YEI1 +
            YEI1 ** 2
        )) /
      2;

    return { intH0, intG0 };
  }
}

export default fundamentalSolution;
