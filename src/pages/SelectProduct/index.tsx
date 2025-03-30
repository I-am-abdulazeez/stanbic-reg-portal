import { useEffect } from 'react';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Radio,
  RadioGroup,
  useDisclosure,
} from '@nextui-org/react';

import { Controller, useForm } from 'react-hook-form';

import INavbar from 'src/components/INavbar';
import IFooter from 'src/components/IFooter';
import CustomRadio from 'src/components/CustomRadio';

import useStore from 'src/store';
import { ABROAD_DATA, DEFAULT_FORM_VALUES, STATUSES } from 'src/data';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, formStepData } from 'src/types';

type SectorClassType = Pick<RegFormType, 'sectorClass'> & { rsaOption: string };

export default function SelectProduct() {
  const { stepFormData, currentUser } = useStore();

  const {
    isOpen: RSAisOpen,
    onOpen: RSAonOpen,
    onOpenChange: rsaonOpenChange,
  } = useDisclosure();
  const {
    isOpen: MPisOpen,
    onOpen: MpnOpen,
    onOpenChange: mponOpenChange,
  } = useDisclosure();

  const email = currentUser?.email;
  const phoneNumber = currentUser?.phoneNumber;

  const form = useForm<SectorClassType>();

  const rsaOption = form.watch('rsaOption');

  const { data: userData } = useCustomerByDetails(email, phoneNumber);

  const updateCustMutation = useUpdateCustMutation<formStepData>('/step-two');

  function onSubmit(data: SectorClassType) {
    const dateOfBirth = stepFormData?.dateOfBirth;

    const newData: formStepData = {
      ...DEFAULT_FORM_VALUES,
      ...stepFormData,
      ...STATUSES,
      ...ABROAD_DATA,
      dateOfBirth,
      email,
      phoneNumber,
      sectorClass: data.sectorClass,
    };
    updateCustMutation.mutate(newData);
  }

  useEffect(() => {
    console.log(currentUser);
  }, [userData, form.formState.isDirty, form.formState.isValid, currentUser]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Welcome</h2>
          <p className="my-4">Select the desired Product</p>

          <Progress aria-label="Loading..." value={20} className="my-10" />

          <Controller
            control={form.control}
            name="sectorClass"
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup
                label="Choose Product Type"
                color="primary"
                orientation="horizontal"
                className="gap-8"
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(e);
                  if (value !== 'RSA') {
                    form.setValue('rsaOption', '');
                  }
                  form.setValue('rsaOption', value);
                }}
                onBlur={field.onBlur}
                classNames={{
                  label: ['text-xl'],
                }}
              >
                <CustomRadio
                  value="RSA"
                  onClick={RSAonOpen}
                  description="Retirement Savings Account"
                >
                  RSA
                </CustomRadio>
                <CustomRadio
                  onClick={MpnOpen}
                  value="MP"
                  description="Micro Pension Account"
                >
                  MPP
                </CustomRadio>
              </RadioGroup>
            )}
          />

          {rsaOption === 'RSA' && (
            <Controller
              control={form.control}
              name="sectorClass"
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  label="RSA Options"
                  orientation="horizontal"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="mt-7"
                  classNames={{ wrapper: ['flex gap-8 '], label: ['mb-7'] }}
                >
                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="BU"
                    description="Select Business Names"
                  >
                    Business Name
                  </Radio>
                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="BR"
                    description="Select Cross Border"
                  >
                    Cross Border
                  </Radio>

                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="FR"
                    description="Select Foreign agencies"
                  >
                    Foreign agencies
                  </Radio>
                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="NG"
                    description="Select Non-government organisation"
                  >
                    Non-government organisation
                  </Radio>
                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="PR"
                    description="Select Private"
                  >
                    Private
                  </Radio>
                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="PU"
                    description="Select Public"
                  >
                    Public
                  </Radio>
                  <Radio
                    classNames={{ base: ['gap-3 p-5'] }}
                    value="UN"
                    description="Select Union"
                  >
                    Union
                  </Radio>
                </RadioGroup>
              )}
            />
          )}

          <Divider className="my-10 mx-auto" />

          <Modal
            isOpen={RSAisOpen}
            onOpenChange={rsaonOpenChange}
            className="font-inter"
            size="2xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-primary">
                    Retirement Savings Account (RSA)
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Retirement Savings Account (RSA) is an account opened with
                      a Pension Fund Administrator. It is applicable to
                      individual employees who are in active employment.
                    </p>
                    <p>
                      Employees who are 18 years and above are eligible to open
                      a Retirement Savings Account with a minimum contribution
                      of eighteen percent (18%). The 18% contribution consists
                      of the employer contribution of 10% and employee
                      contributing 8% of total emolument.
                    </p>
                    <p>
                      The RSA is unique to each employee and is not dependent on
                      an employer, i.e. if an RSA holder changes jobs, he/she
                      maintains the same Retirement Savings Account with
                      the new employer.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onPress={onClose}
                      className="font-inter"
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal
            isOpen={MPisOpen}
            onOpenChange={mponOpenChange}
            className="font-inter"
            size="2xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-primary">
                    Micro Pension Scheme (MPS)
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      The Micro Pension Scheme (MPS) is designed to help
                      traders, artisans, professionals and other self employed
                      people who do not qualify for the Contributory pension
                      scheme (CPS), save conveniently for retirement.
                    </p>
                    <p>
                      Micro Pension helps low, middle- and high-income earners
                      in the informal sector save easily by providing a regular
                      flow of income in retirement.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onPress={onClose}
                      className="font-inter"
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <div className="flex justify-end gap-3">
            <Button
              radius="lg"
              type="submit"
              color="primary"
              className="font-inter font-semibold bg-black"
              isDisabled={!form.formState.isValid || !form.formState.isDirty}
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
