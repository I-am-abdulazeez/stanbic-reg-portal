import { Input, InputProps } from '@nextui-org/react';
import { INPUT_STYLES } from 'src/data';

export default function CustomInput(props: InputProps) {
  return (
    <Input
      {...props}
      radius="sm"
      className="font-inter font-medium text-xl rounded-lg"
      classNames={{
        inputWrapper: INPUT_STYLES,
      }}
    />
  );
}
