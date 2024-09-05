export interface UserInfoFormData {
  user: {
    name: string;
    email: string;
    phone_number: string;
    gender: '남성' | '여성';
  };
}

export interface ExerciseConcernFormData {
  exercise_concern: string;
}

export interface ExercisePreferenceType {
  exercise_level: number;
  exercise_goal: string[];
  exercise_performance_level: string;
  referral_source: string;
} // FITCULATOR를 알게된 경로

export interface RegisterFormData
  extends UserInfoFormData,
    ExercisePreferenceType,
    ExerciseConcernFormData {
  userSubscription: {
    batchId: number | null;
    programId: number | null;
    start_date: string;
    end_date: string;
  };
  program: {
    name: string;
  };
  paymentInfo: {
    payment_method: string;
    amount: number;
  };
}

export interface RequestItemsType {
  user: {
    name: string;
    email: string;
    phone_number: string;
    gender: '남성' | '여성' | '기타' | '비공개';
  };
  exercisePreference: {
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
    exercise_concern: string;
    referral_source?: string;
  };
  userSubscription: {
    id: number;
    batchId: number | null;
    programId: number | null;
    start_date: string;
    end_date: string;
  };
  program: {
    id: number;
    name: string;
  };

  batch_number: number;

  paymentInfo: {
    payment_method: string;
    amount: number;
  };
}

export interface ApiResponse {
  user: {
    id: number;
  };
  newSubscription: {
    id: number;
    userId: number;
    programId: number;
    batchId?: number | null;
    start_date: Date;
    end_date: Date;
    status: string;
  };
  paymentInfo: {
    id: number;
    userSubscriptionId: number;
    payment_method: string;
    amount: number;
  };
  exercisePref: {
    id: number;
    userId: number;
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
