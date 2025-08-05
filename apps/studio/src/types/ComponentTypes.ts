export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  icon: any;
  color: string;
  category: string;
  description?: string;
  defaultProps: Record<string, any>;
  width?: number;
  height?: number;
}

export interface DraggableComponentProps {
  component: ComponentDefinition;
  categoryColor: string;
  isFavorite?: boolean;
  onToggleFavorite?: (componentType: string) => void;
  onAddComponent?: (component: ComponentDefinition) => void;
}
