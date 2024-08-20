export default function Title({
  title,
  required,
}: {
  title: string;
  required: boolean;
}) {
  return (
    <div className="flex gap-1">
      <h1 className="text-2-700">{title}</h1>
      <span className="text-2-700 text-blue-1">{`${required ? '*' : ''}`}</span>
    </div>
  );
}
