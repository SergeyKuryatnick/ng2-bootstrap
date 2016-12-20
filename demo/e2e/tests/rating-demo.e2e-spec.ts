import { $, $$, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';
import WebElement = webdriver.WebElement;

let using = require('jasmine-data-provider');
const barStarsCount = $$('rating-demo>rating .glyphicon.glyphicon-star');
const barCustomIcons1stBarCount = $$('div:nth-of-type(1)>rating .glyphicon.glyphicon-ok-sign');
const barCustomIcons1stBarRate = $('div:nth-of-type(1)>b');
const barCustomIcons2ndBarRate = $('div:nth-of-type(2)>b');
const buttonClear = $('button:nth-of-type(1)');
const buttonToggle = $('button:nth-of-type(2)');
const statusBarRate = $('.card>b:nth-of-type(1)');
const statusBarReadonly = $('.card>i');
const statusBarHovering = $('.card>b:nth-of-type(2)');
const percentInfo = $('rating-demo>span');

const getStarPosition = (starPosition:number) => {
  return $('rating-demo>rating i:nth-of-type(' + starPosition + ')');
};
const getCustomIconPosition1stBar = (customIconPosition:number) => {
  return $('div:nth-of-type(1)>rating i:nth-of-type(' + customIconPosition + ')');
};
const getCustomIconPosition2ndBar = (customIconPosition:number) => {
  return $('div:nth-of-type(2)>rating i:nth-of-type(' + customIconPosition + ')');
};
const getCustomIconImage2ndBar = (customIconPosition:number) => {
  return $('div:nth-of-type(2)>rating i:nth-of-type(' + customIconPosition + ')');
};

describe('Check the Rating page in bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/rating');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  it ('Stars rating bar. Defaults states', () => {
    expect(barStarsCount.count()).toBe(7);
    expect(statusBarRate.getText()).toBe('7');
    expect(statusBarHovering.getText()).toBe('none');
  });
  it('Stars rating bar. Change values', () => {
    getStarPosition(2).click();
    expect(barStarsCount.count()).toBe(2);
    expect(statusBarRate.getText()).toBe('2');
    getStarPosition(10).click();
    expect(barStarsCount.count()).toBe(10);
    expect(statusBarRate.getText()).toBe('10');
  });
  it('Stars rating bar. Clear button', () => {
    buttonClear.click();
    expect(barStarsCount.count()).toBe(0);
    expect(statusBarRate.getText()).toBe('0');
  });
  it('Stars rating bar. Toggle button', () => {
    getStarPosition(5).click();
    buttonToggle.click();
    expect(barStarsCount.count()).toBe(5);
    expect(buttonClear.isEnabled()).toBe(false);
    expect(statusBarReadonly.getText()).toBe('true');
    buttonToggle.click();
    expect(buttonClear.isEnabled()).toBe(true);
    expect(statusBarReadonly.getText()).toBe('false');
  });
  using (DataProvider.ratingStarsBarTextValues, (data:any, description:string) => {
    it ('Check text for each star: ' + description, () => {
      browser.actions()
        .mouseMove(data.element())
        .perform();
      expect(percentInfo.getText()).toBe(data.percentInfo);
      expect(statusBarHovering.getText()).toBe(data.hoveringText);
      data.element().click();
      expect(statusBarRate.getText()).toBe(data.hoveringText);
      });
  });
  it ('Custom icons. Default values', () => {
  expect(barCustomIcons1stBarCount.count()).toBe(5);
  expect(barCustomIcons1stBarRate.getText()).toContain(5);
  });
  it ('Custom icons. Change values', () => {
    getCustomIconPosition1stBar(1).click();
    expect(barCustomIcons1stBarCount.count()).toBe(1);
    expect(barCustomIcons1stBarRate.getText()).toContain(1);
    getCustomIconPosition1stBar(15).click();
    expect(barCustomIcons1stBarCount.count()).toBe(15);
    expect(barCustomIcons1stBarRate.getText()).toContain(15);
  });
  it ('Custom icons. Check second bar defaults icons', () => {
    getCustomIconPosition2ndBar(1).click();
    expect(barCustomIcons2ndBarRate.getText()).toContain(1);
    expect(getCustomIconImage2ndBar(1).getAttribute('class')).toContain('ok-sign');
    expect(getCustomIconImage2ndBar(2).getAttribute('class')).toContain('star-empty');
    expect(getCustomIconImage2ndBar(3).getAttribute('class')).toContain('ban-circle');
    expect(getCustomIconImage2ndBar(4).getAttribute('class')).toContain('star-empty');
    expect(getCustomIconImage2ndBar(5).getAttribute('class')).toContain('off');
  });
  it ('Custom icons. Check second bar filled icons', () => {
    getCustomIconPosition2ndBar(5).click();
    expect(barCustomIcons2ndBarRate.getText()).toContain(5);
    expect(getCustomIconImage2ndBar(2).getAttribute('class')).toContain('star');
    expect(getCustomIconImage2ndBar(3).getAttribute('class')).toContain('heart');
    expect(getCustomIconImage2ndBar(4).getAttribute('class')).toContain('heart');
    expect(getCustomIconImage2ndBar(5).getAttribute('class')).toContain('star');
  });
});
