
describe.skip('app Entry Point - /src/index.jsx', () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('renders app wihtout error', () => {
    require('index.jsx');
  });
});
