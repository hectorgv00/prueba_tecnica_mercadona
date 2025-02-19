export interface iButtonOptions {
  text: string;
  onClick: Function;
  class: 'primary' | 'secondary' | 'tertiary' | 'no-background';
  disabled: boolean;
  icon?: string;
}
