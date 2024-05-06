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
import {
  MARITAL_STATUS,
  INPUT_STYLES,
  NEW_VALUES,
  CUSTOMER_TITLE,
  STATEMENT_OPTION,
  ABROAD_DATA,
  STATUSES,
} from 'src/data';
import { DateToString } from 'src/helpers';

import { useCustomerByDetails } from 'src/hooks/query/useCustomers';
import { useUpdateCustMutation } from 'src/hooks/mutation/useCustMutations';

import { RegFormType, StepTwoData, formStepData } from 'src/types';

export default function PersonalDetails() {
  const { currentUser, stepFormData, setStepFormData } = useStore();
  const updateCustomerMutation =
    useUpdateCustMutation<formStepData>('/step-three');

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RegFormType>();
  const navigate = useNavigate();

  function onSubmit(data: StepTwoData) {
    const { dateOfBirth, ...rest } = data;
    const formattedDate = DateToString(dateOfBirth);

    const newData = {
      ...NEW_VALUES,
      ...rest,
      dateOfBirth: formattedDate,
      ...STATUSES,
      ...ABROAD_DATA,
    };
    console.log(newData);
    updateCustomerMutation.mutate(newData);
    setStepFormData(newData);
  }

  useEffect(() => {
    if (currentUser.email !== '') {
      reset(
        {
          firstName: userData?.temporaryCustomer.firstName || '',
          surname: userData?.temporaryCustomer?.surname || '',
          title: userData?.temporaryCustomer?.title || '',
          phoneNumber: userData?.temporaryCustomer?.phoneNumber || '',
          residenceState: userData?.temporaryCustomer?.residenceState || '',
          nin:
            userData?.temporaryCustomer?.nin === '24444444444'
              ? ''
              : userData?.temporaryCustomer?.nin || '',
          email: userData?.temporaryCustomer?.email || '',
          middleName: userData?.temporaryCustomer?.middleName || '',
          placeOfBirth: userData?.temporaryCustomer.placeOfBirth || '',
          stateOfOrigin: userData?.temporaryCustomer.stateOfOrigin || '',
          localGovernmentOfOrigin:
            userData?.temporaryCustomer.stateOfOrigin || '',
          nationality: userData?.temporaryCustomer.nationality || '',
          maidenOrFormerName:
            userData?.temporaryCustomer.maidenOrFormerName || '',

          residenceHouseNameOrNumber:
            userData?.temporaryCustomer.residenceHouseNameOrNumber || '',
          residenceStreetName:
            userData?.temporaryCustomer.residenceStreetName || '',
          residenceZipCode: userData?.temporaryCustomer.placeOfBirth || '',
          residenceCountry: userData?.temporaryCustomer.residenceCountry || '',
          residenceTownCity:
            userData?.temporaryCustomer.residenceTownCity || '',
          poBox: userData?.temporaryCustomer.poBox || '',

          residenceLocalGovernmentCode:
            userData?.temporaryCustomer.residenceLocalGovernmentCode || '',
          correspondenceCountry:
            userData?.temporaryCustomer.correspondenceCountry || '',
          correspondenceState:
            userData?.temporaryCustomer.correspondenceState || '',
          correspondenceLocalGovernmentCode:
            userData?.temporaryCustomer.correspondenceLocalGovernmentCode || '',
          correspondenceHouseNameOrNumber:
            userData?.temporaryCustomer.correspondenceHouseNameOrNumber || '',
          correspondenceStreetName:
            userData?.temporaryCustomer.correspondenceStreetName || '',
          correspondenceTownCity:
            userData?.temporaryCustomer.correspondenceTownCity || '',
          correspondenceZipCode:
            userData?.temporaryCustomer.correspondenceZipCode || '',
          bankName: userData?.temporaryCustomer.bankName || '',
          customerAccountNo:
            userData?.temporaryCustomer.customerAccountNo || '',
          bvn:
            userData?.temporaryCustomer.bvn === '24444444444'
              ? ''
              : userData?.temporaryCustomer.bvn || '',
          statementOption: userData?.temporaryCustomer.statementOption || '',
        },
        { keepDirtyValues: true, keepValues: true }
      );
      console.log(userData);
      console.log(stepFormData);
    }
    console.log(currentUser);
  }, [userData, currentUser, stepFormData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Personal Details</h2>
          <p className="my-4">
            Expand each section and complete your bio details
          </p>

          <Progress aria-label="Loading..." value={40} className="mt-10 mb-7" />

          <Accordion defaultExpandedKeys={['2']} variant="light">
            <AccordionItem
              key={'1'}
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
                  {...register('title')}
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
                  {...register('firstName')}
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
                  {...register('middleName')}
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
                  {...register('surname')}
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
                  {...register('gender')}
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

                <Controller
                  control={control}
                  name="dateOfBirth"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <DateInput
                        label={'Date of Birth'}
                        isRequired
                        isInvalid={Boolean(errors.dateOfBirth)}
                        radius="sm"
                        onChange={onChange}
                        value={value}
                        className="font-inter font-medium text-xl"
                        classNames={{
                          inputWrapper: INPUT_STYLES,
                        }}
                      />
                      {errors.dateOfBirth && (
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
                  {...register('placeOfBirth')}
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
                  {...register('maritalStatus')}
                >
                  {MARITAL_STATUS.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      classNames={{ title: ['font-inter'] }}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Country of Origin"
                  placeholder="-Select Country-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('nationality')}
                >
                  <SelectItem
                    key={'Single'}
                    value={'Single'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Nigeria
                  </SelectItem>
                </Select>

                <Select
                  label="State of Origin"
                  placeholder="-Select State-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('stateOfOrigin')}
                >
                  <SelectItem
                    key={'Single'}
                    value={'Single'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Lagos
                  </SelectItem>
                </Select>

                <Select
                  label="Local Governement of Origin"
                  placeholder="-Select Local Govt-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('localGovernmentOfOrigin')}
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
                  label="Maiden/Formal Name"
                  placeholder="Enter your maiden/formal name"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('maidenOrFormerName')}
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
                  {...register('phoneNumber')}
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
                  {...register('email')}
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
                  {...register('nin')}
                />
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion variant="light">
            <AccordionItem
              key={'2'}
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
                  className="font-inter font-medium text-xl rounded-lg"
                  classNames={{
                    inputWrapper: INPUT_STYLES,
                  }}
                  {...register('residenceHouseNameOrNumber')}
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
                  {...register('residenceStreetName')}
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
                  {...register('residenceTownCity')}
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
                  {...register('residenceZipCode')}
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
                  {...register('poBox')}
                />

                <Select
                  label="Residenntial Country"
                  placeholder="-Select Country-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('residenceCountry')}
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
                  {...register('residenceState')}
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
                  {...register('residenceLocalGovernmentCode')}
                >
                  <SelectItem
                    key={'Mushin'}
                    value={'Mushin'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Mushin
                  </SelectItem>
                </Select>
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion variant="light">
            <AccordionItem
              key={'3'}
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
              {/* <Checkbox
                className="mt-2 mb-5"
                isSelected={useResAddress}
                onValueChange={handleUseResAddressChange}
              >
                Use Residential Address
              </Checkbox> */}
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
                  {...register('correspondenceHouseNameOrNumber')}
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
                  {...register('correspondenceStreetName')}
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
                  {...register('correspondenceTownCity')}
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
                  {...register('correspondenceZipCode')}
                />

                <Select
                  label="Correspondence Country"
                  placeholder="-Select Country-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('correspondenceCountry')}
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
                  label="State of Residence"
                  placeholder="-Select State-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('correspondenceState')}
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
                  label="Local Governement Area"
                  placeholder="-Select Local Govt-"
                  isRequired
                  radius="sm"
                  className="font-inter font-medium text-xl"
                  classNames={{
                    trigger: INPUT_STYLES,
                  }}
                  {...register('correspondenceLocalGovernmentCode')}
                >
                  <SelectItem
                    key={'Mushin'}
                    value={'Mushin'}
                    classNames={{ title: ['font-inter'] }}
                  >
                    Mushin
                  </SelectItem>
                </Select>
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion variant="light">
            <AccordionItem
              key={'4'}
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
                  {...register('bankName')}
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
                  {...register('customerAccountNo')}
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
                  {...register('bvn')}
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
                  {...register('statementOption')}
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
