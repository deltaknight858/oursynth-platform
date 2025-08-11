import { createTheme, styled } from '@mui/material/styles';

describe('createMixins type checking', () => {
  test('theme mixins can be customized', () => {
    const theme = createTheme({
      mixins: {
        toolbar: {
          background: '#fff',
          minHeight: 36,
          '@media (min-width:0px) and (orientation: landscape)': {
            minHeight: 24,
          },
          '@media (min-width:600px)': {
            minHeight: 48,
          },
        },
      },
    });
    
    expect(theme.mixins.toolbar.background).toBe('#fff');
    expect(theme.mixins.toolbar.minHeight).toBe(36);
  });

  test('styled components can use mixins', () => {
    const StyledComponent = styled('div')(({ theme }) => ({
      appBarSpacer: theme.mixins.toolbar,
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
    }));
    
    expect(StyledComponent).toBeDefined();
  });
});
