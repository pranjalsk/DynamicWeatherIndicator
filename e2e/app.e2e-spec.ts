import { SER421lab5Page } from './app.po';

describe('ser421lab5 App', function() {
  let page: SER421lab5Page;

  beforeEach(() => {
    page = new SER421lab5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
