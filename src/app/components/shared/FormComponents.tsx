import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

// Standardized Label Component
interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}

export const FormLabel = ({ children, required, htmlFor }: LabelProps) => (
  <label 
    htmlFor={htmlFor}
    className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block mb-2"
  >
    {children}
    {required && <span className="text-[#feff1c]"> *</span>}
  </label>
);

// Standardized Helper Text Component
interface HelperTextProps {
  children: React.ReactNode;
  error?: boolean;
}

export const HelperText = ({ children, error }: HelperTextProps) => (
  <p className={`font-['Inter:Regular',sans-serif] mt-1 flex items-center gap-1 ${
    error 
      ? 'text-[12px] leading-[15.6px] text-red-500'
      : 'text-[11px] leading-[14.3px] text-[#767686]'
  }`}>
    {error && <AlertCircle size={12} />}
    {children}
  </p>
);

// Standardized Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
  showValidation?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, touched, showValidation = false, className = '', ...props }, ref) => {
    const hasError = touched && error;
    const isValid = touched && !error && showValidation;

    return (
      <div className="relative">
        <input
          ref={ref}
          className={`
            w-full px-[16px] py-[12px] ${showValidation ? 'pr-[40px]' : ''}
            bg-[#121214] rounded-[8px] 
            text-[#f8f9fa] 
            font-['Inter:Regular',sans-serif] text-[14px] leading-[18.2px]
            placeholder:text-[#767686] 
            focus:outline-none transition-all
            ${hasError 
              ? 'ring-2 ring-red-500 border-red-500'
              : isValid
              ? 'ring-1 ring-green-500 border-green-500'
              : 'focus:ring-1 focus:ring-[#feff1c] border-[#424249]'
            }
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          style={{ border: '1px solid' }}
          {...props}
        />
        {showValidation && touched && (
          <div className="absolute right-[12px] top-1/2 -translate-y-1/2">
            {hasError ? (
              <X size={18} className="text-red-500" />
            ) : (
              <Check size={18} className="text-green-500" />
            )}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

// Standardized Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  touched?: boolean;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, touched, className = '', ...props }, ref) => {
    const hasError = touched && error;

    return (
      <textarea
        ref={ref}
        className={`
          w-full px-[16px] py-[12px]
          bg-[#121214] rounded-[8px] 
          text-[#f8f9fa] 
          font-['Inter:Regular',sans-serif] text-[14px] leading-[18.2px]
          placeholder:text-[#767686] 
          focus:outline-none transition-all
          ${hasError 
            ? 'ring-2 ring-red-500 border-red-500'
            : 'focus:ring-1 focus:ring-[#feff1c] border-[#424249]'
          }
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        style={{ border: '1px solid' }}
        {...props}
      />
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Standardized Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  touched?: boolean;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, touched, className = '', children, ...props }, ref) => {
    const hasError = touched && error;

    return (
      <select
        ref={ref}
        className={`
          w-full px-[16px] py-[12px]
          bg-[#121214] rounded-[8px] 
          text-[#f8f9fa] 
          font-['Inter:Regular',sans-serif] text-[14px] leading-[18.2px]
          focus:outline-none transition-all
          ${hasError 
            ? 'ring-2 ring-red-500 border-red-500'
            : 'focus:ring-1 focus:ring-[#feff1c] border-[#424249]'
          }
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        style={{ border: '1px solid' }}
        {...props}
      >
        {children}
      </select>
    );
  }
);

FormSelect.displayName = 'FormSelect';

// Standardized Primary Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const FormButton = ({ variant = 'primary', children, className = '', fullWidth = true, ...props }: ButtonProps) => {
  if (variant === 'primary') {
    return (
      <button
        className={`
          bg-[#feff1c] text-[#121214]
          content-stretch flex items-center justify-center
          px-[24px] py-[14px] gap-2
          relative rounded-[8px] shrink-0
          ${fullWidth ? 'w-full' : ''}
          hover:opacity-90
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        <div className="flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap">
          <p className="leading-[18.2px]">{children}</p>
        </div>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        className={`
          bg-[#232326] text-[#f8f9fa]
          content-stretch flex items-center justify-center
          px-[24px] py-[14px] gap-2
          relative rounded-[8px] shrink-0
          ${fullWidth ? 'w-full' : ''}
          hover:border-[#feff1c]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        <div aria-hidden="true" className="absolute border-[#424249] border border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap">
          <p className="leading-[18.2px]">{children}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      className={`
        bg-transparent text-[#f8f9fa]
        content-stretch flex items-center justify-center
        px-[16px] py-[12px] gap-2
        relative rounded-[8px] shrink-0
        ${fullWidth ? 'w-full' : ''}
        hover:bg-[#232326]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      <div className="flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">{children}</p>
      </div>
    </button>
  );
};

// Phone Number Auto-formatter
export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.startsWith('233')) {
    // Format as +233 XX XXX XXXX
    const match = cleaned.match(/^(233)(\d{0,2})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `+${match[1]}${match[2] ? ' ' + match[2] : ''}${match[3] ? ' ' + match[3] : ''}${match[4] ? ' ' + match[4] : ''}`.trim();
    }
  } else if (cleaned.startsWith('0')) {
    // Format as 0XX XXX XXXX
    const match = cleaned.match(/^(0)(\d{0,2})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]}${match[2]}${match[3] ? ' ' + match[3] : ''}${match[4] ? ' ' + match[4] : ''}`.trim();
    }
  }
  
  return value;
};

// Field validation helpers
export const validators = {
  email: (value: string): string => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    return '';
  },
  
  phone: (value: string): string => {
    if (!value) return 'Phone number is required';
    const phoneDigits = value.replace(/\D/g, '');
    if (phoneDigits.length < 9) return 'Phone number must be at least 9 digits';
    if (phoneDigits.length > 15) return 'Phone number is too long';
    return '';
  },
  
  required: (value: string, fieldName: string = 'This field'): string => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return '';
  },
  
  minLength: (value: string, min: number, fieldName: string = 'This field'): string => {
    if (value.length < min) return `${fieldName} must be at least ${min} characters`;
    return '';
  },
};