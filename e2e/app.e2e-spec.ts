import { NgTopShopPage } from './app.po';

describe('ng-top-shop App', () => {
  let page: NgTopShopPage;

  beforeEach(() => {
    page = new NgTopShopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
