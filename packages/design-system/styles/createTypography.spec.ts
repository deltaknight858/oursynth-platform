import { styled, createTheme } from '@mui/material/styles';

// Define expectType function for type checking
const expectType = <T>(value: T): T => value;

describe('createTypography type checking', () => {
  test('typography variants can be unset', () => {
    // properties of the variants can be "unset"
    const theme = createTheme({
      typography: {
        allVariants: {
          fontStyle: undefined,
        },
      },
    });

    const maybeFontStyle = theme.typography.body1.fontStyle;
    expectType<
      | '-moz-initial'
      | 'inherit'
      | 'initial'
      | 'revert'
      | 'revert-layer'
      | 'unset'
      | 'italic'
      | 'normal'
      | 'oblique'
      | (string & {})
      | undefined,
      typeof maybeFontStyle
    >(maybeFontStyle);
    
    expect(theme.typography.allVariants.fontStyle).toBeUndefined();
  });

  test('styled components can use typography', () => {
    const StyledComponents = styled('span')(({ theme }) => ({
      ...theme.typography.body1,
    }));
    
    expect(StyledComponents).toBeDefined();
  });
});
