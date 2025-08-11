import * as React from 'react';
import { createRenderer } from 'test/utils';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepOrange, green } from '@mui/material/colors';

describe('createTheme', () => {
  const { render } = createRenderer();

  it('should have a palette', () => {
    const theme = createTheme();
    expect(typeof createTheme).toBe('function');
    expect(typeof theme.palette).toBe('object');
  });

  it('should have the custom palette', () => {
    const theme = createTheme({
      palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
    });
    expect(theme.palette.primary.main).toBe(deepOrange[500]);
    expect(theme.palette.secondary.main).toBe(green.A400);
  });

  describe('transitions', () => {
    it('[`easing`]: should provide the default values', () => {
      const theme = createTheme();
      expect(theme.transitions.easing.easeInOut).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeOut).toBe('cubic-bezier(0.0, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeIn).toBe('cubic-bezier(0.4, 0, 1, 1)');
      expect(theme.transitions.easing.sharp).toBe('cubic-bezier(0.4, 0, 0.6, 1)');
    });

    it('[`duration`]: should provide the default values', () => {
      const theme = createTheme();
      expect(theme.transitions.duration.shortest).toBe(150);
      expect(theme.transitions.duration.shorter).toBe(200);
      expect(theme.transitions.duration.short).toBe(250);
      expect(theme.transitions.duration.standard).toBe(300);
      expect(theme.transitions.duration.complex).toBe(375);
      expect(theme.transitions.duration.enteringScreen).toBe(225);
      expect(theme.transitions.duration.leavingScreen).toBe(195);
    });

    it('[`easing`]: should provide the custom values', () => {
      const theme = createTheme({
        transitions: {
          easing: {
            easeInOut: 'cubic-bezier(1, 1, 1, 1)',
            easeOut: 'cubic-bezier(1, 1, 1, 1)',
            easeIn: 'cubic-bezier(1, 1, 1, 1)',
            sharp: 'cubic-bezier(1, 1, 1, 1)',
          },
        },
      });
      expect(theme.transitions.easing.easeInOut).toBe('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.easeOut).toBe('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.easeIn).toBe('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.sharp).toBe('cubic-bezier(1, 1, 1, 1)');
    });

    it('[`duration`]: should provide the custom values', () => {
      const theme = createTheme({
        transitions: {
          duration: {
            shortest: 1,
            shorter: 1,
            short: 1,
            standard: 1,
            complex: 1,
            enteringScreen: 1,
            leavingScreen: 1,
          },
        },
      });
      expect(theme.transitions.duration.shortest).toBe(1);
      expect(theme.transitions.duration.shorter).toBe(1);
      expect(theme.transitions.duration.short).toBe(1);
      expect(theme.transitions.duration.standard).toBe(1);
      expect(theme.transitions.duration.complex).toBe(1);
      expect(theme.transitions.duration.enteringScreen).toBe(1);
      expect(theme.transitions.duration.leavingScreen).toBe(1);
    });

    it('should allow providing a partial structure', () => {
      const theme = createTheme({ transitions: { duration: { shortest: 150 } } });
      expect(theme.transitions.duration.shorter).not.toBe(undefined);
    });
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const theme = createTheme();
      expect(theme.shadows[2]).toBe(
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      );
    });

    it('should override the array as expected', () => {
      const shadows = [
        'none',
        1,
        1,
        1,
        2,
        3,
        3,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        7,
        8,
        8,
        8,
        9,
        9,
        10,
        10,
        10,
        11,
        11,
      ];
      const theme = createTheme({ shadows });
      expect(theme.shadows).toBe(shadows);
    });
  });

  describe('components', () => {
    it('should have the components as expected', () => {
      const components = {
        MuiDialog: {
          defaultProps: {
            fullScreen: true,
            fullWidth: false,
          },
        },
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
        MuiPopover: {
          defaultProps: {
            container: document.createElement('div'),
          },
        },
      };
      const theme = createTheme({ components });
      expect(theme.components).toEqual(components);
    });
  });

  describe('styleOverrides', () => {
    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      expect(() => {
        theme = createTheme({
          components: { Button: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).not.toErrorDev();
      expect(Object.keys(theme.components.Button.styleOverrides.disabled).length).toBe(1);

      expect(() => {
        theme = createTheme({
          components: { MuiButton: { styleOverrides: { root: { color: 'blue' } } } },
        });
      }).not.toErrorDev();

      expect(() => {
        theme = createTheme({
          components: { MuiButton: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).toErrorDev(
        'MUI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state.',
      );
      expect(Object.keys(theme.components.MuiButton.styleOverrides.disabled).length).toBe(0);
    });
  });

  it('shallow merges multiple arguments', () => {
    const theme = createTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(theme.foo).toBe('I am foo');
    expect(theme.bar).toBe('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const theme = createTheme({ custom: { foo: 'I am foo' } }, { custom: { bar: 'I am bar' } });
    expect(theme.custom.foo).toBe('I am foo');
    expect(theme.custom.bar).toBe('I am bar');
  });

  it('allows callbacks using theme in variants', () => {
    const theme = createTheme({
      typography: {
        fontFamily: 'cursive',
      },
      components: {
        MuiButton: {
          variants: [
            {
              props: {}, // match any props combination
              style: ({ theme: t }) => {
                return {
                  fontFamily: t.typography.fontFamily,
                };
              },
            },
          ],
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ fontFamily: 'cursive' });
  });

  it('should apply the correct borderRadius styles via sx prop if theme values are 0', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      return;
    }

    const theme = createTheme({
      shape: {
        borderRadius: 0,
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '2rem', height: '2rem', borderRadius: 4 }} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
    });
  });

  it('Throw an informative error when the key `vars` is passed as part of `options` passed', () => {
    try {
      createTheme({
        vars: {
          primary: '#EF14E2',
        },
      });
    } catch (e) {
      expect(e.message).toBe(
        'MUI: `vars` is a private field used for CSS variables support.\n' +
          'Please use another name.',
      );
    }
  });
});
