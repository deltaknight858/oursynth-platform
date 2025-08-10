import { Theme, useThemeProps } from '@mui/material/styles';
import { SliderProps } from '@mui/material/Slider';

describe('useThemeProps type checking', () => {
  test('ThemedComponent can use useThemeProps', () => {
    function ThemedComponent() {
      const props = useThemeProps<Theme, SliderProps, 'MuiSlider'>({
        props: { color: 'primary' },
        name: 'MuiSlider',
      });

      // component's props are valid
      // Only existence of props is relevant here not type.
      props.track;
      props.valueLabelDisplay;
      
      return props.color;
    }
    
    expect(ThemedComponent()).toBe('primary');
  });
});
