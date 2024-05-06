import { DateValue } from '@nextui-org/react';

import { DocumentUploadType, StepOneData, StepTwoData } from 'src/types';

export const INPUT_STYLES = ['border-1 border-solid border-grey-900'];

export const API_URL = 'http://localhost:5000/api';

export const TEMPCUST_API = `${API_URL}/TemporaryCustomer`;
export const TEMPIMAGE_API = `${API_URL}/TemporaryImage`;

export const NOK_RELATIONSHIP = [
  'AUNT',
  'BROTHER',
  'COUSIN',
  'DAUGHTER',
  'FATHER',
  'HUSBAND',
  'MOTHER',
  'NEPHEW',
  'NIECE',
  'SISTER',
  'SON',
  'SPOUSE',
  'UNCLE',
  'WIFE',
];

export const MARITAL_STATUS = [
  'Single',
  'Married',
  'Divorced',
  'Separated',
  'Widowed',
];

export const CUSTOMER_TITLE = ['MISS', 'MR', 'MRS', 'MS'];

export const STATEMENT_OPTION = [
  'Email',
  'Hard Copy',
  'Email & Hard Copy',
  'No Statement',
  'SMS',
  'WhatsApp',
];

export const FORM_INIT_VALUES = {
  no: 0,
  registrationType: 0,
  temporaryPin: '',
  nin: '',
  bvn: '',
  phoneNumber: '',
  phoneNumber2: '',
  title: '',
  surname: '',
  firstName: '',
  middleName: '',
  maidenOrFormerName: '',
  gender: 0,
  maritalStatus: 0,
  nationality: '',
  stateOfOrigin: '',
  localGovernmentOfOrigin: '',
  dateOfBirth: null as unknown as DateValue,
  placeOfBirth: '',
  email: '',
  poBox: '',
  nigeriaOrAbroad: '',
  residenceCountry: '',
  residenceState: '',
  residenceLocalGovernmentCode: '',
  residenceTownCity: '',
  residenceStreetName: '',
  residenceHouseNameOrNumber: '',
  residenceZipCode: '',
  employerCode: '',
  sectorClass: '',
  employerNigeriaOrAbroad: '',
  employerCountry: '',
  employerState: '',
  employerLocalGovernment: '',
  employerTownCity: '',
  employerStreetName: '',
  employerBuildingNameOrNumber: '',
  employerZipCode: '',
  employerPOBox: '',
  employerPhoneNumber: '',
  employerNatureOfBusiness: '',
  dateOfFirstAppointment: null as unknown as DateValue,
  dateOfCurrentEmployment: null as unknown as DateValue,
  nokTitle: '',
  nokGender: 0,
  nokSurname: '',
  nokFirstname: '',
  nokMiddlename: '',
  relationship: '',
  nokNigeriaOrAbroad: '',
  nokResidenceCountry: '',
  nokResidenceState: '',
  nokResidenceLocalGovernment: '',
  nokResidenceTownCity: '',
  nokResidenceStreetName: '',
  nokResidenceHouseNumber: '',
  nokZipCode: '',
  nokpoBox: '',
  nokEmail: '',
  nokPhoneNumber: '',
  employerName: '',
  designation: '',
  staffFileNo: '',
  statementOption: '',
  fundid: '',
  movedToClient: 0,
  dateTimeMoved: '',
  movedToCRM: 0,
  dateTimeCRM: '',
  crmid: '',
  customerID: '',
  registrationChannels: '',
  movedtoSharepoint: 0,
  sharepointUrl: '',
  agentCode: '',
  loggedBy: '',
  datetimeLogged: '',
  status: 0,
  emailSent: 0,
  smsSent: 0,
  registrationCode: '',
  select: 0,
  selectBy: '',
  lastSetID: '',
  lastPencomError: '',
  pencomApproved: 0,
  pinDate: '',
  fundType: 0,
  rejectionDescription: '',
  rejectionCode: '',
  rejectionComment: '',
  correspondenceCountry: '',
  correspondenceState: '',
  correspondenceLocalGovernmentCode: '',
  correspondenceTownCity: '',
  correspondenceStreetName: '',
  correspondenceHouseNameOrNumber: '',
  correspondenceZipCode: '',
  stateOfPosting: '',
  employeeStatus: '',
  transferredStatus: 0,
  bankName: '',
  customerBankName: '',
  bankSortCode: '',
  isIPPIS: 0,
  ippisNumber: '',
  formReferenceNo: '',
  currentGradeLevel: '',
  currentStep: '',
  customerAccountNo: '',
  lastModifiedDate: '',
  mortgage: 0,
  homeOwner: 0,
  newslettersSubscription: 0,
  dateOfTransferService: '',
  dateJoinedIPPIS: '',
  step04: '',
  grade04: '',
  scale04: '',
  step07: '',
  grade07: '',
  scale07: '',
  step10: '',
  grade10: '',
  scale10: '',
  step13: '',
  grade13: '',
  scale13: '',
  step16: '',
  grade16: '',
  scale16: '',
  stepCurrent: '',
  gradeCurrent: '',
  scaleCurrent: '',
  crmCaseID: '',
  clientNo: '',
  armClient: 0,
  communicationPreference: '',
  clientWeddingAnniversary: '',
  kycCompleted: 0,
  employmentDocument: 0,
  reprocessCount: 0,
  virtualNIN: '',
  ninUserID: '',
};

export const STORE_FORM_INIT_VALUES = {
  registrationType: 0,
  temporaryPin: '',
  nin: '',
  bvn: '',
  phoneNumber: '',
  phoneNumber2: '',
  title: '',
  surname: '',
  firstName: '',
  middleName: '',
  maidenOrFormerName: '',
  gender: 0,
  maritalStatus: 0,
  nationality: '',
  stateOfOrigin: '',
  localGovernmentOfOrigin: '',
  dateOfBirth: '',
  placeOfBirth: '',
  email: '',
  poBox: '',
  nigeriaOrAbroad: '',
  residenceCountry: '',
  residenceState: '',
  residenceLocalGovernmentCode: '',
  residenceTownCity: '',
  residenceStreetName: '',
  residenceHouseNameOrNumber: '',
  residenceZipCode: '',
  employerCode: '',
  sectorClass: '',
  employerNigeriaOrAbroad: '',
  employerCountry: '',
  employerState: '',
  employerLocalGovernment: '',
  employerTownCity: '',
  employerStreetName: '',
  employerBuildingNameOrNumber: '',
  employerZipCode: '',
  employerPOBox: '',
  employerPhoneNumber: '',
  employerNatureOfBusiness: '',
  dateOfFirstAppointment: '',
  dateOfCurrentEmployment: '',
  nokTitle: '',
  nokGender: 0,
  nokSurname: '',
  nokFirstname: '',
  nokMiddlename: '',
  relationship: '',
  nokNigeriaOrAbroad: '',
  nokResidenceCountry: '',
  nokResidenceState: '',
  nokResidenceLocalGovernment: '',
  nokResidenceTownCity: '',
  nokResidenceStreetName: '',
  nokResidenceHouseNumber: '',
  nokZipCode: '',
  nokpoBox: '',
  nokEmail: '',
  nokPhoneNumber: '',
  employerName: '',
  designation: '',
  staffFileNo: '',
  statementOption: '',
  fundid: '',
  movedToClient: 0,
  dateTimeMoved: '',
  movedToCRM: 0,
  dateTimeCRM: '',
  crmid: '',
  customerID: '',
  registrationChannels: '',
  movedtoSharepoint: 0,
  sharepointUrl: '',
  agentCode: '',
  loggedBy: '',
  datetimeLogged: '',
  status: 0,
  emailSent: 0,
  smsSent: 0,
  registrationCode: '',
  select: 0,
  selectBy: '',
  lastSetID: '',
  lastPencomError: '',
  pencomApproved: 0,
  pinDate: '',
  fundType: 0,
  rejectionDescription: '',
  rejectionCode: '',
  rejectionComment: '',
  correspondenceCountry: '',
  correspondenceState: '',
  correspondenceLocalGovernmentCode: '',
  correspondenceTownCity: '',
  correspondenceStreetName: '',
  correspondenceHouseNameOrNumber: '',
  correspondenceZipCode: '',
  stateOfPosting: '',
  employeeStatus: '',
  transferredStatus: 0,
  bankName: '',
  customerBankName: '',
  bankSortCode: '',
  isIPPIS: 0,
  ippisNumber: '',
  formReferenceNo: '',
  currentGradeLevel: '',
  currentStep: '',
  customerAccountNo: '',
  lastModifiedDate: '',
  mortgage: 0,
  homeOwner: 0,
  newslettersSubscription: 0,
  dateOfTransferService: '',
  dateJoinedIPPIS: '',
  step04: '',
  grade04: '',
  scale04: '',
  step07: '',
  grade07: '',
  scale07: '',
  step10: '',
  grade10: '',
  scale10: '',
  step13: '',
  grade13: '',
  scale13: '',
  step16: '',
  grade16: '',
  scale16: '',
  stepCurrent: '',
  gradeCurrent: '',
  scaleCurrent: '',
  crmCaseID: '',
  clientNo: '',
  armClient: 0,
  communicationPreference: '',
  clientWeddingAnniversary: '',
  kycCompleted: 0,
  employmentDocument: 0,
  reprocessCount: 0,
  virtualNIN: '',
  ninUserID: '',
};

export const DEFAULT_FORM_VALUES = {
  registrationType: 1,
  temporaryPin: 'PEN1000000000000',
  nin: '24444444444',
  bvn: '24444444444',
  phoneNumber2: '',
  title: '',
  middleName: '',
  maidenOrFormerName: '',
  gender: 0,
  maritalStatus: 0,
  nationality: '',
  stateOfOrigin: '',
  localGovernmentOfOrigin: '',
  placeOfBirth: '',
  poBox: '',
  residenceCountry: '',
  residenceLocalGovernmentCode: '',
  residenceTownCity: '',
  residenceStreetName: '',
  residenceHouseNameOrNumber: '',
  residenceZipCode: '',
  employerCode: '',
  sectorClass: '',
  employerCountry: '',
  employerState: '',
  employerLocalGovernment: '',
  employerTownCity: '',
  employerStreetName: '',
  employerBuildingNameOrNumber: '',
  employerZipCode: '',
  employerPOBox: '',
  employerPhoneNumber: '',
  employerNatureOfBusiness: '',
  dateOfFirstAppointment: '1999-12-03T23:00:00.000Z',
  dateOfCurrentEmployment: '1999-12-03T23:00:00.000Z',
  nokTitle: '',
  nokGender: 0,
  nokSurname: '',
  nokFirstname: '',
  nokMiddlename: '',
  relationship: '',
  nokResidenceCountry: '',
  nokResidenceState: '',
  nokResidenceLocalGovernment: '',
  nokResidenceTownCity: '',
  nokResidenceStreetName: '',
  nokResidenceHouseNumber: '',
  nokZipCode: '',
  nokpoBox: '',
  nokEmail: '',
  nokPhoneNumber: '',
  employerName: '',
  designation: '',
  staffFileNo: '',
  statementOption: '',
  fundid: '',
  movedToClient: 0,
  dateTimeMoved: '1999-12-03T23:00:00.000Z',
  movedToCRM: 0,
  dateTimeCRM: '1999-12-03T23:00:00.000Z',
  crmid: '',
  customerID: '',
  registrationChannels: '',
  movedtoSharepoint: 0,
  sharepointUrl: '',
  agentCode: '',
  loggedBy: '',
  datetimeLogged: '1999-12-03T23:00:00.000Z',
  status: 0,
  emailSent: 0,
  smsSent: 0,
  registrationCode: '',
  select: 0,
  selectBy: '',
  lastSetID: '',
  lastPencomError: '',
  pencomApproved: 0,
  pinDate: '1999-12-03T23:00:00.000Z',
  fundType: 0,
  rejectionDescription: '',
  rejectionCode: '',
  rejectionComment: '',
  correspondenceCountry: '',
  correspondenceState: '',
  correspondenceLocalGovernmentCode: '',
  correspondenceTownCity: '',
  correspondenceStreetName: '',
  correspondenceHouseNameOrNumber: '',
  correspondenceZipCode: '',
  stateOfPosting: '',
  employeeStatus: '',
  transferredStatus: 0,
  bankName: '',
  customerBankName: '',
  bankSortCode: '',
  isIPPIS: 0,
  ippisNumber: '',
  formReferenceNo: '',
  currentGradeLevel: '',
  currentStep: '',
  customerAccountNo: '',
  lastModifiedDate: '1999-12-03T23:00:00.000Z',
  mortgage: 0,
  homeOwner: 0,
  newslettersSubscription: 0,
  dateOfTransferService: '1999-12-03T23:00:00.000Z',
  dateJoinedIPPIS: '1999-12-03T23:00:00.000Z',
  step04: '',
  grade04: '',
  scale04: '',
  step07: '',
  grade07: '',
  scale07: '',
  step10: '',
  grade10: '',
  scale10: '',
  step13: '',
  grade13: '',
  scale13: '',
  step16: '',
  grade16: '',
  scale16: '',
  stepCurrent: '',
  gradeCurrent: '',
  scaleCurrent: '',
  crmCaseID: '',
  clientNo: '',
  armClient: 0,
  communicationPreference: '',
  clientWeddingAnniversary: '1999-12-03T23:00:00.000Z',
  kycCompleted: 0,
  employmentDocument: 0,
  reprocessCount: 0,
  virtualNIN: '',
  ninUserID: '',
};

export const NEW_VALUES = {
  registrationType: 1,
  temporaryPin: 'PEN1000000000000',
  nin: '',
  bvn: '',
  phoneNumber2: '',
  title: '',
  middleName: '',
  maidenOrFormerName: '',
  nationality: '',
  stateOfOrigin: '',
  localGovernmentOfOrigin: '',
  placeOfBirth: '',
  poBox: '',
  residenceCountry: '',
  residenceLocalGovernmentCode: '',
  residenceTownCity: '',
  residenceStreetName: '',
  residenceHouseNameOrNumber: '',
  residenceZipCode: '',
  employerCode: '',
  sectorClass: '',
  employerCountry: '',
  employerState: '',
  employerLocalGovernment: '',
  employerTownCity: '',
  employerStreetName: '',
  employerBuildingNameOrNumber: '',
  employerZipCode: '',
  employerPOBox: '',
  employerPhoneNumber: '',
  employerNatureOfBusiness: '',
  dateOfFirstAppointment: '1999-12-03T23:00:00.000Z',
  dateOfCurrentEmployment: '1999-12-03T23:00:00.000Z',
  nokTitle: '',
  nokSurname: '',
  nokFirstname: '',
  nokMiddlename: '',
  relationship: '',
  nokResidenceCountry: '',
  nokResidenceState: '',
  nokResidenceLocalGovernment: '',
  nokResidenceTownCity: '',
  nokResidenceStreetName: '',
  nokResidenceHouseNumber: '',
  nokZipCode: '',
  nokpoBox: '',
  nokEmail: '',
  nokPhoneNumber: '',
  employerName: '',
  designation: '',
  staffFileNo: '',
  statementOption: '',
  fundid: '',
  movedToClient: 0,
  dateTimeMoved: '1999-12-03T23:00:00.000Z',
  movedToCRM: 0,
  dateTimeCRM: '1999-12-03T23:00:00.000Z',
  crmid: '',
  customerID: '',
  registrationChannels: '',
  movedtoSharepoint: 0,
  sharepointUrl: '',
  agentCode: '',
  loggedBy: '',
  datetimeLogged: '1999-12-03T23:00:00.000Z',
  status: 0,
  emailSent: 0,
  smsSent: 0,
  registrationCode: '',
  select: 0,
  selectBy: '',
  lastSetID: '',
  lastPencomError: '',
  pencomApproved: 0,
  pinDate: '1999-12-03T23:00:00.000Z',
  fundType: 0,
  rejectionDescription: '',
  rejectionCode: '',
  rejectionComment: '',
  correspondenceCountry: '',
  correspondenceState: '',
  correspondenceLocalGovernmentCode: '',
  correspondenceTownCity: '',
  correspondenceStreetName: '',
  correspondenceHouseNameOrNumber: '',
  correspondenceZipCode: '',
  stateOfPosting: '',
  employeeStatus: '',
  transferredStatus: 0,
  bankName: '',
  customerBankName: '',
  bankSortCode: '',
  isIPPIS: 0,
  ippisNumber: '',
  formReferenceNo: '',
  currentGradeLevel: '',
  currentStep: '',
  customerAccountNo: '',
  lastModifiedDate: '1999-12-03T23:00:00.000Z',
  mortgage: 0,
  homeOwner: 0,
  newslettersSubscription: 0,
  dateOfTransferService: '1999-12-03T23:00:00.000Z',
  dateJoinedIPPIS: '1999-12-03T23:00:00.000Z',
  step04: '',
  grade04: '',
  scale04: '',
  step07: '',
  grade07: '',
  scale07: '',
  step10: '',
  grade10: '',
  scale10: '',
  step13: '',
  grade13: '',
  scale13: '',
  step16: '',
  grade16: '',
  scale16: '',
  stepCurrent: '',
  gradeCurrent: '',
  scaleCurrent: '',
  crmCaseID: '',
  clientNo: '',
  armClient: 0,
  communicationPreference: '',
  clientWeddingAnniversary: '1999-12-03T23:00:00.000Z',
  kycCompleted: 0,
  employmentDocument: 0,
  reprocessCount: 0,
  virtualNIN: '',
  ninUserID: '',
};

export const STEP_ONE_INIT_VALUES: StepOneData = {
  sectorClass: '',
};

export const STEP_TWO_INIT_VALUES: StepTwoData = {
  nin: '',
  bvn: '',
  phoneNumber: '',
  title: '',
  surname: '',
  firstName: '',
  middleName: '',
  maidenOrFormerName: '',
  gender: 0,
  maritalStatus: 0,
  nationality: '',
  stateOfOrigin: '',
  localGovernmentOfOrigin: '',
  dateOfBirth: null as unknown as DateValue,
  placeOfBirth: '',
  email: '',
  poBox: '',
  residenceCountry: '',
  residenceState: '',
  residenceLocalGovernmentCode: '',
  residenceTownCity: '',
  residenceStreetName: '',
  residenceHouseNameOrNumber: '',
  residenceZipCode: '',
  statementOption: '',
  correspondenceCountry: '',
  correspondenceState: '',
  correspondenceLocalGovernmentCode: '',
  correspondenceTownCity: '',
  correspondenceStreetName: '',
  correspondenceHouseNameOrNumber: '',
  correspondenceZipCode: '',
  bankName: '',
  customerAccountNo: '',
};

export const FORM_IMAGES: DocumentUploadType = {
  ninConsents: '',
  clientImages: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  piDs: '',
  birthCertificates: '',
  rsaPage1s: '',
  rsaPage2s: '',
  statuss: 0,
  expatraiteDocuments: '',
  transferAcceptanceServices: '',
  promotionLetterSlips: '',
  promotionLetterSlip04s: '',
  promotionLetterSlip07s: '',
  promotionLetterSlip10s: '',
  promotionLetterSlip13s: '',
  promotionLetterSlip16s: '',
  fullPictures: '',
  employerConfirmationDocs: '',
  fingerprintDocuments: '',
  letterOfIndemenitys: '',
  pictures: '',
  signatures: '',
  ninSlips: '',
  proofOfIDs: '',
  letterOfAppointments: '',
};

export const DEFAULT_IMAGES = {
  ninConsents: '',
  clientImages: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  piDs: '',
  birthCertificates: '',
  rsaPage1s: '',
  rsaPage2s: '',
  statuss: 0,
  expatraiteDocuments: '',
  transferAcceptanceServices: '',
  promotionLetterSlips: '',
  promotionLetterSlip04s: '',
  promotionLetterSlip07s: '',
  promotionLetterSlip10s: '',
  promotionLetterSlip13s: '',
  promotionLetterSlip16s: '',
  fullPictures: '',
  employerConfirmationDocs: '',
  fingerprintDocuments: '',
  letterOfIndemenitys: '',
};

export const ABROAD_DATA = {
  nokNigeriaOrAbroad: '1',
  nigeriaOrAbroad: '1',
  employerNigeriaOrAbroad: '1',
};

export const STATUSES = {
  gender: 1,
  nokGender: 1,
  maritalStatus: 0,
};
