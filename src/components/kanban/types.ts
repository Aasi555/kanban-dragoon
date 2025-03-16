
export interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

export interface CardType {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
  actionNumber?: string;
  category?: string;
  approver?: string;
  reviewer?: string;
  status?: string;
  dueDate?: string;
  teamMembers?: TeamMember[];
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}
