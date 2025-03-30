import { create } from 'zustand';

import { persist } from 'zustand/middleware';

import { STORE_FORM_INIT_VALUES, initialDocsState } from 'src/data';

import { IStoreActions, IStoreState, StoreDocumentUploadType } from 'src/types';

const initialState: IStoreState = {
  currentRoute: '/step-1',
  currentUser: {
    email: '',
    phoneNumber: '',
    no: null,
    imageId: null,
    ReferenceID: '',
  },
  currentUserDocs: initialDocsState,

  stepFormData: STORE_FORM_INIT_VALUES,
};

const useStore = create<IStoreState & IStoreActions>()(
  persist(
    (set) => ({
      currentRoute: initialState.currentRoute,
      currentUser: initialState.currentUser,
      stepFormData: initialState.stepFormData,
      currentUserDocs: initialState.currentUserDocs,

      setCurrentRoute: (route: string) => set({ currentRoute: route }),
      setCurrentUser: (user) => {
        set({
          currentUser: { ...initialState.currentUser, ...user },
        });
      },
      setStepFormData: (data) => {
        set({
          stepFormData: { ...initialState.stepFormData, ...data },
        });
      },

      setCurrentUserDocs: (data: Partial<StoreDocumentUploadType>) => {
        set((state) => ({
          currentUserDocs: {
            ...state.currentUserDocs,
            ...data,
          },
        }));
      },
    }),
    {
      name: 'app_store',
    }
  )
);

export default useStore;
