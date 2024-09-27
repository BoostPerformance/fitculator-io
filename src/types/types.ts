export interface UserInfoFormData {
  user: {
    name: string;
    birthDate?: string;
    email: string;
    phone_number: string;
    gender?: '남성' | '여성' | '기타' | '비공개';
  };
}

export interface ExerciseConcernFormData {
  exercise_concern?: string;
}

export interface ExercisePreferenceType {
  exercisePreferences: {
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
    referral_source?: string;
    exercise_concern?: string;
  };
}

export interface RegisterFormData extends ExercisePreferenceType {
  user: {
    name: string;
    email: string;
    phone_number: string;
    gender?: '남성' | '여성' | '기타' | '비공개';
  };
  programs: {
    type: string;
    duration_in_months: number;
  };
  subscriptions: {
    batch_id: number | null;
  };
}

export interface RequestItemsType {
  user: {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
  };
  exercisePreferences: {
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
    exercise_concern?: string;
    referral_source?: string;
  };
  userSubscription: {
    batchId: number | null;
    programId: number | null;
    start_date: string;
    end_date: string;
  };
  program: {
    id: number;
    type: string;
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
    name: string;
    email: string;
    phone_number: string;
    gender: '남성' | '여성' | '기타' | '비공개';
  };
  program: {
    id: number;
    name: string;
  };
  userSubscription: {
    id: number;
    userSubscription: {
      batchId: number | null;
      programId: number | null;
      start_date: string;
      end_date: string;
    };
  };
  exercisePreferences: {
    id: number;
    userId: number;
    exercise_level: number;
    exercise_goal: string;
    exercise_performance_level?: string;
    exercise_concern: string;
    referral_source?: string;
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
