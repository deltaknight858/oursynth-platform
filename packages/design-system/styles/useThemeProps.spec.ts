import * as React from 'react';
import { Theme, useThemeProps, ThemeProvider, createTheme } from '@mui/material/styles';
import { SliderProps } from '@mui/material/Slider';
import { render } from '@testing-library/react';

describe('useThemeProps type checking', () => {
  test('ThemedComponent can use useThemeProps', () => {
    const theme = createTheme();
    let capturedProps: any;
    
    function ThemedComponent() {
      const props = useThemeProps<Theme, SliderProps, 'MuiSlider'>({
        props: { color: 'primary' },
        name: 'MuiSlider',
      });

      // component's props are valid
      // Only existence of props is relevant here not type.
      capturedProps = props;
      props.track;
      props.valueLabelDisplay;
      
      return React.createElement('div', null, props.color);
    }
    
    render(
      React.createElement(ThemeProvider, { theme }, 
        React.createElement(ThemedComponent)
      )
    );
    
    expect(capturedProps.color).toBe('primary');
  });
});
