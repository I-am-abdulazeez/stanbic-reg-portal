import { useEffect } from 'react';
import { Button, Divider, Progress, RadioGroup } from '@nextui-org/react';

import { Controller, useForm } from 'react-hook-form';

import INavbar from 'src/components/INavbar';
import IFooter from 'src/components/IFooter';
import CustomRadio from 'src/components/CustomRadio';

import useStore from 'src/store';
import { ABROAD_DATA, DEFAULT_FORM_VALUES, STATUSES } from 'src/data';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, formStepData } from 'src/types';

type SectorClassType = Pick<RegFormType, 'sectorClass'>;

export default function SelectProduct() {
  const { stepFormData, currentUser } = useStore();

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<SectorClassType>();

  const { data } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );

  const updateCustMutation = useUpdateCustMutation<formStepData>('/step-two');

  function onSubmit(data: SectorClassType) {
    console.log(data);
    const newData = {
      ...stepFormData,
      ...DEFAULT_FORM_VALUES,
      ...STATUSES,
      ...ABROAD_DATA,
      sectorClass: data.sectorClass,
    };
    console.log(newData);

    updateCustMutation.mutate(newData);
  }

  useEffect(() => {
    console.log(data);
    console.log(currentUser);
  }, [data, isDirty, isValid, currentUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Welcome</h2>
          <p className="my-4">Select the desired Product</p>

          <Progress aria-label="Loading..." value={20} className="my-10" />

          <Controller
            control={control}
            name="sectorClass"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                label="Choose Product Type"
                color="primary"
                orientation="horizontal"
                className="gap-8"
                value={value}
                onChange={onChange}
                classNames={{
                  label: ['text-xl'],
                }}
                name="sectorClass"
              >
                <CustomRadio
                  value="RSA"
                  description="Retirement Savings Account"
                >
                  RSA
                </CustomRadio>
                <CustomRadio value="MP" description="Micro Pension Account">
                  MP
                </CustomRadio>
              </RadioGroup>
            )}
          />

          <Divider className="my-10 mx-auto" />

          <div className="flex justify-end gap-3">
            <Button
              radius="lg"
              type="submit"
              color="primary"
              className="font-inter font-semibold bg-black"
              isDisabled={!isValid || !isDirty}
              isLoading={updateCustMutation.isPending}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <IFooter />
    </form>
  );
}
