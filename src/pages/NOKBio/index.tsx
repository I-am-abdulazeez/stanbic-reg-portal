import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Divider,
  Input,
  Progress,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import IFooter from 'src/components/IFooter';
import INavbar from 'src/components/INavbar';

import useStore from 'src/store';
import {
  CUSTOMER_TITLE,
  NOK_RELATIONSHIP,
  INPUT_STYLES,
  NEW_VALUES,
  GENDER,
} from 'src/data';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import {
  useCustCountries,
  useCustLocalGovt,
  useCustStates,
} from 'src/hooks/query/useLocation';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, StepFourData, formStepData } from 'src/types';

export default function NOKBio() {
  const { currentUser, stepFormData, setStepFormData } = useStore();
  const [useResAddress, setUseResAddress] = useState(false);

  const form = useForm<RegFormType>();
  const navigate = useNavigate();
  const updateCustMutation = useUpdateCustMutation<formStepData>('/step-five');

  const { nokResidenceCountry, nokResidenceState } = useWatch({
    control: form.control,
  });

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );
  const { data: countries } = useCustCountries();
  const { data: states } = useCustStates();
  const { data: localGovt } = useCustLocalGovt(nokResidenceState);

  function handleUseResAddressChange(isChecked: boolean) {
    setUseResAddress(isChecked);
    if (isChecked) {
      const residenceHouseNameOrNumber =
        userData?.result?.residenceHouseNameOrNumber;
      const residenceStreetName = userData?.result?.residenceStreetName;
      const residenceTownCity = userData?.result?.residenceTownCity;
      const residenceCountry = userData?.result?.residenceCountry;
      const residenceState = userData?.result?.residenceState;
      const residenceLocalGovernmentCode =
        userData?.result?.residenceLocalGovernmentCode;
      form.setValue(
        'nokResidenceHouseNumber',
        String(residenceHouseNameOrNumber)
      );
      form.setValue('nokResidenceStreetName', String(residenceStreetName));
      form.setValue('nokResidenceTownCity', String(residenceTownCity));

      form.setValue('nokResidenceCountry', String(residenceCountry));
      form.setValue('nokResidenceState', String(residenceState));

      form.setValue(
        'nokResidenceLocalGovernment',
        String(residenceLocalGovernmentCode)
      );
    } else {
      form.setValue('nokResidenceHouseNumber', '');
      form.setValue('nokResidenceStreetName', '');
      form.setValue('nokResidenceTownCity', '');

      form.setValue('nokResidenceCountry', '');
      form.setValue('nokResidenceState', '');

      form.setValue('nokResidenceLocalGovernment', '');
    }
  }

  function onSubmit(data: StepFourData) {
    const newData: formStepData = {
      ...NEW_VALUES,
      ...stepFormData,
      nokTitle: data?.nokTitle,
      nokEmail: data?.nokEmail,
      nokGender: Math.floor(data?.nokGender),
      nokFirstname: data?.nokFirstname,
      nokSurname: data?.nokSurname,
      nokMiddlename: data?.nokMiddlename,
      nokPhoneNumber: data?.nokPhoneNumber,
      nokResidenceCountry: data?.nokResidenceCountry,
      nokResidenceHouseNumber: data?.nokResidenceHouseNumber,
      nokResidenceState: data?.nokResidenceState,
      nokResidenceLocalGovernment: data?.nokResidenceLocalGovernment,
      nokResidenceTownCity: data?.nokResidenceTownCity,
      nokpoBox: data?.nokpoBox || '',
      nokZipCode: data?.nokZipCode || '',
      nokResidenceStreetName: data?.nokResidenceStreetName,
      nokNigeriaOrAbroad: nokResidenceCountry !== 'NG' ? 'A' : 'N',
      relationship: data?.relationship,
      employerNatureOfBusiness: 'Petroleum Companies',
    };
    console.log(newData);
    setStepFormData(newData);
    updateCustMutation.mutate(newData);
  }

  useEffect(() => {
    if (currentUser.email !== '') {
      form.reset(
        {
          nokTitle: userData?.result.nokTitle || '',
          nokEmail: userData?.result.nokEmail || '',
          nokGender: userData?.result.nokGender || undefined,
          nokFirstname: userData?.result.nokFirstname || '',
          nokSurname: userData?.result.nokSurname || '',
          nokMiddlename: userData?.result.nokMiddlename || '',
          nokPhoneNumber: userData?.result.nokPhoneNumber || '',
          nokResidenceCountry: userData?.result.nokResidenceCountry || '',
          nokResidenceHouseNumber:
            userData?.result.nokResidenceHouseNumber || '',
          nokResidenceState: userData?.result.nokResidenceState || '',
          relationship: userData?.result.relationship || '',
          nokResidenceLocalGovernment:
            userData?.result.nokResidenceLocalGovernment || '',
          nokResidenceTownCity: userData?.result.nokResidenceTownCity || '',
          nokpoBox: userData?.result.nokpoBox || '',
          nokZipCode: userData?.result.nokZipCode || '',
          nokResidenceStreetName: userData?.result.nokResidenceStreetName || '',
        },
        { keepDirtyValues: true, keepValues: true }
      );
      console.log(userData);
    }
  }, [userData, currentUser]);

  useEffect(() => {
    if (
      nokResidenceCountry !== '' &&
      nokResidenceCountry !== 'NG' &&
      nokResidenceCountry !== undefined
    ) {
      form.setValue('nokResidenceState', 'FR');
      if (states) {
        form.setValue('nokResidenceLocalGovernment', 'FRN');
      }
    } else {
      if (!useResAddress) {
        form.setValue(
          'nokResidenceState',
          userData?.result.nokResidenceState || ''
        );
        form.setValue(
          'nokResidenceLocalGovernment',
          userData?.result.nokResidenceLocalGovernment || ''
        );
      }
    }
  }, [nokResidenceCountry, nokResidenceState]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Next of Kin Bio</h2>
          <p className="my-4">
            Expand each section and complete your employment details
          </p>

          <Progress aria-label="Loading..." value={80} className="mt-10 mb-7" />

          {/* <Divider className="my-10 mx-auto" /> */}

          <Accordion selectionMode="multiple">
            <AccordionItem
              key={'1'}
              className="py-5"
              aria-label="first-accordion"
              title="Next of Kin"
              subtitle={
                <span>Expand each section and complete your NOK details</span>
              }
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
                  {...form.register('nokTitle')}
                >
                  {CUSTOMER_TITLE.map((userT) => (
                    <SelectItem
                      key={userT}
                      value={userT}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {userT}
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
                  {...form.register('nokFirstname')}
                />

                <Input
                  type="text"
                  label="Other Name"
                  placeholder="Enter your other name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nokMiddlename')}
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
                  {...form.register('nokSurname')}
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
                  {...form.register('nokGender')}
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

                <Select
                  label="Relationship"
                  placeholder="-Select nok relationship-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...form.register('relationship')}
                >
                  {NOK_RELATIONSHIP.map((rel) => (
                    <SelectItem
                      key={rel}
                      value={rel}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {rel}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </AccordionItem>
            <AccordionItem
              key={'2'}
              className="py-5"
              aria-label="second-accordion"
              subtitle={
                <span>Expand each section and compelete your NOK address</span>
              }
              title="Next of Kin Address"
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
                  Do you want to use Residential Address as NOK Address?
                </Checkbox>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <Input
                  type="text"
                  label="Building Number/Name"
                  placeholder="Enter your NOK building number/name"
                  isRequired
                  radius="sm"
                  isDisabled={useResAddress}
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nokResidenceHouseNumber')}
                />

                <Input
                  type="text"
                  label="Employer Street name"
                  placeholder="Enter your NOK street name "
                  isRequired
                  isDisabled={useResAddress}
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nokResidenceStreetName')}
                />

                <Input
                  type="text"
                  label="Village/Town/City "
                  placeholder="Enter your NOK village/town/city"
                  isRequired
                  isDisabled={useResAddress}
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nokResidenceTownCity')}
                />

                <Controller
                  control={form.control}
                  name="nokResidenceCountry"
                  render={({ field }) => (
                    <Select
                      items={
                        countries?.filter((country) => country.name !== '') ||
                        []
                      }
                      label="Residential Country"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={useResAddress}
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
                  name="nokResidenceState"
                  render={({ field }) => (
                    <Select
                      items={states || []}
                      label="Residential State"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (nokResidenceCountry !== 'NG' &&
                          nokResidenceCountry !== undefined) ||
                        useResAddress
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
                  name="nokResidenceLocalGovernment"
                  render={({ field }) => (
                    <Select
                      items={localGovt || []}
                      label="Local Governement of Residence"
                      isRequired
                      radius="sm"
                      className="font-inter font-medium text-xl"
                      classNames={{
                        trigger: INPUT_STYLES,
                      }}
                      isDisabled={
                        (nokResidenceCountry !== 'NG' &&
                          nokResidenceCountry !== undefined) ||
                        nokResidenceState === '' ||
                        useResAddress
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
                  label="Mobile Number"
                  placeholder="Enter your nok phone number"
                  radius="sm"
                  isRequired
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nokPhoneNumber')}
                />

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your nok email address"
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...form.register('nokEmail')}
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
                  pathname: '/step-three',
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
