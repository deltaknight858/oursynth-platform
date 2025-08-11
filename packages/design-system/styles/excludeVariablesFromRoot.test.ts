
import excludeVariablesFromRoot from './excludeVariablesFromRoot';

describe('excludeVariablesFromRoot', () => {
  it('should return true', () => {
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-1`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-2`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-3`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-4`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-5`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-6`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-7`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-8`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-9`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-10`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-11`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-12`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-13`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-14`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-15`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-16`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-17`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-18`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-19`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-20`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-21`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-22`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-23`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-24`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-palette-AppBar-darkBg`)).toBe(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-palette-AppBar-darkColor`)).toBe(
      true,
    );
  });

  it('should return true for custom prefix', () => {
    expect(excludeVariablesFromRoot('').includes(`--overlays-1`)).toBe(true);
    expect(excludeVariablesFromRoot('').includes(`--palette-AppBar-darkBg`)).toBe(true);
    expect(excludeVariablesFromRoot('').includes(`--palette-AppBar-darkColor`)).toBe(true);
  });
});
