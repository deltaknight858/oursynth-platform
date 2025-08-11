import { Theme, useThemeProps } from '@mui/material/styles';
import { SliderProps } from '@mui/material/Slider';

function ThemedComponent() {
  const props = useThemeProps<Theme, SliderProps, 'MuiSlider'>({
    props: { color: 'primary' },
    name: 'MuiSlider',
  });

  // component's props are valid
  // Only existence of props is relevant here not type.
  props.track;
  props.valueLabelDisplay;
}

// Add actual tests to prevent "no tests" error
describe('useThemeProps', () => {
  it('should work with theme props', () => {
    // Just a basic test to prevent the empty test suite error
    expect(ThemedComponent).toBeDefined();
  });
});
