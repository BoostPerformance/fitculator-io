export interface UserInfoFormData {
  user: {
    name: string;
    birthday?: string;
    email: string;
    phone_number: string;
    gender?: '남성' | '여성' | '기타' | '비공개' | null;
    start_date: string;
  };
}

export interface FormErrors {
  name: string;
  email: string;
  birthday: string;
  phone_number: string;
  start_date: string;
}

export interface ExerciseConcernFormData {
  exercise_concern?: string;
}

export interface ExercisePreferenceType {
  exercise_preferences: {
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
    referral_source?: string;
    exercise_concern?: string;
    wearable_device: string;
  };
}

export interface RegisterFormData extends ExercisePreferenceType {
  user: {
    name: string;
    email: string;
    birthday?: string;
    phone_number: string;
    gender?: '남성' | '여성' | '기타' | '비공개' | null;
    start_date: string;
  };
  programs: {
    name: string;
  };
  paymentInfo: {
    amount: number;
    order_id: string;
    payment_key: string;
    order_name: string;
    card_type: string;
    owner_type: string;
    currency: string;
  };
}

export interface RequestItemsType {
  user: {
    name: string;
    email: string;
    birthday?: string;
    phone_number: string;
    gender?: string;
    start_day: string;
  };
  exercise_preferences: {
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
    exercise_concern?: string;
    referral_source?: string;
    wearable_device: string;
  };
  userSubscription: {
    programId: number | null;
    start_date: string;
    end_date: string;
  };
  program: {
    id: number;
    type: string;
  };

  paymentInfo: {
    payment_method: string;
    amount: number;
  };
}

export interface ApiResponse {
  user: {
    id: number;
    name: string;
    email: string;
    birthday: string;
    phone_number: string;
    gender: '남성' | '여성' | '기타' | '비공개' | null;
    start_date: string;
  };
  program: {
    id: number;
    name: string;
  };
  paymentInfo: {
    id: number;
    amount: number;
    orderId: string;
    paymentKey: string;
    orderName: string;
    cardType: string;
    ownerType: string;
    currency: string;
    payment_date: string;
  };
  userSubscription: {
    id: number;
    userSubscription: {
      programId: number | null;
      start_date: string;
      end_date: string;
    };
  };
  exercise_preferences: {
    id: number;
    userId: number;
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
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
