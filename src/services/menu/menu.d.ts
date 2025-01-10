export type FoodItem = {
  id: number;
  category_id: number;
  food: string;
  ingredient: string;
  price: number;
  food_image: string;
  onAdd?: () => void;
  onRemove?: () => void;
  quantity?: number;
};

export type FoodCategory = {
  id: number;
  category: string;
  image: string;
  is_main: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  food: FoodItem[];
};
