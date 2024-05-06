import { useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  DateInput,
  Divider,
  Input,
  Progress,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import INavbar from 'src/components/INavbar';
import IFooter from 'src/components/IFooter';

import useStore from 'src/store';
import { ABROAD_DATA, INPUT_STYLES, NEW_VALUES, STATUSES } from 'src/data';
import { DateToString } from 'src/helpers';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, StepThreeData, formStepData } from 'src/types';

export default function EmploymentRecord() {
  const navigate = useNavigate();

  const { currentUser, stepFormData, setStepFormData } = useStore();
  const updateCustomerMutation =
    useUpdateCustMutation<formStepData>('/step-four');

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegFormType>();

  function onSubmit(data: StepThreeData) {
    const { dateOfFirstAppointment, dateOfCurrentEmployment } = data;

    const formattedDateA = DateToString(dateOfFirstAppointment);
    const formattedDateB = DateToString(dateOfCurrentEmployment);

    const newData: formStepData = {
      ...NEW_VALUES,
      ...stepFormData,
      employerName: data.employerName,
      employerBuildingNameOrNumber: data.employerBuildingNameOrNumber,
      employerCountry: data.employerCountry,
      employerLocalGovernment: data.employerLocalGovernment,
      employerPOBox: data.employerPOBox,
      employerPhoneNumber: data.employerPhoneNumber,
      employerState: data.employerState,
      employerStreetName: data.employerStreetName,
      employerTownCity: data.employerTownCity,
      employerZipCode: data.employerZipCode,
      ...STATUSES,
      ...ABROAD_DATA,
      dateOfFirstAppointment: formattedDateA,
      dateOfCurrentEmployment: formattedDateB,
    };
    console.log(newData);
    setStepFormData(newData);
    updateCustomerMutation.mutate(newData);
  }

  useEffect(() => {
    if (currentUser.email !== '') {
      reset(
        {
          employerName: userData?.temporaryCustomer.employerName || '',
          employerPhoneNumber:
            userData?.temporaryCustomer.employerPhoneNumber || '',
          employerStreetName:
            userData?.temporaryCustomer.employerStreetName || '',
          employerTownCity: userData?.temporaryCustomer.employerTownCity || '',
          employerZipCode: userData?.temporaryCustomer.employerZipCode || '',
          employerState: userData?.temporaryCustomer.employerState || '',
          employerPOBox: userData?.temporaryCustomer.employerPOBox || '',
          employerCountry: userData?.temporaryCustomer.employerCountry || '',
          employerLocalGovernment:
            userData?.temporaryCustomer.employerLocalGovernment || '',
          designation: userData?.temporaryCustomer.designation || '',
          staffFileNo: userData?.temporaryCustomer.staffFileNo || '',
          currentGradeLevel:
            userData?.temporaryCustomer.currentGradeLevel || '',
          currentStep: userData?.temporaryCustomer.currentStep || '',
        },
        { keepDirtyValues: true, keepValues: true }
      );
      console.log(userData?.temporaryCustomer?.employerName);
      // console.log(stepOneData);
    }
    console.log(currentUser);
  }, [userData, currentUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Employment Record</h2>
          <p className="my-4">
            Expand each section and complete your employment details
          </p>

          <Progress aria-label="Loading..." value={60} className="mt-10 mb-7" />

          {/* <Divider className="my-10 mx-auto" /> */}

          <Accordion defaultExpandedKeys={['2']}>
            <AccordionItem
              key={'1'}
              aria-label="first-accordion"
              title="Employer Data"
              subtitle={
                <span>
                  Expand each section and complete your employer details
                </span>
              }
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="grid grid-cols-4 gap-5">
                <Select
                  label="Employer Industry"
                  placeholder="-Select employer industry-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: ['border-1 border-solid border-grey-900'],
                  }}
                  {...register('employerName')}
                >
                  <SelectItem
                    key={'TECH'}
                    value={'TECH'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    TECH
                  </SelectItem>
                </Select>

                <Input
                  type="text"
                  label="Employer Phone Number"
                  placeholder="Enter your employer phone number"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('employerPhoneNumber')}
                />

                <Input
                  type="text"
                  label="Employer Building Number/Name"
                  placeholder="Enter your employer building number/name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('employerBuildingNameOrNumber')}
                />

                <Input
                  type="text"
                  label="Employer Street name"
                  placeholder="Enter your employer street name "
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('employerStreetName')}
                />

                <Input
                  type="text"
                  label="Employer Village/Town/City "
                  placeholder="Enter your employer village/town/city"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('employerTownCity')}
                />

                <Input
                  type="text"
                  label="Employer Postal/Zip Code"
                  placeholder="Enter your employer postal/zip code"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('employerZipCode')}
                />

                <Input
                  type="text"
                  label="Employer P.O Box/P.M.B"
                  placeholder="Enter your employer postal/zip code"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('employerPOBox')}
                />

                <Select
                  label="Employer Country"
                  placeholder="-Select Country-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('employerCountry')}
                >
                  <SelectItem
                    key={'Nigeria'}
                    value={'Nigeria'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Nigeria
                  </SelectItem>
                </Select>

                <Select
                  label="Employer State"
                  placeholder="-Select State-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('employerState')}
                >
                  <SelectItem
                    key={'Lagos'}
                    value={'Lagos'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Lagos
                  </SelectItem>
                </Select>

                <Select
                  label="Employer Local Governement"
                  placeholder="-Select Local Govt-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('employerLocalGovernment')}
                >
                  <SelectItem
                    key={'Mushin'}
                    value={'Mushin'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Mushin
                  </SelectItem>
                </Select>

                <Input
                  type="text"
                  label="Designation/Rank"
                  placeholder="Enter your designation"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('designation')}
                />
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion>
            <AccordionItem
              key={'2'}
              aria-label="second-accordion"
              subtitle={
                <span>
                  Expand each section and compelete your employee details
                </span>
              }
              title="Employee Data"
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="grid grid-cols-3 gap-5">
                <Input
                  type="text"
                  label="Staff ID"
                  placeholder="Enter your staff ID"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('staffFileNo')}
                />
                {/* <DateInput
                  label={'Date of First Employment'}
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                /> */}
                <Controller
                  control={control}
                  name="dateOfFirstAppointment"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <DateInput
                        label={'Date of First Employement'}
                        isRequired
                        isInvalid={Boolean(errors.dateOfFirstAppointment)}
                        radius="sm"
                        onChange={onChange}
                        value={value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {errors.dateOfFirstAppointment && (
                        <p className="text-danger text-xs font-inter">
                          Please fill out this field.
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="dateOfCurrentEmployment"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <DateInput
                        label={'Date of Current Employment'}
                        isRequired
                        isInvalid={Boolean(errors.dateOfCurrentEmployment)}
                        radius="sm"
                        onChange={onChange}
                        value={value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {errors.dateOfCurrentEmployment && (
                        <p className="text-danger text-xs font-inter">
                          Please fill out this field.
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* <DateInput
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                /> */}
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion>
            <AccordionItem
              key={'3'}
              aria-label="third-accordion"
              subtitle={
                <span>
                  Expand each section and compelete your salary details
                </span>
              }
              title="Salary Structure"
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="grid grid-cols-4 gap-5">
                <Input
                  type="text"
                  label="Current GL"
                  placeholder="Enter your current gl"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('currentGradeLevel')}
                />

                <Input
                  type="text"
                  label="Current Step"
                  placeholder="Enter your current step"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('currentStep')}
                />
              </div>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-3 justify-between mt-6">
            <Button
              color="default"
              radius="lg"
              className="font-inter font-semibold"
              onClick={() =>
                navigate({
                  pathname: '/step-two',
                })
              }
            >
              Go back
            </Button>
            <div className="flex gap-4 justify-end ">
              {/* <Button
                color="primary"
                radius="lg"
                className="font-inter font-semibold"
              >
                Save
              </Button> */}
              <Button
                radius="lg"
                type="submit"
                isLoading={updateCustomerMutation.isPending}
                color="primary"
                className="font-inter font-semibold bg-black"
              >
                {updateCustomerMutation.isPending ? 'Loading' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <IFooter />
    </form>
  );
}
