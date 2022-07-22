
import { App } from 'Components/App';
import { QueryClientProvider } from 'Components/QueryClientProvider';
import { SessionProvider } from 'Components/SessionProvider';
import { StoreProvider } from 'Components/StoreProvider';
import { ThemeProvider } from 'Components/ThemeProvider';

const Main = () => (
  <StoreProvider>
    <ThemeProvider>
      <QueryClientProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default Main;
