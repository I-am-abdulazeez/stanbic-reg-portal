import { DateValue } from '@nextui-org/react';

export type NigeriaOrAbroadType = 'N' | 'A';

export type RegFormType = {
  no: number;
  registrationType: number;
  temporaryPin: string;
  nin: string;
  bvn: string;
  phoneNumber: string;
  phoneNumber2: string;
  title: string;
  surname: string;
  firstName: string;
  middleName: string;
  maidenOrFormerName: string;
  gender: number;
  maritalStatus: number;
  nationality: string;
  stateOfOrigin: string;
  localGovernmentOfOrigin: string;
  dateOfBirth: DateValue;
  placeOfBirth: string;
  email: string;
  poBox: string;
  nigeriaOrAbroad: NigeriaOrAbroadType;
  residenceCountry: string;
  residenceState: string;
  residenceLocalGovernmentCode: string;
  residenceTownCity: string;
  residenceStreetName: string;
  residenceHouseNameOrNumber: string;
  residenceZipCode: string;
  employerCode: string;
  sectorClass: string;
  employerNigeriaOrAbroad: NigeriaOrAbroadType;
  employerCountry: string;
  employerState: string;
  employerLocalGovernment: string;
  employerTownCity: string;
  employerStreetName: string;
  employerBuildingNameOrNumber: string;
  employerZipCode: string;
  employerPOBox: string;
  employerPhoneNumber: string;
  employerNatureOfBusiness: string;
  dateOfFirstAppointment: DateValue;
  dateOfCurrentEmployment: DateValue;
  nokTitle: string;
  nokGender: number;
  nokSurname: string;
  nokFirstname: string;
  nokMiddlename: string;
  relationship: string;
  nokNigeriaOrAbroad: NigeriaOrAbroadType;
  nokResidenceCountry: string;
  nokResidenceState: string;
  nokResidenceLocalGovernment: string;
  nokResidenceTownCity: string;
  nokResidenceStreetName: string;
  nokResidenceHouseNumber: string;
  nokZipCode: string;
  nokpoBox: string;
  nokEmail: string;
  nokPhoneNumber: string;
  employerName: string;
  designation: string;
  staffFileNo: string;
  statementOption: string;
  fundid: string;
  movedToClient: number;
  dateTimeMoved: string;
  movedToCRM: number;
  dateTimeCRM: string;
  crmid: string;
  customerID: string;
  registrationChannels: string;
  movedtoSharepoint: number;
  sharepointUrl: string;
  agentCode: string;
  loggedBy: string;
  datetimeLogged: string;
  status: number;
  emailSent: number;
  smsSent: number;
  registrationCode: string;
  select: number;
  selectBy: string;
  lastSetID: string;
  lastPencomError: string;
  pencomApproved: number;
  pinDate: string;
  fundType: number;
  rejectionDescription: string;
  rejectionCode: string;
  rejectionComment: string;
  correspondenceCountry: string;
  correspondenceState: string;
  correspondenceLocalGovernmentCode: string;
  correspondenceTownCity: string;
  correspondenceStreetName: string;
  correspondenceHouseNameOrNumber: string;
  correspondenceZipCode: string;
  stateOfPosting: string;
  employeeStatus: string;
  transferredStatus: number;
  bankName: string;
  customerBankName: string;
  bankSortCode: string;
  isIPPIS: number;
  ippisNumber: string;
  formReferenceNo: string;
  currentGradeLevel: string;
  currentStep: string;
  customerAccountNo: string;
  lastModifiedDate: string;
  mortgage: number;
  homeOwner: number;
  newslettersSubscription: number;
  dateOfTransferService: string;
  dateJoinedIPPIS: string;
  step04: string;
  grade04: string;
  scale04: string;
  step07: string;
  grade07: string;
  scale07: string;
  step10: string;
  grade10: string;
  scale10: string;
  step13: string;
  grade13: string;
  scale13: string;
  step16: string;
  grade16: string;
  scale16: string;
  stepCurrent: string;
  gradeCurrent: string;
  scaleCurrent: string;
  crmCaseID: string;
  clientNo: string;
  armClient: number;
  communicationPreference: string;
  clientWeddingAnniversary: string;
  kycCompleted: number;
  employmentDocument: number;
  reprocessCount: number;
  virtualNIN: string;
  ninUserID: string;
};

export type OmitNo = Omit<RegFormType, 'no'>;

export type StepOneData = Pick<RegFormType, 'sectorClass'>;

export type StepTwoData = Pick<
  RegFormType,
  | 'firstName'
  | 'surname'
  | 'email'
  | 'phoneNumber'
  | 'residenceState'
  | 'dateOfBirth'
  | 'title'
  | 'middleName'
  | 'gender'
  | 'placeOfBirth'
  | 'maritalStatus'
  | 'nationality'
  | 'stateOfOrigin'
  | 'localGovernmentOfOrigin'
  | 'maidenOrFormerName'
  | 'nin'
  | 'residenceHouseNameOrNumber'
  | 'residenceStreetName'
  | 'residenceTownCity'
  | 'residenceZipCode'
  | 'poBox'
  | 'residenceCountry'
  | 'residenceLocalGovernmentCode'
  | 'correspondenceHouseNameOrNumber'
  | 'correspondenceStreetName'
  | 'correspondenceTownCity'
  | 'correspondenceZipCode'
  | 'correspondenceCountry'
  | 'correspondenceState'
  | 'correspondenceLocalGovernmentCode'
  | 'bankName'
  | 'customerAccountNo'
  | 'bvn'
  | 'statementOption'
>;

export type StepThreeData = Pick<
  RegFormType,
  | 'employerName'
  | 'employerBuildingNameOrNumber'
  | 'employerCountry'
  | 'employerLocalGovernment'
  | 'employerPOBox'
  | 'employerPhoneNumber'
  | 'employerState'
  | 'employerStreetName'
  | 'employerTownCity'
  | 'employerZipCode'
  | 'staffFileNo'
  | 'dateOfFirstAppointment'
  | 'dateOfCurrentEmployment'
  | 'currentGradeLevel'
  | 'currentStep'
  | 'employerCode'
  | 'designation'
>;

export type StepFourData = Pick<
  RegFormType,
  | 'nokTitle'
  | 'nokEmail'
  | 'nokFirstname'
  | 'nokSurname'
  | 'nokMiddlename'
  | 'nokPhoneNumber'
  | 'nokResidenceCountry'
  | 'nokResidenceHouseNumber'
  | 'nokResidenceState'
  | 'nokResidenceLocalGovernment'
  | 'nokResidenceTownCity'
  | 'nokpoBox'
  | 'nokZipCode'
  | 'nokResidenceStreetName'
  | 'nokGender'
  | 'relationship'
>;

export type formStepData = Omit<
  RegFormType,
  'dateOfBirth' | 'dateOfFirstAppointment' | 'no' | 'dateOfCurrentEmployment'
> & {
  dateOfBirth: string | undefined;
  dateOfFirstAppointment: string | undefined;
  dateOfCurrentEmployment: string | undefined;
};

export type IStoreState = {
  currentRoute: string;
  currentUser: CurrentCustomer & {
    imageId: number | null;
    ReferenceID: string;
  };
  currentUserDocs: StoreDocumentUploadType;

  stepFormData: formStepData;
};

export type StoreDocumentUploadType = {
  picture: base64Type;
  signatures: base64Type;
  ninSlips: base64Type;
  proofOfIDs: base64Type;
  letterOfAppointments: base64Type;
  ninConsent: base64Type;
  piDs: base64Type;
  birthCertificates: base64Type;
  rsaPage1s: base64Type;
  rsaPage2s: base64Type;
  expatraiteDocuments: base64Type;
  transferAcceptanceServices: base64Type;
  promotionLetterSlips: base64Type;
  promotionLetterSlip04s: base64Type;
  promotionLetterSlip07s: base64Type;
  promotionLetterSlip10s: base64Type;
  promotionLetterSlip13s: base64Type;
  promotionLetterSlip16s: base64Type;
  fullPictures: base64Type;
  employerConfirmationDocs: base64Type;
  fingerprintDocuments: base64Type;
  letterOfIndemenitys: base64Type;
};

export type IStoreActions = {
  setCurrentRoute: (route: string) => void;
  setCurrentUser: (user: CurrentCustomer & { imageId: number | null }) => void;
  setStepFormData: (data: formStepData) => void;

  setCurrentUserDocs: (data: StoreDocumentUploadType) => void;
};

export type FileType = 'passport' | 'signature' | 'NIN' | 'POA' | 'EOE';

export type UserDetails = Pick<RegFormType, 'email' | 'phoneNumber'>;

export type ExistingCustomer = {
  status: number;
  result: RegFormType;
  imageID: number;
};

export type CurrentCustomer = UserDetails & {
  no: number | null;
};

export type TempPostImage = {
  status: number;
  message: string;
  imageId: number;
};

export type TempPostData = CurrentCustomer & {
  message: string;
  status: number;
};

export type base64Type = string | ArrayBuffer | null;

export type ImageIDs = Pick<DocumentUploadType, 'customerID' | 'id'>;

export type DocumentUploadType = {
  id: number | null;
  customerID: number | null;
  ninConsents: string;
  clientImages: string;
  piDs: string;
  birthCertificates: string;
  rsaPage1s: string;
  rsaPage2s: string;
  statuss: number;
  expatraiteDocuments: string;
  transferAcceptanceServices: string;
  promotionLetterSlips: string;
  promotionLetterSlip04s: string;
  promotionLetterSlip07s: string;
  promotionLetterSlip10s: string;
  promotionLetterSlip13s: string;
  promotionLetterSlip16s: string;
  fullPictures: string;
  employerConfirmationDocs: string;
  fingerprintDocuments: string;
  letterOfIndemenitys: string;
  pictures: base64Type;
  signatures: base64Type;
  ninSlips: base64Type;
  proofOfIDs: base64Type;
  letterOfAppointments: base64Type;
};

export type ImageUpload = {
  passportFile: File | null;
  signatureFile: File | null;
  NINFile: File | null;
  POAFile: File | null;
  EOEFile: File | null;
};

// Component Props
export type FileUploadProps = {
  fileType: FileType;
  label: string;
  accept: string;
  onFileChange: (file: File, fileType: FileType) => void;
  defaultFile: File | null;
};

export type CountryType = {
  code: string;
  name: string;
};

export type EmployerType = {
  pencomCodeID: string;
  pencomEmployerName: string;
  pencomSectorCode: string;
  name: string;
};

export type PencomResponseType = {
  setId: null | string;
  sn: string;
  pin: string;
  nin: string;
  responseCode: string[];
  responseMessage: string[];
};
