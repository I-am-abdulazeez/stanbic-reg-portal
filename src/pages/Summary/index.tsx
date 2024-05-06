import { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import INavbar from 'src/components/INavbar';
import IFooter from 'src/components/IFooter';

import useStore from 'src/store';
import { useCustomerByDetails } from 'src/hooks/query/useCustomers';

export default function Summary() {
  const { stepFormData, currentUser } = useStore();
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const navigate = useNavigate();

  const { data: userData } = useCustomerByDetails(
    currentUser?.email,
    currentUser?.phoneNumber
  );

  function sendToPencom() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Submitted to PENCOM sucessfully!', {
        position: 'bottom-center',
      });
      onOpen();
    }, 5000);
  }

  useEffect(() => {
    console.log(stepFormData);
  }, [stepFormData]);

  return (
    <>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Summary</h2>
          <p className="my-4">
            Kindly verify all details provided before final submission.
          </p>

          <div>
            <h3 className="text-stanbic font-semibold mt-10 text-xl">
              Bio Data
            </h3>
            <Divider className="my-5" />

            <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-x-20 sm:gap-y-8 gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Title</h3>
                <p>{userData?.temporaryCustomer.title}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Surname</h3>
                <p>{userData?.temporaryCustomer?.surname.toUpperCase()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">First Name</h3>
                <p>{userData?.temporaryCustomer?.firstName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Marital Status</h3>
                <p>Single</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Place of Birth</h3>
                <p>{userData?.temporaryCustomer?.placeOfBirth}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Bank Verification Nnumber (BVN)
                </h3>
                <p>{userData?.temporaryCustomer?.bvn}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  National Identity Nnumber (NIN)
                </h3>
                <p>{userData?.temporaryCustomer?.nin}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Gender</h3>
                <p>Male</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Bank Name</h3>
                <p>{userData?.temporaryCustomer?.bankName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Bank Account Number</h3>
                <p>{userData?.temporaryCustomer?.customerAccountNo}</p>
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
                <p>{userData?.temporaryCustomer?.residenceHouseNameOrNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Street Name</h3>
                <p>{userData?.temporaryCustomer?.residenceStreetName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Village/Town/City</h3>
                <p>{userData?.temporaryCustomer?.residenceTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">State of Residence</h3>
                <p>{userData?.temporaryCustomer?.residenceState}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Country of Residence</h3>
                <p>{userData?.temporaryCustomer?.residenceCountry}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correspondence Building No.</h3>
                <p>
                  {userData?.temporaryCustomer?.correspondenceHouseNameOrNumber}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correpondence Street Address</h3>
                <p>{userData?.temporaryCustomer?.correspondenceStreetName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Correpondence Village/City/Town
                </h3>
                <p>{userData?.temporaryCustomer?.correspondenceTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correpondence State</h3>
                <p>{userData?.temporaryCustomer?.correspondenceState}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Correspodence Country</h3>
                <p>{userData?.temporaryCustomer?.correspondenceCountry}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Correspodence Local Government
                </h3>
                <p>
                  {
                    userData?.temporaryCustomer
                      ?.correspondenceLocalGovernmentCode
                  }
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Mobile</h3>
                <p>{userData?.temporaryCustomer?.phoneNumber}</p>
              </div>
              {/* <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Personal Email Address</h3>
                <p>{userData?.temporaryCustomer?.e}</p>
              </div> */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Statment Option</h3>
                <p>{userData?.temporaryCustomer?.stateOfPosting}</p>
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
                <h3 className="font-semibold">Employement Name</h3>
                <p>{userData?.temporaryCustomer?.employerName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Phone Number</h3>
                <p>{userData?.temporaryCustomer?.employerPhoneNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Building Number/Name</h3>
                <p>
                  {userData?.temporaryCustomer?.employerBuildingNameOrNumber}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Street Name</h3>
                <p>{userData?.temporaryCustomer?.employerStreetName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Village/Town/City</h3>
                <p>{userData?.temporaryCustomer?.employerTownCity}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer State</h3>
                <p>{userData?.temporaryCustomer?.employerState}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Employer Local Government</h3>
                <p>{userData?.temporaryCustomer?.employerLocalGovernment}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Staff ID</h3>
                <p>{userData?.temporaryCustomer?.staffFileNo}</p>
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
                <p>MR</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Gender</h3>
                <p>Male</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Relationship</h3>
                <p>BROTHER</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Surname</h3>
                <p>OLANREWAJU</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">First Name</h3>
                <p>MUBARAK</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Building No./Name</h3>
                <p>12</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Street Name</h3>
                <p>EUBA</p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Village Town/City</h3>
                <p>FADEYI</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Mobile No</h3>
                <p>08023143609</p>
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
              isLoading={isLoading}
              onClick={sendToPencom}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            PIN from PENCOM
          </ModalHeader>
          <ModalBody>
            <p className="font-inter font-semibold">PEN200007366363</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="font-semibold bg-black"
              radius="full"
              onClick={() => {
                navigator.clipboard.writeText('PEN200007366363').then(() => {
                  toast.success('PIN copied!');
                });
                setTimeout(() => {
                  onClose();
                  navigate('/');
                }, 1000);
              }}
            >
              Copy PIN
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <IFooter />
    </>
  );
}
