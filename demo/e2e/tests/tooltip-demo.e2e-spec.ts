import { $, browser, protractor } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';
import { DataProvider } from '../data-provider/data-provider.po';

let using = require('jasmine-data-provider');
const buttonShowTooltip = $('button:nth-of-type(1)');
const buttonHideTooltip = $('button:nth-of-type(2)');
const tooltipElement = $('tooltip-container');
const tooltipDelayed = $('[tooltip="appears with delay"]');
const tooltipHTML = $('.item>tooltip-demo>p:nth-child(4)>a');
const tooltipTemplateRef = $('tooltip-demo>p:nth-child(5)>a');
const tooltipDynamic = $('tooltip-demo>p:nth-child(3)>a:nth-child(1)');
const tooltipUseCustomTriggers = $('[tooltip="See? Now click away..."]');
const tooltipTrigeeredByCustomEvents = $('tooltip-demo>p:nth-of-type(6)>a');
const tooltipCombineTriggerEvents = $('tooltip-demo>p:nth-of-type(7)>a');
const inputDynamicTooltipText = $('tooltip-demo>div:nth-child(1) input');
const inputDynamicPopupText = $('tooltip-demo>div:nth-child(2) input');
const inputDisableTooltipConditionally = $('[tooltiptrigger="mouseenter"]');

describe('Tooltip page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/tooltip');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });
  using (DataProvider.tooltipDefaultContains, (data:any, description:string) => {
    it ('Check default texts on the page: ' + description, () => {
      expect(data.element().getText()).toBe(data.actualResult);
    });
  });
  using (DataProvider.tooltipElementsTexts, (data:any, description:string) => {
    it ('Check tooltip texts: ' + description, () => {
      browser.actions()
        .mouseMove(data.element())
        .perform();
      browser.sleep(50);
      expect(tooltipElement.getText()).toBe(data.actualResult);
    });
  });
  it ('Check buttons Show/Hide tooltip', () => {
    buttonShowTooltip.click();
    expect(tooltipElement.isDisplayed()).toBe(true);
    buttonHideTooltip.click();
    expect(tooltipElement.isPresent()).toBe(false);
  });
  using (DataProvider.inputDifferentData, (data:any, description:string) => {
    it ('Check diff texts for Dynamic tooltip: ' + description, () => {
      inputDynamicPopupText.clear();
      inputDynamicPopupText.sendKeys(data.inputText);
      browser.actions()
        .mouseMove(tooltipDynamic as any)
        .perform();
      expect(tooltipElement.getText()).toBe(data.inputText);
      browser.actions()
        .mouseMove(inputDynamicTooltipText as any)
        .perform();
    });
  });
  using (DataProvider.inputDifferentData, (data:any, description:string) => {
    it ('Check tooltip texts: ' + description, () => {
      inputDynamicTooltipText.clear();
      inputDynamicTooltipText.sendKeys(data.inputText);
      expect(tooltipDynamic.getText()).toBe(data.inputText);
    });
  });
  it ('Disable tooltip conditionally. Expect to fail', () => {
    inputDisableTooltipConditionally.sendKeys('Some text');
    expect(tooltipElement.isPresent()).toBe(false);
    inputDisableTooltipConditionally.clear();
    expect(tooltipElement.isPresent()).toBe(true);
  });
  it ('Check text in tooltip TemplateRef', () => {
    browser.actions()
      .mouseMove(tooltipTemplateRef as any)
      .perform();
    expect($('.tooltip-inner>h4').getText()).toBe('Tool tip custom content defined inside a template');
    expect($('.tooltip-inner>h5').getText()).toBe('With context binding: foo');
  });
  it('Check Custom trigger tooltip', () => {
    tooltipUseCustomTriggers.click();
    expect(tooltipElement.getText()).toBe('See? Now click away...');
  });
  it ('Check HTML tooltip', () => {
    browser.actions()
      .mouseMove(tooltipHTML as any)
      .perform();
    expect(tooltipElement.getText()).toBe(`I've been made bold!`);
    browser.actions()
      .mouseMove(inputDynamicTooltipText as any)
      .perform();
  });
  it('Check triggered by custom events tooltip', () => {
    browser.actions()
      .mouseMove(tooltipTrigeeredByCustomEvents as any)
      .perform();
    expect(tooltipElement.isPresent()).toBe(false);
    tooltipTrigeeredByCustomEvents.click();
    expect(tooltipElement.getText()).toBe('I displayed after click event');
  });
  it('Check tooltip that combine trigger events', () => {
    tooltipCombineTriggerEvents.click();
    expect(tooltipElement.getText()).toBe('I displayed after click or focus event');
    tooltipTrigeeredByCustomEvents.click();
    tooltipTrigeeredByCustomEvents.sendKeys(protractor.Key.TAB);
    expect(tooltipElement.getText()).toBe('I displayed after click or focus event');
    tooltipTrigeeredByCustomEvents.click();
  });
  it ('Check Delayed tooltip', () => {
    browser.actions()
      .mouseMove(tooltipDelayed as any)
      .perform();
    browser.ignoreSynchronization=true;
    browser.sleep(200);
    expect(tooltipElement.isPresent()).toBe(false);
    browser.sleep(1010);
    expect(tooltipElement.getText()).toBe('appears with delay');
  });
});
