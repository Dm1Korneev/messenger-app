
import { App } from '../App';
import { QueryClientProvider } from '../QueryClientProvider';
import { SessionProvider } from '../SessionProvider';
import { ThemeProvider } from '../ThemeProvider';

export const Main = () => (
  <ThemeProvider>
    <QueryClientProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

