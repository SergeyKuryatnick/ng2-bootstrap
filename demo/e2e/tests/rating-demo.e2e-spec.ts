import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';

const barStarsCount = $$('rating-demo>rating .glyphicon.glyphicon-star');
const buttonClear = $('button:nth-of-type(1)');
const buttonToggle = $('button:nth-of-type(1)');

const getStarPosition = (starPosition:number) => {
  return $('rating-demo>rating i:nth-of-type(' + starPosition + ')');
};

describe('Check the Rating page in bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/rating');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  it ('Stars rating bar. Defaults states', () => {
    expect(barStarsCount.count()).toBe(7);
  });
  it('Stars rating bar. Change values', () => {
    getStarPosition(2).click();
    expect(barStarsCount.count()).toBe(2);
    getStarPosition(10).click();
    expect(barStarsCount.count()).toBe(10);
  });
  it('Stars rating bar. Clear button', () => {
    buttonClear.click();
    expect(barStarsCount.count()).toBe(0);
  });
  it('Stars rating bar. Toggle button', () => {
    buttonToggle.click();
    expect(buttonClear.isEnabled()).toBe(false);
    buttonToggle.click();
    expect(buttonClear.isEnabled()).toBe(true);
  });
});
