import * as React from 'react';
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  styled,
  useTheme,
  Overlays,
} from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      opacity: {
        inputPlaceholder: 0.1,
        inputUnderline: 0.1,
      },
      overlays: Array(25).fill('') as Overlays,
      palette: {
        primary: {
          main: '#1976d2',
        },
        AppBar: {
          darkBg: '',
          darkColor: '',
          defaultBg: '',
        },
        // @ts-expect-error
        mode: 'light',
        getContrastText: () => '',
        tonalOffset: 0.2,
      },
    },
    dark: {
      opacity: {},
      palette: {
        primary: {
          main: '#90caf9',
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
        }),
      },
    },
  },
});

const TestStyled = styled('div')(({ theme }) => ({
  // test that `theme.vars` works
  color: theme.vars.palette.primary.main,
  // test that `theme.getColorSchemeSelector` works
  [theme.getColorSchemeSelector('dark')]: {
    color: theme.vars.palette.common.onBackground,
  },
}));

function TestUseTheme() {
  const theme = useTheme();
  // test that `theme` from useTheme has access to CSS vars
  return <div className="test-bg">test</div>;
}

<CssVarsProvider theme={customTheme}>
  <TestStyled
    sx={(theme) => ({
      // test that `theme` in sx has access to CSS vars
      [theme.getColorSchemeSelector('dark')]: {
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
      },
    })}
  />
</CssVarsProvider>;

// Add a simple test to make Jest happy
describe('CssVarsProvider TypeScript spec', () => {
  test('should compile without TypeScript errors', () => {
    expect(customTheme).toBeDefined();
    expect(TestStyled).toBeDefined();
    expect(TestUseTheme).toBeDefined();
  });
});
