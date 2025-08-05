'use client';

import { IconType } from 'react-icons';

export interface ComponentDefinition {
  id: string;
  type: string;
  name: string;
  displayName: string;
  icon: IconType;
  color: string;
  category: string;
  description: string;
  keywords: string[];
  defaultProps: any;
}
