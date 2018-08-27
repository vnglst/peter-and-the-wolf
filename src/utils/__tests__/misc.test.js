import { isNumeric } from '../misc';

describe('isNumeric', () => {
  it('1 is a number', () => {
    expect(isNumeric(1)).toBeTruthy();
  });

  it('object is not a number', () => {
    expect(isNumeric({})).toBeFalsy();
  });

  it('string is not a number', () => {
    expect(isNumeric('test')).toBeFalsy();
  });

  it('string is not a number, even if it represents a number', () => {
    expect(isNumeric('1')).toBeFalsy();
  });
});
