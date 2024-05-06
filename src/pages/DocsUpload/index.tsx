import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, Divider, Progress } from '@nextui-org/react';

import IFooter from 'src/components/IFooter';
import INavbar from 'src/components/INavbar';
import FileUpload from 'src/components/FileUpload';

import useStore from 'src/store';
import { DEFAULT_IMAGES } from 'src/data';
import { getBlobFromFile } from 'src/helpers';

import { useCreateImageMutation } from 'src/hooks/mutation/useCustMutations';

import { FileType, ImageUpload, base64Type } from 'src/types';

export default function DocsUpload() {
  const { currentUser } = useStore();
  const createImageMutation = useCreateImageMutation();

  const [_, setFiles] = useState<ImageUpload>({
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
        getBlobFromFile(file, setPassportString);
        break;
      case 'signature':
        getBlobFromFile(file, setSignatureString);
        break;
      case 'NIN':
        getBlobFromFile(file, setNINString);
        break;
      case 'POA':
        getBlobFromFile(file, setPOAString);
        break;
      case 'EOE':
        getBlobFromFile(file, setEOEString);
        break;
      default:
        break;
    }
  }

  function handleFileUpload() {
    const newData = {
      customerID: currentUser?.no,
      pictures: passportString,
      signatures: signatureString,
      ninSlips: NINString,
      proofOfIDs: POAString,
      letterOfAppointments: EOEString,
      ...DEFAULT_IMAGES,
    };
    console.log(newData);
    createImageMutation.mutate(newData);
  }

  useEffect(() => {
    console.log(currentUser);
    console.log(
      passportString,
      signatureString,
      NINString,
      POAString,
      EOEString
    );
  }, [
    passportString,
    signatureString,
    NINString,
    POAString,
    EOEString,
    currentUser,
  ]);
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
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="signature"
              label="Upload Signature"
              accept="image/*"
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="NIN"
              label="Upload NIN Slip / NIMC Card / NIN Evidence"
              accept="image/*"
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="POA"
              label="Upload Proof of Address (Staff Identity Card)"
              accept="image/*"
              onFileChange={(file, fileType) =>
                handleFileChange(file, fileType)
              }
            />
            <FileUpload
              fileType="EOE"
              label="Upload Evidence of Employment"
              accept="image/*"
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
            </div>
          </div>
        </div>
      </div>

      <IFooter />
    </>
  );
}
