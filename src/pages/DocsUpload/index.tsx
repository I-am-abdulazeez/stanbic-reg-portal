import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, Divider, Progress } from '@nextui-org/react';

import IFooter from 'src/components/IFooter';
import INavbar from 'src/components/INavbar';
import FileUpload from 'src/components/FileUpload';

import useStore from 'src/store';
import { DEFAULT_IMAGES } from 'src/data';
import { getBlobFromFile, getFileFromBlob } from 'src/helpers';

import { useCustomerImage } from 'src/hooks/query/useCustomers';
import {
  useCreateImageMutation,
  useUpdateImageMutation,
} from 'src/hooks/mutation/useCustMutations';

import { FileType, ImageUpload, base64Type } from 'src/types';

export default function DocsUpload() {
  const { currentUser, currentUserDocs } = useStore();
  const custData = useCustomerImage(currentUser?.imageId, currentUser?.no);

  const createImageMutation = useCreateImageMutation();
  const updateImageMutation = useUpdateImageMutation();

  const [files, setFiles] = useState<ImageUpload>({
    passportFile: null,
    signatureFile: null,
    NINFile: null,
    POAFile: null,
    EOEFile: null,
  });

  const [passportString, setPassportString] = useState<base64Type>(null);
  const [signatureString, setSignatureString] = useState<base64Type>(null);
  const [NINString, setNINString] = useState<base64Type>(null);
  const [POAString, setPOAString] = useState<base64Type>(null);
  const [EOEString, setEOEString] = useState<base64Type>(null);

  const navigate = useNavigate();

  function handleFileChange(file: File, fileType: FileType) {
    setFiles((prevState) => ({
      ...prevState,
      [fileType]: file,
    }));
    switch (fileType) {
      case 'passport':
        getBlobFromFile(file, setPassportString, 'picture');
        break;
      case 'signature':
        getBlobFromFile(file, setSignatureString, 'signatures');
        break;
      case 'NIN':
        getBlobFromFile(file, setNINString, 'ninSlips');
        break;
      case 'POA':
        getBlobFromFile(file, setPOAString, 'proofOfIDs');
        break;
      case 'EOE':
        getBlobFromFile(file, setEOEString, 'letterOfAppointments');
        break;
      default:
        break;
    }
  }

  function handleFileUpload() {
    const DbPassport =
      String(passportString).split(',')[1] ||
      String((custData?.data?.temporaryImages[0] as any).picture);
    const DbSignature =
      String(signatureString).split(',')[1] ||
      String((custData?.data?.temporaryImages[0] as any).signature);
    const DbNIN =
      String(NINString).split(',')[1] ||
      String((custData?.data?.temporaryImages[0] as any).ninSlip);
    const DbPOA =
      String(POAString).split(',')[1] ||
      String((custData?.data?.temporaryImages[0] as any).proofOfID);
    const DbEOE =
      String(EOEString).split(',')[1] ||
      String((custData?.data?.temporaryImages[0] as any).letterOfAppointment);

    const newData = {
      customerID: currentUser?.no,
      pictures: DbPassport,
      signatures: DbSignature,
      ninSlips: DbNIN,
      proofOfIDs: DbPOA,
      letterOfAppointments: DbEOE,
      ...DEFAULT_IMAGES,
    };

    const updateData = {
      id: currentUser?.imageId,
      customerID: currentUser?.no,
      pictures: DbPassport,
      signatures: DbSignature,
      ninSlips: DbNIN,
      proofOfIDs: DbPOA,
      letterOfAppointments: DbEOE,
      ...DEFAULT_IMAGES,
    };

    if (!currentUser?.imageId || currentUser?.imageId === 0) {
      createImageMutation.mutate(newData);
    } else {
      console.log(updateData);
      updateImageMutation.mutate(updateData);
    }
  }

  useEffect(() => {
    if (currentUser?.imageId !== null || currentUser?.imageId === 0) {
      if (currentUser?.no === custData?.data?.temporaryImages[0].customerID) {
        const defaultPassport = getFileFromBlob(
          String(currentUserDocs?.picture),
          'passport'
        );
        const defaultSignature = getFileFromBlob(
          String(currentUserDocs.signatures),
          'signature'
        );
        const defaultNIN = getFileFromBlob(
          String(currentUserDocs.ninSlips),
          'NIN'
        );
        const defaultPOA = getFileFromBlob(
          String(currentUserDocs.proofOfIDs),
          'POA'
        );
        const defaultEOE = getFileFromBlob(
          String(currentUserDocs.letterOfAppointments),
          'EOE'
        );

        setFiles({
          passportFile: defaultPassport,
          signatureFile: defaultSignature,
          NINFile: defaultNIN,
          POAFile: defaultPOA,
          EOEFile: defaultEOE,
        });
      }
    }
    console.log(currentUserDocs);
    console.log(custData?.data);
    console.log(currentUser);
  }, [currentUser, currentUserDocs, custData?.data]);
  return (
    <>
      <div className="font-inter min-h-screen">
        <INavbar />
        <Divider className="my-2 mx-auto max-w-[980px]" />

        <div className="max-w-[980px] mx-auto my-5 px-5 sm:px-0">
          <h2 className="text-3xl font-semibold mt-10">Upload Images</h2>
          <p className="my-4">
            Upload all specified images here{' '}
            <span className="text-red-500">(All are mandatory)</span>
          </p>

          <Progress
            aria-label="Loading..."
            value={100}
            className="mt-10 mb-7"
          />

          <div className="grid sm:grid-cols-3 grid-cols-1 gap-8">
            <FileUpload
              fileType="passport"
              label="Upload Passport"
              accept="image/*"
              defaultFile={files.passportFile}
              onFileChange={(file, fileType) => {
                handleFileChange(file, fileType);
              }}
            />
            <FileUpload
              fileType="signature"
              label="Upload Signature"
              accept="image/*"
              defaultFile={files.signatureFile}
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="NIN"
              label="Upload NIN Slip / NIMC Card / NIN Evidence"
              accept="image/*"
              defaultFile={files.NINFile}
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="POA"
              label="Upload Proof of Address (Staff Identity Card)"
              accept="image/*"
              defaultFile={files.POAFile}
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="EOE"
              label="Upload Evidence of Employment"
              accept="image/*"
              defaultFile={files.EOEFile}
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
          </div>
          <div className="flex gap-3 justify-between mt-6">
            <Button
              color="default"
              radius="lg"
              className="font-inter font-semibold"
              onClick={() =>
                navigate({
                  pathname: '/step-four',
                })
              }
            >
              Go back
            </Button>
            <div className="flex gap-4 justify-end">
              {/* <Button
                color="primary"
                radius="lg"
                className="font-inter font-semibold"
              >
                Save
              </Button> */}
              {!currentUser?.imageId ||
              currentUser?.imageId === 0 ||
              currentUserDocs.picture === '' ? (
                <Button
                  radius="lg"
                  onClick={handleFileUpload}
                  isDisabled={
                    !passportString ||
                    !signatureString ||
                    !NINString ||
                    !POAString ||
                    !EOEString
                  }
                  isLoading={createImageMutation.isPending}
                  color="primary"
                  className="font-inter font-semibold bg-black"
                >
                  Next
                </Button>
              ) : (
                <Button
                  radius="lg"
                  onClick={handleFileUpload}
                  color="primary"
                  className="font-inter font-semibold bg-black"
                  isLoading={updateImageMutation?.isPending}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <IFooter />
    </>
  );
}
