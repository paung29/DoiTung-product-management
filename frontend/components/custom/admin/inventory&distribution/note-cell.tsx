export default function NoteCell({ note }: { note: string }) {
  const MAX_LENGTH = 20;
  const isTruncated = note.length > MAX_LENGTH;

  return (
    <span
      className="cursor-help text-sm text-gray-700"
      title={isTruncated ? note : undefined}
    >
      {isTruncated ? `${note.substring(0, MAX_LENGTH)}...` : note}
    </span>
  );
}