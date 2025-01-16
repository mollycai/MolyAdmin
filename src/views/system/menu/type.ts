export type DialogStatus = 'Edit' | 'Create';

export type MenuTreeSelect = {
  id: number;
  label: string;
  children: MenuTreeSelect[];
};
