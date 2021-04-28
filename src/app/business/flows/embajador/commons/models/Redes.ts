export interface Red_Type {
  id: number;
  name: string;
}

export interface Red_Category {
  id: number;
  id_red_type: number,
  name: string;
}

export interface Red_SubCategory {
  id: number;
  id_red_category: number,
  name: string;
}