export const isNotWord = (char: string) => {
  return /begin((?!char).)*end/gm;
};
