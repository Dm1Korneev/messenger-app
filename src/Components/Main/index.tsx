
import { App } from 'Components/App';
import { QueryClientProvider } from 'Components/QueryClientProvider';
import { StoreProvider } from 'Components/StoreProvider';
import { ThemeProvider } from 'Components/ThemeProvider';

const Main = () => (
  <StoreProvider>
    <ThemeProvider>
      <QueryClientProvider>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default Main;
