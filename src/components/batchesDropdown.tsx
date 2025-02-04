import DropdownMenu from '@/components/dropdown';
import { DropdownOption } from '@/types/types';

export default function BatchesDropdown({
  rowNO,
  onChange,
  title,
}: {
  rowNO: number;
  onChange: (item: DropdownOption) => void;
  title: string;
}) {
  const Batches: DropdownOption[] = [
    { id: 1, option: `${rowNO}기` },
    { id: 2, option: `${rowNO + 1}기` },
    { id: 3, option: `${rowNO + 2}기` },
  ];

  return <DropdownMenu data={Batches} onChange={onChange} title={title} />;
}
