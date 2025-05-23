export interface UserInfoFormData {
  users: {
    name: string;
    birthday?: string;
    email: string;
    phone_number: string;
    os: '아이폰 (iOS)' | '안드로이드 (Android)' | '';
    gender?: 'male' | 'female' | 'other' | 'undisclosed' | null;
    start_date: string;
  };
}

export interface FormErrors {
  name: string;
  email: string;
  birthday: string;
  phone_number: string;
  start_date: string;
  os: string;
}

export interface ExerciseConcernFormData {
  exercise_concern?: string;
}

export interface ExercisePreferenceType {
  exercise_preferences: {
    exercise_level: number;
    exercise_goal: string;
    referral_source?: string;
    exercise_concern?: string;
    wearable_device: string;
  };
}

export interface RegisterFormData extends ExercisePreferenceType {
  users: {
    name: string;
    birthday?: string;
    email: string;
    phone_number: string;
    gender?: 'male' | 'female' | 'other' | 'undisclosed' | null;
    start_date: string;
    os: '아이폰 (iOS)' | '안드로이드 (Android)' | '';
  };
  programs: {
    name: string;
  };
  payment_info?: {
    amount: number;
    payment_date: string;
    payment_method: string;
    payment_key: string;
    status: string;
    order_id: string;
    order_name: string;
    card_type: string;
    owner_type: string;
    currency: string;
    approve_no: string | null;
  };
}

export interface RequestItemsType {
  users: {
    name: string;
    birthday?: string;
    email: string;
    phone_number: string;
    os: '아이폰 (iOS)' | '안드로이드 (Android)' | '';
    gender?: string;
    start_date: string;
  };
  exercise_preferences: {
    exercise_level: number;
    exercise_goal: string;
    exercise_concern?: string;
    referral_source?: string;
    wearable_device: string;
  };
  userSubscription: {
    start_date: string;
    end_date: string;
  };
  program: {
    id: number;
    name: string;
  };

  payment_info: {
    amount: number;
    payment_date: string;
    payment_method: string;
    payment_key: string;
    status: string;
    order_id: string;
    order_name: string;
    card_type: string;
    owner_type: string;
    currency: string;
    approve_no: string | null;
  };
}

export interface ApiResponse {
  users: {
    id: string;
    name: string;
    birthday: string;
    email: string;
    os: '아이폰 (iOS)' | '안드로이드 (Android)' | '';
    phone_number: string;
    gender: 'male' | 'female' | 'undisclosed' | null;
    start_date: string;
  };
  program: {
    id: string;
    name: string;
  };
  payment_info: {
    id: string;
    amount: number;
    payment_date: string;
    payment_method: string;
    payment_key: string;
    status: string;
    order_id: string;
    order_name: string;
    card_type: string;
    owner_type: string;
    currency: string;
    approve_no: string | null;
  };
  userSubscription: {
    id: string;
    userSubscription: {
      programId: string | null;
      start_date: string;
      end_date: string;
    };
  };
  exercise_preferences: {
    id: string;
    userId: string;
    exercise_level: number;
    exercise_goal: string;
    exercise_concern: string;
    referral_source?: string;
    wearable_device: string;
  };
}
export interface UserInformationProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
}

export interface ExercisePreferenceProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
}

export interface DropdownOption {
  id: number;
  option: string;
}

export interface PaymentInformationProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
}
