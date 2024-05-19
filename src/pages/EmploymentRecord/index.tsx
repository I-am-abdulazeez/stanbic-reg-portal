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
import { Controller, useForm, useWatch } from 'react-hook-form';

import INavbar from 'src/components/INavbar';
import IFooter from 'src/components/IFooter';

import useStore from 'src/store';
import { ABROAD_DATA, INPUT_STYLES, NEW_VALUES, STATUSES } from 'src/data';
import { parseCalendarDateToISO, parseISOToCalendarDate } from 'src/helpers';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, StepThreeData, formStepData } from 'src/types';
import {
  useCustCountries,
  useCustLocalGovt,
  useCustStates,
} from 'src/hooks/query/useLocation';

export default function EmploymentRecord() {
  const form = useForm<RegFormType>();

  const navigate = useNavigate();
  const { currentUser, stepFormData } = useStore();

  const updateCustMutation = useUpdateCustMutation<formStepData>('/step-four');

  const { employerCountry, employerState } = useWatch({
    control: form.control,
  });

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );
  const { data: countries } = useCustCountries();
  const { data: states } = useCustStates();
  const { data: localGovt } = useCustLocalGovt(employerState);

  function onSubmit(data: StepThreeData) {
    const { dateOfFirstAppointment, dateOfCurrentEmployment } = data;

    const formattedDateA = parseCalendarDateToISO(dateOfFirstAppointment);
    const formattedDateB = parseCalendarDateToISO(dateOfCurrentEmployment);

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
      staffFileNo: data.staffFileNo,
      currentGradeLevel: data?.currentGradeLevel,
      currentStep: data.currentStep,
      ...STATUSES,
      ...ABROAD_DATA,
      employerNigeriaOrAbroad: employerCountry !== 'NG' ? 'A' : 'N',
      dateOfFirstAppointment: formattedDateA,
      dateOfCurrentEmployment: formattedDateB,
    };
    console.log(newData);
    updateCustMutation.mutate(newData);
  }

  useEffect(() => {
    if (currentUser.email !== '') {
      form.reset(
        {
          employerName: userData?.result.employerName || '',
          employerPhoneNumber: userData?.result.employerPhoneNumber || '',
          employerStreetName: userData?.result.employerStreetName || '',
          employerTownCity: userData?.result.employerTownCity || '',
          employerZipCode: userData?.result.employerZipCode || '',
          employerState: userData?.result.employerState || '',
          employerPOBox: userData?.result.employerPOBox || '',
          employerCountry: userData?.result.employerCountry || '',
          employerLocalGovernment:
            userData?.result.employerLocalGovernment || '',
          dateOfFirstAppointment: parseISOToCalendarDate(
            String(userData?.result?.dateOfFirstAppointment || '')
          ),
          dateOfCurrentEmployment: parseISOToCalendarDate(
            String(userData?.result?.dateOfCurrentEmployment || '')
          ),
          designation: userData?.result.designation || '',
          staffFileNo: userData?.result.staffFileNo || '',
          currentGradeLevel: userData?.result.currentGradeLevel || '',
          currentStep: userData?.result.currentStep || '',
        },
        { keepDirtyValues: true, keepValues: true }
      );
    }
  }, [userData, currentUser]);

  useEffect(() => {
    if (
      employerCountry !== '' &&
      employerCountry !== 'NG' &&
      employerCountry !== undefined
    ) {
      form.setValue('employerState', 'FR');
      if (states) {
        form.setValue('employerLocalGovernment', 'FRN');
      }
    } else {
      form.setValue('employerState', '');
      form.setValue('employerLocalGovernment', '');
    }
  }, [employerCountry]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Employment Record</h2>
          <p className="my-4">
            Expand each section and complete your employment details
          </p>

          <Progress aria-label="Loading..." value={60} className="mt-10 mb-7" />

          <Accordion selectionMode="multiple">
            <AccordionItem
              key={'1'}
              className="py-5"
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
                  {...form.register('employerName')}
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
                  {...form.register('employerPhoneNumber')}
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
                  {...form.register('employerBuildingNameOrNumber')}
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
                  {...form.register('employerStreetName')}
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
                  {...form.register('employerTownCity')}
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
                  {...form.register('employerZipCode')}
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
                  {...form.register('employerPOBox')}
                />

                <Controller
                  control={form.control}
                  name="employerCountry"
                  render={({ field }) => (
                    <Select
                      items={
                        countries?.filter((country) => country.name !== '') ||
                        []
                      }
                      label="Employer Country"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      selectedKeys={[field.value]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(data) => (
                        <SelectItem
                          key={data.code}
                          value={data.code}
                          classNames={{ title: ['font-inter'] }}
                        >
                          {data.name}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  control={form.control}
                  name="employerState"
                  render={({ field }) => (
                    <Select
                      items={states || []}
                      label="Employer State"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        employerCountry !== 'NG' &&
                        employerCountry !== undefined
                      }
                      selectedKeys={[field.value]}
                      disabledKeys={['FR']}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(data) => (
                        <SelectItem
                          key={data.code}
                          value={data.code}
                          classNames={{ title: ['font-inter'] }}
                        >
                          {data.name}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

                <Controller
                  control={form.control}
                  name="employerLocalGovernment"
                  render={({ field }) => (
                    <Select
                      items={localGovt || []}
                      label="Employer Local Governement"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (employerCountry !== 'NG' &&
                          employerCountry !== undefined) ||
                        employerState === ''
                      }
                      selectedKeys={[field.value]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabledKeys={['FRN']}
                    >
                      {(data) => (
                        <SelectItem
                          key={data.code}
                          value={data.code}
                          classNames={{ title: ['font-inter'] }}
                        >
                          {data.name}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />

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
                  {...form.register('designation')}
                />
              </div>
            </AccordionItem>
            <AccordionItem
              key={'2'}
              className="py-5"
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
                  {...form.register('staffFileNo')}
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
                  control={form.control}
                  name="dateOfFirstAppointment"
                  rules={{
                    required: {
                      value: true,
                      message: 'Date of first employment required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <DateInput
                        label={'Date of First Employment'}
                        isInvalid={Boolean(
                          form.formState.errors.dateOfFirstAppointment
                        )}
                        radius="sm"
                        onChange={onChange}
                        value={value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {form.formState.errors.dateOfFirstAppointment && (
                        <p className="text-danger text-xs font-inter mt-2 ml-3">
                          {
                            form.formState.errors.dateOfFirstAppointment
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  control={form.control}
                  name="dateOfCurrentEmployment"
                  rules={{
                    required: {
                      value: true,
                      message: 'Date of current employment is required',
                    },
                    validate: (value) => {
                      const firstDate = form.getValues(
                        'dateOfFirstAppointment'
                      );
                      if (!firstDate || !value) {
                        return true;
                      }
                      if (value.compare(firstDate) <= 0) {
                        return 'Date of Current Employment must be after Date of First Employment.';
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <DateInput
                        label={'Date of Current Employment'}
                        isInvalid={Boolean(
                          form.formState.errors.dateOfCurrentEmployment
                        )}
                        radius="sm"
                        onChange={onChange}
                        value={value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {form.formState.errors.dateOfCurrentEmployment && (
                        <p className="text-danger text-xs font-inter mt-2 ml-3">
                          {
                            form.formState.errors.dateOfCurrentEmployment
                              .message
                          }
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </AccordionItem>
            <AccordionItem
              key={'3'}
              className="py-5"
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
                  {...form.register('currentGradeLevel')}
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
                  {...form.register('currentStep')}
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
                isLoading={updateCustMutation.isPending}
                color="primary"
                className="font-inter font-semibold bg-black"
              >
                {updateCustMutation.isPending ? 'Loading' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <IFooter />
    </form>
  );
}
