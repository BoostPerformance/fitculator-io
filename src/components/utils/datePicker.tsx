'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import Input from '../input';

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  width?: string;
  title: string;
  description: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '날짜 선택',
  disabled = false,
  minDate,
  maxDate,
  width = 'w-full',
  title,
  description,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // 달력 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // value prop이 변경될 때 selectedDate 업데이트
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setCurrentMonth(date);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // 날짜 선택 핸들러
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (onChange) {
      onChange(format(date, 'yyyy-MM-dd'));
    }
  };

  // 이전/다음 달 이동
  const changeMonth = (offset: number) => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  };

  // 달력에 표시할 날짜들 생성
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // 이전 달의 날짜들
    for (let i = 0; i < firstDay.getDay(); i++) {
      const date = new Date(year, month, -i);
      days.unshift({ date, isCurrentMonth: false });
    }

    // 현재 달의 날짜들
    for (
      let date = new Date(firstDay);
      date <= lastDay;
      date.setDate(date.getDate() + 1)
    ) {
      days.push({ date: new Date(date), isCurrentMonth: true });
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - days.length; // 6주 채우기
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  // 날짜가 선택 가능한지 확인
  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
      return true;
    return false;
  };

  return (
    <div
      className={`relative ${width} flex flex-col gap-[0.3rem] sm:gap-[0.1rem]`}
      ref={calendarRef}
    >
      <div
        className={` ${disabled ? ' cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setShowCalendar((prev) => !prev)}
      >
        <div className="flex gap-[0.5rem] items-end sm:items-center">
          <div className="text-1.25-700 text-gray-1 sm:text-1-700">{title}</div>
          <p className="text-1-500 text-gray-7 sm:text-0.75-500">
            {description}
          </p>
        </div>

        <Calendar
          className="absolute left-3 bottom-[0.3rem] transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          className="pl-[3rem] w-full px-4 py-2 border-[0.1rem] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={
            selectedDate
              ? format(selectedDate, 'yyyy-MM-dd', { locale: ko })
              : ''
          }
          placeholder={placeholder}
          readOnly
          disabled={disabled}
        />
      </div>

      {showCalendar && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border p-4">
          {/* 달력 헤더 */}
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              &lt;
            </button>
            <span className="font-semibold">
              {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
            </span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              &gt;
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map(({ date, isCurrentMonth }, index) => (
              <button
                key={index}
                type="button"
                onClick={() => !isDateDisabled(date) && handleDateSelect(date)}
                disabled={isDateDisabled(date)}
                className={`
                  p-2 text-sm rounded-full text-center
                  ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}
                  ${
                    selectedDate &&
                    date.toDateString() === selectedDate.toDateString()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'hover:bg-gray-100'
                  }
                  ${
                    isDateDisabled(date)
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer'
                  }
                `}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
