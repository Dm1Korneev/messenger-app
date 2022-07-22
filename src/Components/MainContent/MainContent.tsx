import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { MessageInput } from 'Components/MessageInput';
import { MessagesList } from 'Components/MessagesList';

type MainContentProps = {
  activeChatId?: string
}

export const MainContent = ({ activeChatId }: MainContentProps) => (
  <Box mx={2} width="100%">
    <Grid height="100%" item lg={9} md={10} sm={11} xs={12}>
      <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
        <Box mt={1} sx={(theme) => theme.mixins.toolbar} />
        <MessagesList activeChatId={activeChatId} />
        {activeChatId && <MessageInput activeChatId={activeChatId} />}
      </Box>
    </Grid>
  </Box>
);
