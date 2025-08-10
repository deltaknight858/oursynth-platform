import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

describe('experimental_extendTheme type checking', () => {
  test('theme getCssVar function works', () => {
    const theme = extendTheme();

    expect(theme.getCssVar('palette-primary-main')).toBeDefined();
    expect(theme.getCssVar('palette-Alert-errorColor')).toBeDefined();
    expect(theme.getCssVar('opacity-inputPlaceholder')).toBeDefined();
    expect(theme.getCssVar('zIndex-appBar')).toBeDefined();
    expect(theme.getCssVar('shape-borderRadius')).toBeDefined();
    expect(theme.getCssVar('shadows-0')).toBeDefined();
    expect(theme.getCssVar('overlays-0')).toBeDefined();
  });
});
