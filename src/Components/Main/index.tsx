
import { App } from 'Components/App';
import { QueryClientProvider } from 'Components/QueryClientProvider';
import { SessionProvider } from 'Components/SessionProvider';
import { ThemeProvider } from 'Components/ThemeProvider';

const Main = () => (
  <ThemeProvider>
    <QueryClientProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default Main;
