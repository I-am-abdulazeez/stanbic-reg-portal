import { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';

import INavbar from 'src/components/INavbar';
import IFooter from 'src/components/IFooter';

import useStore from 'src/store';
import {
  useCustomerByDetails,
  useGeneratePencomResponse,
} from 'src/hooks/query/useCustomers';
import { useSendToPencom } from 'src/hooks/mutation/useCustMutations';
import {
  useCustCountries,
  useCustLocalGovt,
  useCustStates,
} from 'src/hooks/query/useLocation';

export default function Summary() {
  const { stepFormData, currentUser } = useStore();
  const [checked, setChecked] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [responseCheck, setResponseCheck] = useState(false);

  const { data: userData, isPending } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );
  const { data: resCountries } = useCustCountries();
  const { data: resStates } = useCustStates();

  const { data: corresCountries } = useCustCountries();
  const { data: corresStates } = useCustStates();
  const { data: corresLocalGovt } = useCustLocalGovt(
    userData?.result?.correspondenceState
  );

  const { data: employerStates } = useCustStates();
  const { data: employerLocalGovt } = useCustLocalGovt(
    userData?.result?.employerState
  );

  const resCountryValue = resCountries?.find(
    (country) => country.code === userData?.result?.residenceCountry
  );
  const resStateValue = resStates?.find(
    (state) => state.code === userData?.result?.residenceState
  );

  const corresCountry = corresCountries?.find(
    (country) => country.code === userData?.result?.correspondenceCountry
  );
  const corresState = corresStates?.find(
    (state) => state.code === userData?.result?.correspondenceState
  );
  const corresLocal = corresLocalGovt?.find(
    (local) =>
      local.code === userData?.result?.correspondenceLocalGovernmentCode
  );

  const employerState = employerStates?.find(
    (state) => state.code === userData?.result?.employerState
  );
  const employerLocal = employerLocalGovt?.find(
    (local) => local.code === userData?.result?.employerLocalGovernment
  );

  const userId = userData?.result.no;

  const sendToPen = useSendToPencom(userId!, onOpen);

  const { data, isLoading, refetch } = useGeneratePencomResponse(
    sendToPen?.data?.ReferenceID!
  );

  useEffect(() => {
    console.log(userId);
    console.log(currentUser);
  }, [stepFormData, userId, userData, currentUser]);

  useEffect(() => {
    console.log(sendToPen.data);
    if (sendToPen?.data?.ReferenceID) {
      refetch();
    }
    console.log(data);

    console.log(userData);
    console.log(currentUser);
  }, [sendToPen, data, refetch, userData]);

  return isPending ? (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Summary</h2>
          <p className="my-4">
            Kindly verify all details provided before final submission.
          </p>

          <div className="flex gap-7 font-semibold">
            <Link href="/step-two" className="hover:underline">
              Personal Details
            </Link>
            <Link href="/step-three" className="hover:underline">
              Employment Record
            </Link>
            <Link href="/step-four" className="hover:underline">
              Next of Kin Record
            </Link>
            <Link href="/step-five" className="hover:underline">
              Document upload
            </Link>
          </div>

          <div>
            <h3 className="text-stanbic font-semibold mt-10 text-xl">
              Bio Data
            </h3>
            <Divider className="my-5" />

            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-x-20 sm:gap-y-8 gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Title</h3>
                <p>{userData?.result.title}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Surname</h3>
                <p>{userData?.result?.surname.toUpperCase()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">First Name</h3>
                <p>{userData?.result?.firstName.toUpperCase()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Marital Status</h3>
                <p>
                  {userData?.result?.maritalStatus === 1
                    ? 'Single'
                    : userData?.result?.maritalStatus === 2
                    ? 'Married'
                    : userData?.result?.maritalStatus === 3
                    ? 'Divorced'
                    : userData?.result?.maritalStatus === 4
                    ? 'Seperated'
                    : 'Widowed'}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Place of Birth</h3>
                <p>{userData?.result?.placeOfBirth}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Bank Verification Nnumber (BVN)
                </h3>
                <p>{userData?.result?.bvn}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  National Identity Nnumber (NIN)
                </h3>
                <p>{userData?.result?.nin}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Gender</h3>
                <p>{userData?.result?.gender === 1 ? 'Male' : 'Female'}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Bank Name</h3>
                <p>{userData?.result?.bankName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Bank Account Number</h3>
                <p>{userData?.result?.customerAccountNo}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-stanbic font-semibold mt-10 text-xl">
              Residential Address
            </h3>
            <Divider className="my-5" />

            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-x-20 sm:gap-y-8 gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Building No./Name</h3>
                <p>{userData?.result?.residenceHouseNameOrNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Street Name</h3>
                <p>{userData?.result?.residenceStreetName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Village/Town/City</h3>
                <p>{userData?.result?.residenceTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Country of Residence</h3>
                <p>{resCountryValue?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">State of Residence</h3>
                <p>{resStateValue?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correspondence Building No.</h3>
                <p>{userData?.result?.correspondenceHouseNameOrNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correpondence Street Address</h3>
                <p>{userData?.result?.correspondenceStreetName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Correpondence Village/City/Town
                </h3>
                <p>{userData?.result?.correspondenceTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correspodence Country</h3>
                <p>{corresCountry?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correpondence State</h3>
                <p>{corresState?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Correspodence Local Government
                </h3>
                <p>{corresLocal?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Mobile</h3>
                <p>{userData?.result?.phoneNumber}</p>
              </div>
              {/* <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Personal Email Address</h3>
                  <p>{userData?.result?.e}</p>
                </div> */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Statement Option</h3>
                <p>{userData?.result?.statementOption}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-stanbic font-semibold mt-10 text-xl">
              Employment Record
            </h3>
            <Divider className="my-5" />

            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-x-20 sm:gap-y-8 gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Sector Classification</h3>
                <p>RSA</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employment Name</h3>
                <p>{userData?.result?.employerName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Phone Number</h3>
                <p>{userData?.result?.employerPhoneNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Building Number/Name</h3>
                <p>{userData?.result?.employerBuildingNameOrNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Street Name</h3>
                <p>{userData?.result?.employerStreetName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Village/Town/City</h3>
                <p>{userData?.result?.employerTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer State</h3>
                <p>{employerState?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Local Government</h3>
                <p>{employerLocal?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Staff ID</h3>
                <p>{userData?.result?.staffFileNo}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-stanbic font-semibold mt-10 text-xl">
              Next of KIN Record
            </h3>
            <Divider className="my-5" />

            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-x-20 sm:gap-y-8 gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Title</h3>
                <p>{userData?.result?.nokTitle}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Gender</h3>
                <p>{userData?.result.nokGender === 1 ? 'Male' : 'Female'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Relationship</h3>
                <p>{userData?.result?.relationship}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Surname</h3>
                <p>{userData?.result?.nokSurname}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">First Name</h3>
                <p>{userData?.result?.nokFirstname}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Building No./Name</h3>
                <p>{userData?.result?.nokResidenceHouseNumber}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Street Name</h3>
                <p>{userData?.result?.nokResidenceStreetName}</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Village Town/City</h3>
                <p>{userData?.result?.nokResidenceTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Mobile No</h3>
                <p>{userData?.result?.nokPhoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="my-10">
            <Checkbox
              defaultChecked={checked}
              onChange={() => {
                setChecked((prev) => !prev);
              }}
              radius="sm"
              classNames={{
                label: ['text-sm'],
              }}
            >
              I hereby certify that the information provided in this form is
              correct. I further consent and authorize the National Identity
              Management Commission to release my NIN information (as may be
              required) to the National Pension Commission (PenCom), upon
              request by my Pension Fund Administrator, for the maintenance and
              operation of my Retirement Savings Account. It is my understanding
              that PenCom shall exercise due care to ensure that my information
              is secure and protected.
            </Checkbox>
          </div>

          <div className="flex justify-end">
            <Button
              isDisabled={!checked}
              radius="lg"
              className="font-inter font-semibold"
              color="primary"
              isLoading={sendToPen.isPending}
              onClick={() => {
                sendToPen.mutate(userData?.result?.no!);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) {
            setResponseCheck(false);
          }
        }}
        size="xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            Response from PENCOM
          </ModalHeader>
          <ModalBody className="pb-8">
            {isLoading && <Spinner />}
            <div>
              <p>
                <Link
                  className="my-3 cursor-pointer"
                  onClick={() => setResponseCheck((prev) => !prev)}
                >
                  Check full response
                </Link>
              </p>
              {responseCheck && data && data?.responseMessage && (
                <div className="px-4">
                  <ul className="font-inter font-medium list-disc">
                    {data.responseMessage
                      .filter((text) => text !== '')
                      .map((text, index) => (
                        <li key={index} className="text-red-600">
                          {text}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <IFooter />
    </>
  );
}
