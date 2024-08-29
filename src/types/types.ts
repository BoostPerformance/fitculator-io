export interface UserInfoFormData {
  name: string;
  email: string;
  phone_number: string;
  gender: '남성' | '여성';
}

export interface ExerciseConcernFormData {
  exercise_concern: string;
}

export interface ExercisePreferenceType {
  exercise_level: number;
  exercise_goal: string[];
  referral_source:
    | '지인 소개'
    | '인스타그램 광고'
    | 'FITCULATOR 계정'
    | '페이스북'
    | '블로그'
    | '이전 기수 참여자';
} // FITCULATOR를 알게된 경로

export interface RegisterFormData
  extends UserInfoFormData,
    ExercisePreferenceType,
    ExerciseConcernFormData {
  userId: number;
  programType: string;
  subscription: {
    batchId: number | null;
    start_date: string;
    end_date: string;
  };
  payment: {
    method: '신용카드' | 'Naverpay' | 'Kakaopay';
    amount: number;
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

export interface RequestItemsType
  extends UserInfoFormData,
    ExerciseConcernFormData {
  id: number;
  userId: number;
  programType: string;
  exercise_level: number;
  exercise_goal: string;
  referral_source:
    | '지인 소개'
    | '인스타그램 광고'
    | 'FITCULATOR 계정'
    | '페이스북'
    | '블로그'
    | '이전 기수 참여자';
  subscription: {
    batchId: number | null;
    start_date: string;
    end_date: string;
  };
  payment: { method: string; amount: number };
}

export interface ApiResponse {
  newSubscription: {
    id: number;
    userId: number;
    programId: number;
    batchId: number | null;
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
    exercise_level: number;
    exercise_goal: string;
    referral_source: string;
    exercise_concern: string;
  };
}
