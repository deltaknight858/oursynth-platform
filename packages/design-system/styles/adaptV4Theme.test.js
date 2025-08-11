import defaultTheme from '@mui/material/styles/defaultTheme';
import adaptV4Theme from './adaptV4Theme';

describe('adaptV4Theme', () => {
  describe('theme.components', () => {
    it("moves props to components' defaultProps", () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.components.MuiButton.defaultProps).toEqual(
        theme.props.MuiButton,
      );
    });

    it("moves overrides to components' styleOverrides", () => {
      const theme = {
        overrides: {
          MuiTable: {
            root: {
              background: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.components.MuiTable.styleOverrides).toEqual(
        theme.overrides.MuiTable,
      );
    });

    it('moves props, and overrides to components', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
        },
        overrides: {
          MuiTable: {
            root: {
              background: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.components.MuiButton.defaultProps).toEqual(
        theme.props.MuiButton,
      );
      expect(transformedTheme.components.MuiTable.styleOverrides).toEqual(
        theme.overrides.MuiTable,
      );
    });

    it('merges props and overrides to components', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
        },
        overrides: {
          MuiButton: {
            root: {
              background: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.components.MuiButton.defaultProps).toEqual(
        theme.props.MuiButton,
      );
      expect(transformedTheme.components.MuiButton.styleOverrides).toEqual(
        theme.overrides.MuiButton,
      );
    });

    it('merges props and overrides from different components in appropriate key', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true,
          },
          MuiFab: {
            color: 'primary',
          },
        },
        overrides: {
          MuiButton: {
            root: {
              background: 'red',
            },
          },
          MuiFab: {
            root: {
              color: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.components.MuiButton.defaultProps).toEqual(
        theme.props.MuiButton,
      );
      expect(transformedTheme.components.MuiButton.styleOverrides).toEqual(
        theme.overrides.MuiButton,
      );

      expect(transformedTheme.components.MuiFab.defaultProps).toEqual(theme.props.MuiFab);
      expect(transformedTheme.components.MuiFab.styleOverrides).toEqual(
        theme.overrides.MuiFab,
      );
    });

    it('merges partially migrated props and overrides from different components in appropriate key', () => {
      const theme = {
        defaultProps: {
          MuiButton: {
            disabled: true,
          },
          MuiFab: {
            color: 'primary',
          },
        },
        styleOverrides: {
          MuiButton: {
            root: {
              background: 'red',
            },
          },
          MuiFab: {
            root: {
              color: 'red',
            },
          },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.components.MuiButton.defaultProps).toEqual(
        theme.defaultProps.MuiButton,
      );
      expect(transformedTheme.components.MuiButton.styleOverrides).toEqual(
        theme.styleOverrides.MuiButton,
      );

      expect(transformedTheme.components.MuiFab.defaultProps).toEqual(
        theme.defaultProps.MuiFab,
      );
      expect(transformedTheme.components.MuiFab.styleOverrides).toEqual(
        theme.styleOverrides.MuiFab,
      );
    });
  });

  describe('theme.mixins.gutters()', () => {
    it('is added to the theme', () => {
      const defaultSpacing = 8;
      const theme = {};

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.mixins.gutters()).toEqual({
        paddingLeft: `${defaultSpacing * 2}px`,
        paddingRight: `${defaultSpacing * 2}px`,
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          paddingLeft: `${defaultSpacing * 3}px`,
          paddingRight: `${defaultSpacing * 3}px`,
        },
      });
    });

    it('respects theme spacing', () => {
      const spacing = 100;
      const theme = { spacing };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.mixins.gutters()).toEqual({
        paddingLeft: `${spacing * 2}px`,
        paddingRight: `${spacing * 2}px`,
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          paddingLeft: `${spacing * 3}px`,
          paddingRight: `${spacing * 3}px`,
        },
      });
    });

    it('does not remove the mixins defined in the input theme', () => {
      const defaultSpacing = 8;
      const theme = {
        mixins: {
          test: { display: 'block' },
        },
      };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.mixins.test).toEqual({
        display: 'block',
      });

      expect(transformedTheme.mixins.gutters()).toEqual({
        paddingLeft: `${defaultSpacing * 2}px`,
        paddingRight: `${defaultSpacing * 2}px`,
        [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
          paddingLeft: `${defaultSpacing * 3}px`,
          paddingRight: `${defaultSpacing * 3}px`,
        },
      });
    });
  });

  describe('theme.palette.text.hint', () => {
    it('is added to the theme', () => {
      const theme = {};

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.palette.text.hint).toBe('rgba(0, 0, 0, 0.38)');
    });

    it('is added to a dark theme using the old palette.type value', () => {
      const theme = { palette: { type: 'dark' } };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.palette.text.hint).toBe('rgba(255, 255, 255, 0.5)');
    });

    it('is added to a dark theme', () => {
      const theme = { palette: { mode: 'dark' } };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.palette.text.hint).toBe('rgba(255, 255, 255, 0.5)');
    });
  });

  describe('theme.palette.mode', () => {
    it('converts theme.palette.type to theme.palette.mode', () => {
      const theme = { palette: { type: 'dark' } };

      let transformedTheme;

      expect(() => {
        transformedTheme = adaptV4Theme(theme);
      }).not.toThrow();

      expect(transformedTheme.palette.mode).toBe('dark');
    });
  });
});
