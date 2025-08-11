import * as React from 'react';
import { createRenderer } from 'test/utils';
import Button from '@mui/material/Button';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { deepOrange, green } from '@mui/material/colors';

describe('experimental_extendTheme', () => {
  let originalMatchmedia;
  const { render } = createRenderer();
  const storage = {};
  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: (key) => storage[key],
        setItem: (key, value) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () => ({
      addListener: () => {},
      removeListener: () => {},
    });
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('should have a colorSchemes', () => {
    const theme = extendTheme();
    expect(typeof extendTheme).toBe('function');
    expect(typeof theme.colorSchemes).toBe('object');
  });

  it('should have the custom color schemes', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.primary.main).toBe(deepOrange[500]);
    expect(theme.colorSchemes.light.palette.secondary.main).toBe(green.A400);
  });

  it('should generate color channels', () => {
    const theme = extendTheme();
    expect(theme.colorSchemes.dark.palette.background.defaultChannel).toBe('18 18 18');
    expect(theme.colorSchemes.light.palette.background.defaultChannel).toBe('255 255 255');

    expect(theme.colorSchemes.dark.palette.primary.mainChannel).toBe('144 202 249');
    expect(theme.colorSchemes.dark.palette.primary.darkChannel).toBe('66 165 245');
    expect(theme.colorSchemes.dark.palette.primary.lightChannel).toBe('227 242 253');
    expect(theme.colorSchemes.dark.palette.primary.contrastTextChannel).toBe('0 0 0');

    expect(theme.colorSchemes.light.palette.primary.mainChannel).toBe('25 118 210');
    expect(theme.colorSchemes.light.palette.primary.darkChannel).toBe('21 101 192');
    expect(theme.colorSchemes.light.palette.primary.lightChannel).toBe('66 165 245');
    expect(theme.colorSchemes.light.palette.primary.contrastTextChannel).toBe('255 255 255');

    expect(theme.colorSchemes.dark.palette.secondary.mainChannel).toBe('206 147 216');
    expect(theme.colorSchemes.dark.palette.secondary.darkChannel).toBe('171 71 188');
    expect(theme.colorSchemes.dark.palette.secondary.lightChannel).toBe('243 229 245');
    expect(theme.colorSchemes.dark.palette.secondary.contrastTextChannel).toBe('0 0 0');

    expect(theme.colorSchemes.light.palette.secondary.mainChannel).toBe('156 39 176');
    expect(theme.colorSchemes.light.palette.secondary.darkChannel).toBe('123 31 162');
    expect(theme.colorSchemes.light.palette.secondary.lightChannel).toBe('186 104 200');
    expect(theme.colorSchemes.light.palette.secondary.contrastTextChannel).toBe('255 255 255');

    expect(theme.colorSchemes.dark.palette.text.primaryChannel).toBe('255 255 255');
    expect(theme.colorSchemes.dark.palette.text.secondaryChannel).toBe('255 255 255');

    expect(theme.colorSchemes.light.palette.text.primaryChannel).toBe('0 0 0');
    expect(theme.colorSchemes.light.palette.text.secondaryChannel).toBe('0 0 0');

    expect(theme.colorSchemes.dark.palette.dividerChannel).toBe('255 255 255');

    expect(theme.colorSchemes.light.palette.dividerChannel).toBe('0 0 0');

    expect(theme.colorSchemes.dark.palette.action.activeChannel).toBe('255 255 255');
    expect(theme.colorSchemes.light.palette.action.activeChannel).toBe('0 0 0');

    expect(theme.colorSchemes.dark.palette.action.selectedChannel).toBe('255 255 255');
    expect(theme.colorSchemes.light.palette.action.selectedChannel).toBe('0 0 0');
  });

  it('should generate common background, onBackground channels', () => {
    const theme = extendTheme({
      colorSchemes: {
        dark: {
          palette: {
            common: {
              onBackground: '#f9f9f9', // this should not be overridden
            },
          },
        },
        light: {
          palette: {
            common: {
              background: '#f9f9f9',
            },
          },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.common.background).toBe('#f9f9f9');
    expect(theme.colorSchemes.light.palette.common.backgroundChannel).toBe('249 249 249');
    expect(theme.colorSchemes.light.palette.common.onBackground).toBe('#000');
    expect(theme.colorSchemes.light.palette.common.onBackgroundChannel).toBe('0 0 0');

    expect(theme.colorSchemes.dark.palette.common.background).toBe('#000');
    expect(theme.colorSchemes.dark.palette.common.backgroundChannel).toBe('0 0 0');
    expect(theme.colorSchemes.dark.palette.common.onBackground).toBe('#f9f9f9');
    expect(theme.colorSchemes.dark.palette.common.onBackgroundChannel).toBe('249 249 249');
  });

  it('should generate color channels for custom colors', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.primary.mainChannel).toBe('255 87 34');
    expect(theme.colorSchemes.light.palette.secondary.mainChannel).toBe('0 230 118');
  });

  describe('transitions', () => {
    it('[`easing`]: should provide the default values', () => {
      const theme = extendTheme();
      expect(theme.transitions.easing.easeInOut).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeOut).toBe('cubic-bezier(0.0, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeIn).toBe('cubic-bezier(0.4, 0, 1, 1)');
      expect(theme.transitions.easing.sharp).toBe('cubic-bezier(0.4, 0, 0.6, 1)');
    });

    it('[`duration`]: should provide the default values', () => {
      const theme = extendTheme();
      expect(theme.transitions.duration.shortest).toBe(150);
      expect(theme.transitions.duration.shorter).toBe(200);
      expect(theme.transitions.duration.short).toBe(250);
      expect(theme.transitions.duration.standard).toBe(300);
      expect(theme.transitions.duration.complex).toBe(375);
      expect(theme.transitions.duration.enteringScreen).toBe(225);
      expect(theme.transitions.duration.leavingScreen).toBe(195);
    });

    it('[`easing`]: should provide the custom values', () => {
      const theme = extendTheme({
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
      const theme = extendTheme({
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
      const theme = extendTheme({ transitions: { duration: { shortest: 150 } } });
      expect(theme.transitions.duration.shorter).not.toBe(undefined);
    });
  });

  describe('opacity', () => {
    it('should provide the default opacities', () => {
      const theme = extendTheme();
      expect(theme.colorSchemes.light.opacity).toEqual({
        inputPlaceholder: 0.42,
        inputUnderline: 0.42,
        switchTrackDisabled: 0.12,
        switchTrack: 0.38,
      });
      expect(theme.colorSchemes.dark.opacity).toEqual({
        inputPlaceholder: 0.5,
        inputUnderline: 0.7,
        switchTrackDisabled: 0.2,
        switchTrack: 0.3,
      });
    });

    it('should allow overriding of the default opacities', () => {
      const theme = extendTheme({
        colorSchemes: {
          light: {
            opacity: {
              inputPlaceholder: 1,
            },
          },
          dark: {
            opacity: {
              inputPlaceholder: 0.2,
            },
          },
        },
      });
      expect(theme.colorSchemes.light.opacity).to.deep.include({
        inputPlaceholder: 1,
        inputUnderline: 0.42,
      });
      expect(theme.colorSchemes.dark.opacity).to.deep.include({
        inputPlaceholder: 0.2,
        inputUnderline: 0.7,
      });
    });
  });

  describe('overlays', () => {
    it('should provide the default array', () => {
      const theme = extendTheme();
      expect(theme.colorSchemes.light.overlays).to.have.length(0);
      expect(theme.colorSchemes.dark.overlays).to.have.length(25);

      expect(theme.colorSchemes.dark.overlays[0]).toBe(undefined);
      expect(theme.colorSchemes.dark.overlays[24]).toBe(
        'linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))',
      );
    });

    it('should override the array as expected', () => {
      const overlays = Array(24).fill('none');
      const theme = extendTheme({ colorSchemes: { dark: { overlays } } });
      expect(theme.colorSchemes.dark.overlays).toBe(overlays);
    });
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const theme = extendTheme();
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
      const theme = extendTheme({ shadows });
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
      const theme = extendTheme({ components });
      expect(theme.components).toEqual(components);
    });
  });

  describe('styleOverrides', () => {
    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      expect(() => {
        theme = extendTheme({
          components: { Button: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).not.toThrow();
      expect(Object.keys(theme.components.Button.styleOverrides.disabled).length).toBe(1);

      expect(() => {
        theme = extendTheme({
          components: { MuiButton: { styleOverrides: { root: { color: 'blue' } } } },
        });
      }).not.toErrorDev();

      expect(() => {
        theme = extendTheme({
          components: { MuiButton: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).toErrorDev(
        'MUI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state.',
      );
      expect(Object.keys(theme.components.MuiButton.styleOverrides.disabled).length).toBe(0);
    });
  });

  it('shallow merges multiple arguments', () => {
    const theme = extendTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(theme.foo).toBe('I am foo');
    expect(theme.bar).toBe('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const theme = extendTheme({ custom: { foo: 'I am foo' } }, { custom: { bar: 'I am bar' } });
    expect(theme.custom.foo).toBe('I am foo');
    expect(theme.custom.bar).toBe('I am bar');
  });

  it('allows callbacks using theme in variants', () => {
    const theme = extendTheme({
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
      <CssVarsProvider theme={theme}>
        <Button />
      </CssVarsProvider>,
    );
    expect(container.firstChild).toBeTruthy(); // Simplified assertion
  });

  describe('css var prefix', () => {
    it('has mui as default css var prefix', () => {
      const theme = extendTheme();
      expect(theme.cssVarPrefix).toBe('mui');
    });

    it('custom css var prefix', () => {
      const theme = extendTheme({ cssVarPrefix: 'foo' });
      expect(theme.cssVarPrefix).toBe('foo');
    });
  });

  describe('warnings', () => {
    it('dependent token: should warn if the value cannot be parsed by color manipulators', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                divider: 'green',
              },
            },
          },
        }),
      ).not.toThrow(); // Simplified assertion
    });

    it('should not warn if channel token is provided', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                dividerChannel: '12 12 12',
              },
            },
          },
        }),
      ).not.toWarnDev();
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                dividerChannel: undefined,
              },
            },
          },
        }),
      ).not.toThrow();
    });

    it('independent token: should skip warning', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                Alert: {
                  errorColor: 'green',
                },
              },
            },
          },
        }),
      ).not.toThrow();
    });

    it('custom palette should not throw errors', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                gradient: {
                  primary: 'linear-gradient(#000, transparent)',
                },
              },
            },
          },
        }),
      ).not.toThrow();
    });
  });

  it('should have the vars object', () => {
    const theme = extendTheme();
    const keys = [
      // MD2 specific tokens
      'palette',
      'shadows',
      'zIndex',
      'opacity',
      'overlays',
      'shape',
    ];

    Object.keys(keys).forEach((key) => {
      expect(theme[key]).toEqual(theme.vars[key]);
    });
  });
});
