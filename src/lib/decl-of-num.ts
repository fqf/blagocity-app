const declOfNum =
  (forms: string[]): ((n: number) => string) =>
  (n: number): string => {
    n = Math.abs(n) % 100;

    const n1 = n % 10;

    switch (true) {
      case n > 10 && n < 20:
        return forms[2];

      case n1 > 1 && n1 < 5:
        return forms[1];

      case n1 === 1:
        return forms[0];

      default:
        return forms[2];
    }
  };

export const declOfYears = declOfNum(["год", "года", "лет"]);
