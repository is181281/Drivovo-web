export const ItemTypes = {
  car: "car",
  question: "question",
};

export interface DragItem {
  priority: number;
  id: string;
  type: string;
}
