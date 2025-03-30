import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
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
import {
  MARITAL_STATUS,
  INPUT_STYLES,
  NEW_VALUES,
  CUSTOMER_TITLE,
  STATEMENT_OPTION,
  ABROAD_DATA,
  STATUSES,
  GENDER,
} from 'src/data';
import { parseCalendarDateToISO, parseISOToCalendarDate } from 'src/helpers';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import {
  useCustCountries,
  useCustLocalGovt,
  useCustStates,
} from 'src/hooks/query/useLocation';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, StepTwoData, formStepData } from 'src/types';

export default function PersonalDetails() {
  const navigate = useNavigate();
  const [useResAddress, setUseResAddress] = useState(false);

  const form = useForm<RegFormType>();
  const {
    nationality,
    stateOfOrigin,

    residenceState,
    residenceCountry,
    residenceLocalGovernmentCode,

    correspondenceCountry,
    correspondenceState,
  } = useWatch({ control: form.control });

  const { currentUser, setStepFormData, stepFormData } = useStore();

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );
  const { data: countries } = useCustCountries();
  const { data: resCountries } = useCustCountries();
  const { data: corresCountries } = useCustCountries();

  const { data: states } = useCustStates();
  const { data: resStates } = useCustStates();
  const { data: corresStates } = useCustStates();

  const { data: localGovtOrigin } = useCustLocalGovt(
    stateOfOrigin || userData?.result?.stateOfOrigin
  );
  const { data: resLocalGovt } = useCustLocalGovt(
    residenceState || userData?.result?.residenceState
  );
  const { data: corresLocalGovt } = useCustLocalGovt(
    correspondenceState || userData?.result?.correspondenceState
  );

  console.log(correspondenceState);

  console.log(userData?.result?.correspondenceLocalGovernmentCode);

  const updateCustMutation = useUpdateCustMutation<formStepData>('/step-three');

  function handleUseResAddressChange(isChecked: boolean) {
    setUseResAddress(isChecked);
    if (isChecked) {
      const [
        residenceHouseNameOrNumber,
        residenceTownCity,
        residenceStreetName,
        residenceZipCode,
      ] = form.getValues([
        'residenceHouseNameOrNumber',
        'residenceTownCity',
        'residenceStreetName',
        'residenceZipCode',
      ]);
      form.setValue(
        'correspondenceHouseNameOrNumber',
        String(residenceHouseNameOrNumber)
      );
      form.setValue('correspondenceStreetName', residenceStreetName);
      form.setValue('correspondenceTownCity', residenceTownCity);
      form.setValue('correspondenceZipCode', residenceZipCode);

      form.setValue('correspondenceCountry', String(residenceCountry));
      form.setValue('correspondenceState', String(residenceState));

      form.setValue(
        'correspondenceLocalGovernmentCode',
        String(residenceLocalGovernmentCode)
      );
    } else {
      form.setValue('correspondenceHouseNameOrNumber', '');
      form.setValue('correspondenceStreetName', '');
      form.setValue('correspondenceTownCity', '');
      form.setValue('correspondenceZipCode', '');

      form.setValue('correspondenceCountry', '');
      form.setValue('correspondenceState', '');
      form.setValue('correspondenceLocalGovernmentCode', '');
    }
  }

  function onSubmit(data: StepTwoData) {
    const { dateOfBirth, gender, maritalStatus, ...rest } = data;
    const formattedDate = parseCalendarDateToISO(dateOfBirth);

    const newData: formStepData = {
      ...NEW_VALUES,
      ...rest,
      dateOfBirth: formattedDate,
      ...STATUSES,
      gender: Math.floor(gender),
      maritalStatus: Math.floor(maritalStatus),
      ...ABROAD_DATA,
      nigeriaOrAbroad: residenceCountry !== 'NG' ? 'A' : 'N',
    };
    // console.log(newData);
    setStepFormData(newData);
    updateCustMutation.mutate(newData);
  }

  useEffect(() => {
    if (userData) {
      form.reset(
        {
          title: userData?.result?.title || '',
          firstName: userData?.result.firstName || '',
          surname: userData?.result?.surname || '',
          middleName: userData?.result?.middleName || '',
          gender: userData?.result?.gender,
          dateOfBirth: parseISOToCalendarDate(
            String(userData.result?.dateOfBirth || '')
          ),
          placeOfBirth: userData?.result.placeOfBirth || '',
          maritalStatus: userData?.result?.maritalStatus,
          nationality: userData?.result.nationality || '',
          stateOfOrigin: userData?.result.stateOfOrigin || '',
          localGovernmentOfOrigin:
            userData?.result.localGovernmentOfOrigin || '',
          maidenOrFormerName: userData?.result.maidenOrFormerName || '',
          phoneNumber: userData?.result?.phoneNumber || '',
          email: userData?.result?.email || '',
          nin:
            userData?.result?.nin === '24444444444'
              ? ''
              : userData?.result?.nin || '',

          residenceHouseNameOrNumber:
            userData?.result.residenceHouseNameOrNumber || '',
          residenceStreetName: userData?.result.residenceStreetName || '',
          residenceTownCity: userData?.result.residenceTownCity || '',
          residenceZipCode: userData?.result.placeOfBirth || '',
          poBox: userData?.result.poBox || '',
          residenceCountry: userData?.result.residenceCountry || '',
          residenceState: userData?.result?.residenceState || '',
          residenceLocalGovernmentCode:
            userData?.result.residenceLocalGovernmentCode || '',

          correspondenceHouseNameOrNumber:
            userData?.result.correspondenceHouseNameOrNumber || '',
          correspondenceTownCity: userData?.result.correspondenceTownCity || '',
          correspondenceStreetName:
            userData?.result.correspondenceStreetName || '',
          correspondenceZipCode: userData?.result.correspondenceZipCode || '',
          correspondenceCountry: userData?.result.correspondenceCountry || '',
          correspondenceState: userData?.result.correspondenceState || '',
          correspondenceLocalGovernmentCode:
            userData?.result.correspondenceLocalGovernmentCode || '',

          bankName: userData?.result.bankName || '',
          customerAccountNo: userData?.result.customerAccountNo || '',
          bvn:
            userData?.result.bvn === '24444444444'
              ? ''
              : userData?.result.bvn || '',
          statementOption: userData?.result.statementOption || '',
        },
        { keepDirtyValues: true, keepValues: true }
      );
    }
    console.log(userData);
    console.log(currentUser);
  }, [userData, currentUser, useResAddress]);

  useEffect(() => {
    if (
      nationality !== '' &&
      nationality !== 'NG' &&
      nationality !== undefined
    ) {
      form.setValue('stateOfOrigin', 'FR');
      if (states) {
        form.setValue('localGovernmentOfOrigin', 'FRN');
      }
    } else {
      form.setValue('stateOfOrigin', userData?.result?.stateOfOrigin || '');
      form.setValue(
        'localGovernmentOfOrigin',
        userData?.result?.localGovernmentOfOrigin || ''
      );
    }
  }, [nationality]);

  useEffect(() => {
    if (
      residenceCountry !== '' &&
      residenceCountry !== 'NG' &&
      residenceCountry !== undefined
    ) {
      form.setValue('residenceState', 'FR');
      if (resStates) {
        form.setValue('residenceLocalGovernmentCode', 'FRN');
      }
    } else {
      const resValue = userData?.result?.residenceState;
      if (!useResAddress && resValue === '') {
        form.setValue('residenceState', '');
        form.setValue('residenceLocalGovernmentCode', '');
      }
    }
  }, [residenceCountry]);

  useEffect(() => {
    if (
      correspondenceCountry !== '' &&
      correspondenceCountry !== 'NG' &&
      correspondenceCountry !== undefined
    ) {
      form.setValue('correspondenceState', 'FR');
      if (corresStates) {
        form.setValue('correspondenceLocalGovernmentCode', 'FRN');
      }
    } else {
      const resValue = userData?.result?.correspondenceState;
      if (!useResAddress && resValue === '') {
        form.setValue('correspondenceState', '');
        form.setValue('correspondenceLocalGovernmentCode', '');
      }
    }
  }, [correspondenceCountry]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Personal Details</h2>
          <p className="my-4">
            Expand each section and complete your bio details
          </p>

          <Progress aria-label="Loading..." value={40} className="mt-10 mb-7" />

          <Accordion selectionMode="multiple">
            <AccordionItem
              key={'1'}
              className="py-5"
              aria-label="first-accordion"
              subtitle={
                <span>Expand each section and complete your bio details</span>
              }
              title="Bio"
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="grid grid-cols-4 gap-5">
                <Select
                  label="Title"
                  placeholder="-Select title-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: ['border-1 border-solid border-grey-900'],
                  }}
                  {...form.register('title')}
                >
                  {CUSTOMER_TITLE.map((tit) => (
                    <SelectItem
                      key={tit}
                      value={tit}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {tit}
                    </SelectItem>
                  ))}
                </Select>

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
                  {...form.register('firstName')}
                />

                <Input
                  type="text"
                  label="Other Name"
                  placeholder="Enter your other name"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('middleName')}
                />

                <Input
                  type="text"
                  label="Surname"
                  placeholder="Enter your surname "
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('surname')}
                />

                <Select
                  label="Gender"
                  placeholder="-Select gender-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...form.register('gender')}
                >
                  {GENDER.map((gen) => (
                    <SelectItem
                      key={gen.id}
                      value={gen.id}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {gen.title}
                    </SelectItem>
                  ))}
                </Select>

                <Controller
                  control={form.control}
                  name="dateOfBirth"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <DateInput
                        label={'Date of Birth'}
                        isRequired
                        isInvalid={Boolean(form.formState.errors.dateOfBirth)}
                        radius="sm"
                        onChange={field.onChange}
                        value={field.value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {form.formState.errors.dateOfBirth && (
                        <p className="text-danger text-xs font-inter">
                          Please fill out this field.
                        </p>
                      )}
                    </div>
                  )}
                />

                <Input
                  type="text"
                  label="Place of Birth"
                  placeholder="Enter your place of birth "
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('placeOfBirth')}
                />

                <Select
                  label="Marital Status"
                  placeholder="-Select Status-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...form.register('maritalStatus')}
                >
                  {MARITAL_STATUS.map((status) => (
                    <SelectItem
                      key={status.id}
                      value={status.id}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {status.title}
                    </SelectItem>
                  ))}
                </Select>

                <Controller
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <Select
                      items={
                        countries?.filter((country) => country.name !== '') ||
                        []
                      }
                      label="Country of Origin"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
                  name="stateOfOrigin"
                  render={({ field }) => (
                    <Select
                      items={states || []}
                      label="State of Origin"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        nationality !== 'NG' && nationality !== undefined
                      }
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabledKeys={['FR']}
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
                  name="localGovernmentOfOrigin"
                  render={({ field }) => (
                    <Select
                      items={localGovtOrigin || []}
                      label="Local Governement of Origin"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (nationality !== 'NG' && nationality !== undefined) ||
                        stateOfOrigin === ''
                      }
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
                  label="Maiden/Formal Name"
                  placeholder="Enter your maiden/formal name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('maidenOrFormerName')}
                />

                <Input
                  type="text"
                  label="Mobile Number"
                  placeholder="Enter your moile number"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  isDisabled={userData?.result?.phoneNumber !== ''}
                  {...form.register('phoneNumber')}
                />

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
                  isDisabled={userData?.result?.email !== ''}
                  {...form.register('email')}
                />

                <Input
                  type="text"
                  label="National Identity Nnumber (NIN)"
                  placeholder="Enter your NIN"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nin')}
                />
              </div>
            </AccordionItem>
            <AccordionItem
              key={'2'}
              className="py-5"
              aria-label="second-accordion"
              subtitle={
                <span>
                  Expand each section and complete your residential details
                </span>
              }
              title="Residential Address"
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="grid grid-cols-4 gap-5">
                <Input
                  type="text"
                  label="Building Number/Name"
                  placeholder="Enter your building number/name "
                  isRequired
                  radius="sm"
                  isInvalid={Boolean(
                    form.formState.errors.residenceHouseNameOrNumber
                  )}
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('residenceHouseNameOrNumber', {
                    maxLength: 40,
                  })}
                />

                <Input
                  type="text"
                  label="Street Name"
                  placeholder="Enter your street name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('residenceStreetName')}
                />

                <Input
                  type="text"
                  label="Village/Town/City"
                  placeholder="Enter your village/town/city"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('residenceTownCity')}
                />

                <Input
                  type="text"
                  label="Postal/Zip Code"
                  placeholder="Enter your postal code"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('residenceZipCode')}
                />

                <Input
                  type="text"
                  label="P.O Box/P.M.B"
                  placeholder="Enter your p.o box/P.M.B"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('poBox')}
                />

                <Controller
                  control={form.control}
                  name="residenceCountry"
                  render={({ field }) => (
                    <Select
                      items={
                        resCountries?.filter(
                          (country) => country.name !== ''
                        ) || []
                      }
                      label="Residential Country"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
                  name="residenceState"
                  render={({ field }) => (
                    <Select
                      items={resStates || []}
                      label="Residential State"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        residenceCountry !== 'NG' &&
                        residenceCountry !== undefined
                      }
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      disabledKeys={['FR']}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
                  name="residenceLocalGovernmentCode"
                  render={({ field }) => (
                    <Select
                      items={resLocalGovt || []}
                      label="Local Governement of Residence"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (residenceCountry !== 'NG' &&
                          residenceCountry !== undefined) ||
                        residenceState === ''
                      }
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
              </div>
            </AccordionItem>
            <AccordionItem
              key={'3'}
              className="py-5"
              aria-label="third-accordion"
              subtitle={
                <span>
                  Expand each section and complete your correspondence details
                </span>
              }
              title="Corresondence Address"
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="p-5 bg-gray-100 mt-2 mb-5 rounded-md">
                <Checkbox
                  isSelected={useResAddress}
                  radius="sm"
                  onValueChange={handleUseResAddressChange}
                  classNames={{ label: ['font-medium text-sm'] }}
                >
                  Do you want to use Residential Address as Correspondence
                  Address?
                </Checkbox>
              </div>
              <div className="grid grid-cols-4 gap-5">
                <Input
                  type="text"
                  label="Building Number/Name"
                  placeholder="Enter your building number/name "
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  isDisabled={useResAddress}
                  {...form.register('correspondenceHouseNameOrNumber')}
                />

                <Input
                  type="text"
                  label="Street Name"
                  placeholder="Enter your street name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  isDisabled={useResAddress}
                  {...form.register('correspondenceStreetName')}
                />

                <Input
                  type="text"
                  label="Village/Town/City"
                  placeholder="Enter your village/town/city"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  isDisabled={useResAddress}
                  {...form.register('correspondenceTownCity')}
                />

                <Input
                  type="text"
                  label="Postal/Zip Code"
                  placeholder="Enter your postal code"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  isDisabled={useResAddress}
                  {...form.register('correspondenceZipCode')}
                />

                <Controller
                  control={form.control}
                  name="correspondenceCountry"
                  render={({ field }) => (
                    <Select
                      items={
                        corresCountries?.filter(
                          (country) => country.name !== ''
                        ) || []
                      }
                      label="Correspondence Country"
                      isRequired
                      radius="sm"
                      isDisabled={useResAddress}
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
                  name="correspondenceState"
                  render={({ field }) => (
                    <Select
                      items={corresStates || []}
                      label="State of Residence"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (correspondenceCountry !== 'NG' &&
                          correspondenceCountry !== undefined) ||
                        useResAddress
                      }
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabledKeys={['FR']}
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
                  name="correspondenceLocalGovernmentCode"
                  render={({ field }) => (
                    <Select
                      items={corresLocalGovt || []}
                      label="Local Governement Area"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (correspondenceCountry !== 'NG' &&
                          correspondenceCountry !== undefined) ||
                        useResAddress ||
                        correspondenceState === ''
                      }
                      selectedKeys={
                        field.value !== undefined ? [field.value] : []
                      }
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
              </div>
            </AccordionItem>
            <AccordionItem
              key={'4'}
              className="py-5"
              aria-label="fourth-accordion"
              subtitle={
                <span>
                  Expand each section and complete your statement details
                </span>
              }
              title="Statment Preference & Bank Account"
              classNames={{
                title: ['font-semibold text-xl'],
              }}
            >
              <div className="grid grid-cols-4 gap-5">
                <Select
                  label="Bank Name"
                  placeholder="-Select Bank-"
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...form.register('bankName')}
                >
                  <SelectItem
                    key={'Zenith'}
                    value={'Zenith'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Zenith Bank
                  </SelectItem>
                </Select>

                <Input
                  type="text"
                  label="Bank Account Number"
                  placeholder="Enter your bank account number"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('customerAccountNo')}
                />

                <Input
                  type="text"
                  label="Bank Verification Number (BVN)"
                  placeholder="Enter your BVN"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('bvn')}
                />

                <Select
                  label="Statement Option"
                  placeholder="-Select Statement-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...form.register('statementOption')}
                >
                  {STATEMENT_OPTION.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </Select>
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
                  pathname: '/step-one',
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
