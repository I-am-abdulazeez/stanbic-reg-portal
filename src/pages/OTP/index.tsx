import { Button, Input } from '@nextui-org/react';

import stanbic from '../../assets/stanbic-logo.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OTP() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateOTP = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate({
        pathname: '/step-one',
      });
    }, 2000);
  };

  return (
    <div className="flex items-center h-screen justify-center w-full">
      <div className="flex flex-col gap-6 font-inter sm:w-[350px] w-[280px]">
        <div className="flex items-center justify-center p-5 bg-stanbic rounded-md">
          <img src={stanbic} alt="Stanbic_ibtc_logo" className="w-52" />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center">
            Enter Verification Code
          </h3>
          <p className="font-medium mt-3 text-sm">
            The data you provide in this form is sensitive. We want to do all we
            can to make sure it is safe
          </p>
        </div>

        <Input
          type="text"
          label="Enter OTP"
          placeholder="Enter code sent to your phone number"
          isRequired
          radius="sm"
          className="font-inter font-medium text-xl"
          classNames={{
            inputWrapper: ['border-1 border-solid border-grey-900'],
          }}
        />

        <Button
          color="primary"
          className="font-semibold font-inter"
          radius="sm"
          onClick={validateOTP}
          isLoading={isLoading}
        >
          {isLoading ? 'Loading' : 'Validate OTP'}
        </Button>

        <div className="text-center">
          <p className="font-inter font-semibold text-sm">
            I Did not recieve a code?{' '}
            <span className="text-stanbic  hover:underline hover:cursor-pointer">
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
