import * as React from 'react';

import { describeConformance, act, createRenderer, fireEvent, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button, { buttonClasses as classes } from '@mui/material/Button';
import ButtonBase, { touchRippleClasses } from '@mui/material/ButtonBase';
import { ClassNames } from '@emotion/react';

describe('<Button />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<Button startIcon="icon">Conformance?</Button>, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiButton',
    testDeepOverrides: { slotName: 'startIcon', slotClassName: classes.startIcon },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentsProp'],
  }));

  it('should render with the root, text, and textPrimary classes but no others', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.text);
    expect(button).toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.outlinedPrimary);
    expect(button).not.toHaveClass(classes.outlinedSecondary);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.containedPrimary);
    expect(button).not.toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.textSizeSmall);
    expect(button).not.toHaveClass(classes.textSizeLarge);
    expect(button).not.toHaveClass(classes.outlinedSizeSmall);
    expect(button).not.toHaveClass(classes.outlinedSizeLarge);
    expect(button).not.toHaveClass(classes.containedSizeSmall);
    expect(button).not.toHaveClass(classes.containedSizeLarge);
  });

  it('can render a text primary button', () => {
    const { getByRole } = render(<Button color="primary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
  });

  it('should render a text secondary button', () => {
    const { getByRole } = render(<Button color="secondary">Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).toHaveClass(classes.textSecondary);
  });

  it('should render a text success button', () => {
    render(<Button color="success">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.textError);
    expect(button).not.toHaveClass(classes.textInfo);
    expect(button).not.toHaveClass(classes.textWarning);
    expect(button).toHaveClass(classes.textSuccess);
  });

  it('should render a text error button', () => {
    render(<Button color="error">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.textSuccess);
    expect(button).not.toHaveClass(classes.textInfo);
    expect(button).not.toHaveClass(classes.textWarning);
    expect(button).toHaveClass(classes.textError);
  });

  it('should render a text info button', () => {
    render(<Button color="info">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.textSuccess);
    expect(button).not.toHaveClass(classes.textError);
    expect(button).not.toHaveClass(classes.textWarning);
    expect(button).toHaveClass(classes.textInfo);
  });

  it('should render a text warning button', () => {
    render(<Button color="warning">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.textSuccess);
    expect(button).not.toHaveClass(classes.textError);
    expect(button).not.toHaveClass(classes.textInfo);
    expect(button).toHaveClass(classes.textWarning);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<Button variant="outlined">Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.text);
  });

  it('should render a primary outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="primary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).toHaveClass(classes.outlinedPrimary);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.contained);
  });

  it('should render a secondary outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="secondary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).toHaveClass(classes.outlinedSecondary);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.contained);
  });

  it('should render an inherit outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" color="inherit">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).toHaveClass(classes.colorInherit);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.contained);
  });

  it('should render a success outlined button', () => {
    render(
      <Button variant="outlined" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlinedInfo);
    expect(button).not.toHaveClass(classes.outlinedWarning);
    expect(button).not.toHaveClass(classes.outlinedError);
    expect(button).toHaveClass(classes.outlinedSuccess);
  });

  it('should render a error outlined button', () => {
    render(
      <Button variant="outlined" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.outlinedSecondary);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlinedSuccess);
    expect(button).not.toHaveClass(classes.outlinedInfo);
    expect(button).not.toHaveClass(classes.outlinedWarning);
    expect(button).toHaveClass(classes.outlinedError);
  });

  it('should render a info outlined button', () => {
    render(
      <Button variant="outlined" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.outlinedSecondary);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlinedSuccess);
    expect(button).not.toHaveClass(classes.outlinedWarning);
    expect(button).not.toHaveClass(classes.outlinedError);
    expect(button).toHaveClass(classes.outlinedInfo);
  });

  it('should render a warning outlined button', () => {
    render(
      <Button variant="outlined" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.outlinedSecondary);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).not.toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.outlinedSuccess);
    expect(button).not.toHaveClass(classes.outlinedInfo);
    expect(button).not.toHaveClass(classes.outlinedError);
    expect(button).toHaveClass(classes.outlinedWarning);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<Button variant="contained">Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textPrimary);
    expect(button).not.toHaveClass(classes.textSecondary);
    expect(button).toHaveClass(classes.contained);
  });

  it('should render a contained primary button', () => {
    const { getByRole } = render(
      <Button variant="contained" color="primary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).toHaveClass(classes.contained);
    expect(button).toHaveClass(classes.containedPrimary);
    expect(button).not.toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.containedSuccess);
    expect(button).not.toHaveClass(classes.containedError);
    expect(button).not.toHaveClass(classes.containedInfo);
    expect(button).not.toHaveClass(classes.containedWarning);
  });

  it('should render a contained secondary button', () => {
    const { getByRole } = render(
      <Button variant="contained" color="secondary">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.containedPrimary);
    expect(button).toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.containedSuccess);
    expect(button).not.toHaveClass(classes.containedError);
    expect(button).not.toHaveClass(classes.containedInfo);
    expect(button).not.toHaveClass(classes.containedWarning);
  });

  it('should render a contained success button', () => {
    render(
      <Button variant="contained" color="success">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.containedPrimary);
    expect(button).not.toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.containedError);
    expect(button).not.toHaveClass(classes.containedInfo);
    expect(button).not.toHaveClass(classes.containedWarning);
    expect(button).toHaveClass(classes.containedSuccess);
  });

  it('should render a contained error button', () => {
    render(
      <Button variant="contained" color="error">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.containedPrimary);
    expect(button).not.toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.containedInfo);
    expect(button).not.toHaveClass(classes.containedSuccess);
    expect(button).not.toHaveClass(classes.containedWarning);
    expect(button).toHaveClass(classes.containedError);
  });

  it('should render a contained info button', () => {
    render(
      <Button variant="contained" color="info">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.containedPrimary);
    expect(button).not.toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.containedSuccess);
    expect(button).not.toHaveClass(classes.containedError);
    expect(button).not.toHaveClass(classes.containedWarning);
    expect(button).toHaveClass(classes.containedInfo);
  });

  it('should render a contained warning button', () => {
    render(
      <Button variant="contained" color="warning">
        Hello World
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).not.toHaveClass(classes.text);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.containedPrimary);
    expect(button).not.toHaveClass(classes.containedSecondary);
    expect(button).not.toHaveClass(classes.containedSuccess);
    expect(button).not.toHaveClass(classes.containedError);
    expect(button).not.toHaveClass(classes.containedInfo);
    expect(button).toHaveClass(classes.containedWarning);
  });

  it('should render a small text button', () => {
    const { getByRole } = render(<Button size="small">Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.text);
    expect(button).toHaveClass(classes.textSizeSmall);
    expect(button).not.toHaveClass(classes.textSizeLarge);
    expect(button).not.toHaveClass(classes.outlinedSizeSmall);
    expect(button).not.toHaveClass(classes.outlinedSizeLarge);
    expect(button).not.toHaveClass(classes.containedSizeSmall);
    expect(button).not.toHaveClass(classes.containedSizeLarge);
  });

  it('should render a large text button', () => {
    const { getByRole } = render(<Button size="large">Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.text);
    expect(button).not.toHaveClass(classes.textSizeSmall);
    expect(button).toHaveClass(classes.textSizeLarge);
    expect(button).not.toHaveClass(classes.outlinedSizeSmall);
    expect(button).not.toHaveClass(classes.outlinedSizeLarge);
    expect(button).not.toHaveClass(classes.containedSizeSmall);
    expect(button).not.toHaveClass(classes.containedSizeLarge);
  });

  it('should render a small outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" size="small">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.textSizeSmall);
    expect(button).not.toHaveClass(classes.textSizeLarge);
    expect(button).toHaveClass(classes.outlinedSizeSmall);
    expect(button).not.toHaveClass(classes.outlinedSizeLarge);
    expect(button).not.toHaveClass(classes.containedSizeSmall);
    expect(button).not.toHaveClass(classes.containedSizeLarge);
  });

  it('should render a large outlined button', () => {
    const { getByRole } = render(
      <Button variant="outlined" size="large">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.outlined);
    expect(button).not.toHaveClass(classes.textSizeSmall);
    expect(button).not.toHaveClass(classes.textSizeLarge);
    expect(button).not.toHaveClass(classes.outlinedSizeSmall);
    expect(button).toHaveClass(classes.outlinedSizeLarge);
    expect(button).not.toHaveClass(classes.containedSizeSmall);
    expect(button).not.toHaveClass(classes.containedSizeLarge);
  });

  it('should render a small contained button', () => {
    const { getByRole } = render(
      <Button variant="contained" size="small">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.textSizeSmall);
    expect(button).not.toHaveClass(classes.textSizeLarge);
    expect(button).not.toHaveClass(classes.outlinedSizeSmall);
    expect(button).not.toHaveClass(classes.outlinedSizeLarge);
    expect(button).toHaveClass(classes.containedSizeSmall);
    expect(button).not.toHaveClass(classes.containedSizeLarge);
  });

  it('should render a large contained button', () => {
    const { getByRole } = render(
      <Button variant="contained" size="large">
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.contained);
    expect(button).not.toHaveClass(classes.textSizeSmall);
    expect(button).not.toHaveClass(classes.textSizeLarge);
    expect(button).not.toHaveClass(classes.outlinedSizeSmall);
    expect(button).not.toHaveClass(classes.outlinedSizeLarge);
    expect(button).not.toHaveClass(classes.containedSizeSmall);
    expect(button).toHaveClass(classes.containedSizeLarge);
  });

  it('should render a button with startIcon', () => {
    const { getByRole } = render(<Button startIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const startIcon = button.querySelector(`.${classes.startIcon}`);

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.text);
    expect(startIcon).not.toHaveClass(classes.endIcon);
  });

  it('should render a button with endIcon', () => {
    const { getByRole } = render(<Button endIcon={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const endIcon = button.querySelector(`.${classes.endIcon}`);

    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.text);
    expect(endIcon).not.toHaveClass(classes.startIcon);
  });

  it('should have a ripple by default', () => {
    const { getByRole } = render(
      <Button TouchRippleProps={{ className: 'touch-ripple' }}>Hello World</Button>,
    );
    const button = getByRole('button');

    expect(button.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', () => {
    const { getByRole } = render(
      <Button disableRipple TouchRippleProps={{ className: 'touch-ripple' }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    expect(button.querySelector('.touch-ripple')).to.equal(null);
  });

  it('can disable the elevation', () => {
    const { getByRole } = render(<Button disableElevation>Hello World</Button>);
    const button = getByRole('button');

    expect(button).toHaveClass(classes.disableElevation);
  });

  it('should have a focusRipple by default', () => {
    const { getByRole } = render(
      <Button TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}>
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    fireEvent.keyDown(document.body, { key: 'TAB' });
    act(() => {
      button.focus();
    });

    expect(button.querySelector('.pulsate-focus-visible')).not.to.equal(null);
  });

  it('can disable the focusRipple', () => {
    const { getByRole } = render(
      <Button
        disableFocusRipple
        TouchRippleProps={{ classes: { ripplePulsate: 'pulsate-focus-visible' } }}
      >
        Hello World
      </Button>,
    );
    const button = getByRole('button');

    act(() => {
      fireEvent.keyDown(document.body, { key: 'TAB' });
      button.focus();
    });

    expect(button.querySelector('.pulsate-focus-visible')).to.equal(null);
  });

  describe('server-side', () => {
    beforeAll(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        pending('Skip server-side tests in jsdom environment');
      }
    });

    it('should server-side render', () => {
      const { container } = renderToString(<Button>Hello World</Button>);
      expect(container.firstChild).toHaveTextContent('Hello World');
    });
  });

  it('should automatically change the button to an anchor element when href is provided', () => {
    const { container } = render(<Button href="https://google.com">Hello</Button>);
    const button = container.firstChild;

    expect(button).toHaveProperty('nodeName', 'A');
    expect(button).not.toHaveAttribute('role');
    expect(button).not.toHaveAttribute('type');
    expect(button).toHaveAttribute('href', 'https://google.com');
  });

  it('should forward classes to ButtonBase', () => {
    const disabledClassName = 'testDisabledClassName';
    const { container } = render(<Button disabled classes={{ disabled: disabledClassName }} />);

    expect(container.querySelector('button')).toHaveClass(disabledClassName);
  });

  it("should disable ripple when MuiButtonBase has disableRipple in theme's defaultProps", () => {
    const theme = createTheme({
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button>Disabled ripple</Button>
      </ThemeProvider>,
    );
    expect(container.firstChild.querySelector(`.${touchRippleClasses.root}`)).to.equal(null);
  });

  it("should disable ripple when MuiButtonBase has disableRipple in theme's defaultProps but override on the individual Buttons if provided", () => {
    const theme = createTheme({
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button disableRipple={false}>Enabled ripple</Button>
        <Button>Disabled ripple 1</Button>
        <Button>Disabled ripple 2</Button>
      </ThemeProvider>,
    );
    expect(container.querySelectorAll(`.${touchRippleClasses.root}`)).to.have.length(1);
  });

  describe('Emotion compatibility', () => {
    it('classes.root should overwrite builtin styles.', () => {
      // This is pink
      const color = 'rgb(255, 192, 204)';

      const { getByRole } = render(
        <ClassNames>
          {({ css }) => (
            <Button color="primary" classes={{ root: css({ color }) }}>
              This text should be pink
            </Button>
          )}
        </ClassNames>,
      );
      const button = getByRole('button');

      expect(getComputedStyle(button).color).to.equal(color);
    });

    it('className should overwrite classes.root and builtin styles.', () => {
      const colorPink = 'rgb(255, 192, 204)';
      const colorRed = 'rgb(255, 0, 0)';

      const { getByRole } = render(
        <ClassNames>
          {({ css }) => (
            <Button
              color="primary"
              className={css({ color: colorRed })}
              classes={{ root: css({ color: colorPink }) }}
            >
              This text should be red
            </Button>
          )}
        </ClassNames>,
      );
      const button = getByRole('button');

      expect(getComputedStyle(button).color).to.equal(colorRed);
    });

    it('classes.* should overwrite builtin styles.', () => {
      // This is pink
      const color = 'rgb(255, 192, 204)';

      const { getByRole } = render(
        <ClassNames>
          {({ css }) => (
            <Button color="primary" classes={{ text: css({ color }) }}>
              This text should be pink
            </Button>
          )}
        </ClassNames>,
      );
      const button = getByRole('button');

      expect(getComputedStyle(button).color).to.equal(color);
    });
  });
});
