export interface Timestamp {
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface BaseEntity extends Timestamp {
  id: string;
  isDeleted: boolean;
}
