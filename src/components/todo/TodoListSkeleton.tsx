import { Skeleton } from "../ui/skeleton";

export const TodoListSkeleton = () => {
  return (
    <div className="space-y-4 mt-8">
      {[1, 2, 3].map((item) => (
        <Skeleton key={item} className="h-16 w-full" />
      ))}
    </div>
  );
};
