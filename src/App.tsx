import { useEffect, useState } from 'react';

import {
  Button,
  DateInput,
  Divider,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { Controller, useForm } from 'react-hook-form';

import useStore from 'src/store';
import { INPUT_STYLES, DEFAULT_FORM_VALUES, ABROAD_DATA } from 'src/data';
import { parseCalendarDateToISO } from 'src/helpers';

import stanbic from 'src/assets/stanbic-logo.svg';

import { useCustomer, useEmployerList } from 'src/hooks/query/useCustomers';
import { useCustStates } from './hooks/query/useLocation';
import {
  useCreateCustMutation,
  useActiveCustMutation,
} from 'src/hooks/mutation/useCustMutations';

import { RegFormType } from 'src/types';

function App() {
  const [existing, setExisting] = useState(false);

  const { data } = useCustomer();
  const { data: states } = useCustStates();
  const custMutation = useCreateCustMutation();
  const existingCustMutation = useActiveCustMutation();

  const { register, formState, handleSubmit, control } = useForm<RegFormType>();

  const { currentUser, setStepFormData } = useStore();
  const { data: employerData, isPending } = useEmployerList();

  function onSubmit(data: RegFormType) {
    if (!existing) {
      const { dateOfBirth } = data;
      const formattedDate = parseCalendarDateToISO(dateOfBirth);

      const newData = {
        ...DEFAULT_FORM_VALUES,
        ...ABROAD_DATA,
        dateOfBirth: formattedDate,
        firstName: data?.firstName,
        surname: data?.surname,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        residenceState: data?.residenceState,
      };
      custMutation.mutate(newData);
      setStepFormData(newData);
    } else {
      existingCustMutation.mutate(data);
    }
  }

  useEffect(() => {
    console.log(data);
    console.log(isPending);
    console.log(employerData);
  }, [data, currentUser, employerData, isPending]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen">
        <div className="flex-1 auth-image sm:flex hidden">
          <div className="flex w-full h-full flex-col justify-between p-10">
            <img src={stanbic} alt="Stanbic_ibtc_logo" className="w-72" />
            <div>
              <h2 className="text-3xl font-playfair font-bold text-white">
                No uncertainties here,
              </h2>
              <h2 className="text-3xl font-playfair font-bold text-white">
                move to extraordinary!
              </h2>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#f7f7f7] bg-opacity-0 py-10 px-7 my-auto">
          <div className="p-5 bg-stanbic rounded-xl flex justify-center mb-6 sm:hidden">
            <img src={stanbic} alt="Stanbic_ibtc_logo" className="w-72 " />
          </div>
          <div className="mx-auto max-w-[400px]">
            <div className="mb-10">
              <h1 className="text-4xl font-playfair font-extrabold">
                You deserve to
              </h1>

              <h1 className="text-4xl font-playfair font-extrabold mt-2 text-stanbic">
                Retire Well...
              </h1>
            </div>

            {/* begin Forms, This will be dynamic */}
            <div className="flex flex-col gap-y-5">
              {!existing && (
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Enter your first name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('firstName')}
                />
              )}
              {!existing && (
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Enter your last name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('surname')}
                />
              )}
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                isRequired
                radius="sm"
                className="font-inter font-medium text-xl"
                classNames={{
                  inputWrapper: INPUT_STYLES,
                }}
                {...register('email')}
              />
              <Input
                type="text"
                label="Phone Number"
                placeholder="Enter your 11 digit phone number"
                isRequired
                radius="sm"
                className="font-inter font-medium text-xl"
                classNames={{
                  inputWrapper: INPUT_STYLES,
                }}
                {...register('phoneNumber', {
                  maxLength: 11,
                })}
              />
              {!existing && (
                <Controller
                  control={control}
                  name="dateOfBirth"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <DateInput
                        label={'Date of Birth'}
                        isRequired
                        isInvalid={Boolean(formState.errors.dateOfBirth)}
                        radius="sm"
                        onChange={onChange}
                        value={value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {formState.errors.dateOfBirth && (
                        <p className="text-danger text-xs font-inter">
                          Please fill out this field.
                        </p>
                      )}
                    </div>
                  )}
                />
              )}
              {!existing && (
                <Controller
                  control={control}
                  name="residenceState"
                  render={({ field }) => (
                    <Select
                      items={states || []}
                      label="State of Residence"
                      placeholder="-Select State-"
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(data) => (
                        <SelectItem
                          key={data?.code}
                          value={data?.code}
                          classNames={{ title: ['font-inter'] }}
                        >
                          {data.name}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
              )}

              <div className="flex justify-end">
                {existing ? (
                  <Button
                    color="primary"
                    className="font-semibold font-inter"
                    radius="sm"
                    type="submit"
                    isLoading={existingCustMutation.isPending}
                  >
                    {existingCustMutation.isPending ? 'Loading' : 'Continue'}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="font-semibold font-inter"
                    radius="sm"
                    type="submit"
                    isLoading={custMutation.isPending}
                  >
                    {custMutation.isPending ? 'Loading' : 'Get Started'}
                  </Button>
                )}
              </div>

              <div className="text-center">
                <p className="font-inter font-semibold">
                  {existing ? 'New?' : 'Already Started?'}{' '}
                  <span
                    className="text-stanbic  hover:underline hover:cursor-pointer"
                    onClick={() => {
                      setExisting((prevState) => !prevState);
                    }}
                  >
                    {existing ? 'Signup Here' : 'Continue Here'}
                  </span>
                </p>
                <Divider className={'my-3 max-w-sm h-[0.4px] mx-auto'} />
                <p className="font-inter font-medium">
                  Need help?{' '}
                  <span className="text-stanbic hover:underline hover:cursor-pointer">
                    Contact us
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;
