export default interface TransactionItemProps {
  id : number;
  amount: number;
  category: string;
  description: string;
  timestamp: string;
  onDelete: (id: number) => void;
  }