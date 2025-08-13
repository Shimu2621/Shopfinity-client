export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  parentId?: string | null;
  children?: Category[];
  parent?: Category | null;
}
