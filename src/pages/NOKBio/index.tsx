import { useEffect } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Progress,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import IFooter from 'src/components/IFooter';
import INavbar from 'src/components/INavbar';

import useStore from 'src/store';
import {
  CUSTOMER_TITLE,
  NOK_RELATIONSHIP,
  INPUT_STYLES,
  NEW_VALUES,
  ABROAD_DATA,
  STATUSES,
} from 'src/data';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, StepFourData, formStepData } from 'src/types';

export default function NOKBio() {
  const { currentUser, stepFormData, setStepFormData } = useStore();

  const { register, handleSubmit, reset } = useForm<RegFormType>();
  const navigate = useNavigate();
  const updateCustomerMutation =
    useUpdateCustMutation<formStepData>('/step-five');

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );

  function onSubmit(data: StepFourData) {
    const newData = {
      ...NEW_VALUES,
      ...stepFormData,
      nokTitle: data?.nokTitle,
      nokEmail: data?.nokEmail,
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
      ...STATUSES,
      ...ABROAD_DATA,
    };
    updateCustomerMutation.mutate(newData);
  }

  useEffect(() => {
    if (currentUser.email !== '') {
      reset(
        {
          nokTitle: userData?.result.nokTitle || '',
          nokEmail: userData?.result.nokEmail || '',
          nokFirstname: userData?.result.nokFirstname || '',
          nokSurname: userData?.result.nokSurname || '',
          nokMiddlename: userData?.result.nokMiddlename || '',
          nokPhoneNumber: userData?.result.nokPhoneNumber || '',
          nokResidenceCountry: userData?.result.nokResidenceCountry || '',
          nokResidenceHouseNumber:
            userData?.result.nokResidenceHouseNumber || '',
          nokResidenceState: userData?.result.nokResidenceState || '',
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

          <Accordion defaultExpandedKeys={['1']} selectionMode="multiple">
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
                  {...register('nokTitle')}
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
                  {...register('nokFirstname')}
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
                  {...register('nokMiddlename')}
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
                  {...register('nokSurname')}
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
                  {...register('nokGender')}
                >
                  <SelectItem
                    key={'Male'}
                    value={'Male'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Male
                  </SelectItem>
                  <SelectItem
                    key={'Female'}
                    value={'Female'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Female
                  </SelectItem>
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
                  {...register('relationship')}
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
              {/* <Checkbox className="mt-2 mb-5">Use Residential Address</Checkbox> */}
              <div className="grid grid-cols-3 gap-5">
                <Input
                  type="text"
                  label="Building Number/Name"
                  placeholder="Enter your NOK building number/name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('nokResidenceHouseNumber')}
                />

                <Input
                  type="text"
                  label="Employer Street name"
                  placeholder="Enter your NOK street name "
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('nokResidenceStreetName')}
                />

                <Input
                  type="text"
                  label="Village/Town/City "
                  placeholder="Enter your NOK village/town/city"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('nokResidenceTownCity')}
                />

                <Select
                  label="Residential Country"
                  placeholder="-Select Country-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('nokResidenceCountry')}
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
                  label="Residential State"
                  placeholder="-Select State-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('nokResidenceState')}
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
                  label="Local Governement of Residence"
                  placeholder="-Select Local Govt-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('nokResidenceLocalGovernment')}
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
                  label="Mobile Number"
                  placeholder="Enter your nok phone number"
                  radius="sm"
                  isRequired
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('nokPhoneNumber')}
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
                  {...register('nokEmail')}
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
