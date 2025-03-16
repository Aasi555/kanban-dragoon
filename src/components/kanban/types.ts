
export interface CardType {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}
