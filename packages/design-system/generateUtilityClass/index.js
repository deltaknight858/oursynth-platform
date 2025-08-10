/**
 * Simple utility class generator for Material-UI compatibility
 * This is a minimal implementation for testing purposes
 */
export default function generateUtilityClass(componentName, slot, globalStatePrefix = 'Mui') {
  return `${globalStatePrefix}${componentName}-${slot}`;
}

// CommonJS compatibility
module.exports = generateUtilityClass;
module.exports.default = generateUtilityClass;