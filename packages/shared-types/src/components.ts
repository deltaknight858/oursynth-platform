import React from 'react';

// Component-related types
export interface ComponentStyle {
  width?: number | string;
  height?: number | string;
  color?: string;
  backgroundColor?: string;
  padding?: string | number;
  margin?: string | number;
  border?: string;
  borderRadius?: string | number;
  [key: string]: unknown;
}

export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  displayName?: string;
  icon: React.ComponentType | string; // React component or string emoji/icon
  color: string;
  category: string;
  description?: string;
  keywords?: string[];
  defaultProps: Record<string, unknown>;
  width?: number;
  height?: number;
  style?: ComponentStyle;
  configSchema?: Record<string, unknown>; // JSON Schema for props validation
}

export interface DraggableComponentProps {
  component: ComponentDefinition;
  categoryColor: string;
  isFavorite?: boolean;
  onToggleFavorite?: (componentType: string) => void;
  onAddComponent?: (component: ComponentDefinition) => void;
}

export interface ComponentInstance extends ComponentDefinition {
  instanceId: string;
  props: Record<string, unknown>;
  children?: ComponentInstance[];
}

export interface ComponentCategory {
  name: string;
  color: string;
  icon: React.ComponentType | string;
  description?: string;
}

// Drag and drop related types
export interface DropItem {
  type: string;
  id?: string;
  component?: ComponentDefinition;
  // Include common properties that are used during drop
  color?: string;
  defaultProps?: Record<string, unknown>;
}

export interface DropOffset {
  x: number;
  y: number;
}

export interface DropHandler {
  (item: DropItem, offset: DropOffset): void;
}

// Property editor types
export interface PropertyValue {
  value: unknown;
  onChange: (value: unknown) => void;
}

export interface PropertyChangeHandler {
  (key: string, value: unknown): void;
}