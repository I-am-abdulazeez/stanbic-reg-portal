// import React, { useState, useEffect } from 'react';
// import { useAsync } from 'react-select/async';
// import { Autocomplete, AutocompleteItem, cn } from '@nextui-org/react';
// import { useController, useFormContext } from 'react-hook-form';
// import { EmployerType } from 'src/types';

// interface NextUISelectProps {
//   control: any; // Replace with appropriate type from react-hook-form
//   name: string;
//   label: string;
//   options: EmployerType[];
//   isLoading: boolean;
//   onChange: (value: string | null) => void;
// }

// const useStyles = (): Record<string, string> => ({
//   // Define custom CSS classes here to match NextUI styles
//   container: '',
//   control: '',
//   menu: '',
//   option: '',
//   placeholder: '',
// });

// const NextUISelect: React.FC<NextUISelectProps> = ({
//   control,
//   name,
//   label,
//   options,
//   isLoading,
//   onChange,
// }) => {
//   const { field } = useController({ name, control });
//   const classes = useStyles();

//   const { value, setValue, ...selectProps } = useAsync<EmployerType, boolean, EmployerType[], unknown>({
//     cacheOptions: true, // Improve performance for large datasets
//     loadOptions: (inputValue: string) => {
//         // Implement search logic with debounce
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(
//                     options.filter((item) =>
//                         item.name.toLowerCase().includes(inputValue.toLowerCase())
//                     )
//                 );
//             }, 300);
//         });
//     },
//     getOptionLabel: (option: EmployerType) => option.name,
//     getOptionValue: (option: EmployerType) => option.pencomCodeID,
// });

//   useEffect(() => {
//     setValue(field.value); // Sync form value with select value
//   }, [field.value, setValue]);

//   return (
//     <Autocomplete
//       items={options}
//       label={label}
//       isLoading={isLoading}
//       radius="sm"
//       className="font-inter font-medium text-xl"
//       classNames={{
//         listbox: [classes.menu],
//       }}
//       inputValue={value}
//       selectedKey={field.value}
//       onInputChange={(val) => setValue(val)} // Update form value on input change
//       onSelectionChange={field.onChange}
//       onBlur={field.onBlur}
//     >
//       {(data) => (
//         <AutocompleteItem
//           key={data.pencomCodeID}
//           value={data.name}
//           classNames={{ title: [classes.option] }}
//         >
//           {data.name}
//         </AutocompleteItem>
//       )}
//     </Autocomplete>
//   );
// };

// export default NextUISelect;
