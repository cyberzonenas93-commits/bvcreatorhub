import React, { useState, FormEvent } from "react";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { FormInput, FormLabel, FormButton, HelperText, formatPhoneNumber, validators } from "./shared/FormComponents";
import VBLogo from "../../imports/Frame427319586";

interface SignupData {
  email: string;
  password: string;
  businessName: string;
  contactPerson: string;
  phone: string;
}

interface SignupLoginViewProps {
  onSignupComplete: (data: SignupData) => void;
  onLoginComplete: () => void;
}

interface FieldError {
  [key: string]: string;
}

export const SignupLoginView = ({
  onSignupComplete,
  onLoginComplete,
}: SignupLoginViewProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{
    [key: string]: boolean;
  }>({});
  const [errors, setErrors] = useState<FieldError>({});

  // Signup form state
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    businessName: "",
    contactPerson: "",
    phone: "",
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Real-time validation
  const validateField = (
    name: string,
    value: string,
  ): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8)
          return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])/.test(value))
          return "Include at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(value))
          return "Include at least one uppercase letter";
        if (!/(?=.*\d)/.test(value))
          return "Include at least one number";
        return "";
      case "businessName":
        if (!value) return "Business name is required";
        if (value.length < 2)
          return "Business name is too short";
        return "";
      case "contactPerson":
        if (!value) return "Contact person is required";
        if (value.length < 2) return "Name is too short";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length < 9)
          return "Phone number must be at least 9 digits";
        if (phoneDigits.length > 15)
          return "Phone number is too long";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    setSignupData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(
      name,
      signupData[name as keyof SignupData],
    );
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Password strength calculator
  const getPasswordStrength = (
    password: string,
  ): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/(?=.*[a-z])/.test(password)) strength += 15;
    if (/(?=.*[A-Z])/.test(password)) strength += 15;
    if (/(?=.*\d)/.test(password)) strength += 10;
    if (/(?=.*[@$!%*?&#])/.test(password)) strength += 10;

    if (strength <= 25)
      return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 50)
      return { strength, label: "Fair", color: "bg-amber-500" };
    if (strength <= 75)
      return { strength, label: "Good", color: "bg-blue-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(
    signupData.password,
  );

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      "businessName",
      "contactPerson",
      "phone",
      "email",
      "password",
    ];
    const newTouched: { [key: string]: boolean } = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const newErrors: FieldError = {};
    allFields.forEach((field) => {
      const error = validateField(
        field,
        signupData[field as keyof SignupData],
      );
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    toast.success("Account created successfully!");
    onSignupComplete(signupData);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Login successful!");
    onLoginComplete();
  };

  return (
    <div className="min-h-screen bg-[#121214] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-[42px] relative">
              <VBLogo />
            </div>
            <span className="font-['Kamerik205:Regular_3',sans-serif] text-[20px] text-[#f8f9fa]">
              Merchant Dashboard
            </span>
          </div>
          <h1 className="font-['Kamerik205:Regular_3',sans-serif] text-[32px] leading-[41.6px] text-[#f8f9fa] mb-3">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="font-['Inter:Regular',sans-serif] text-[14px] leading-[20px] text-[#9caab8] max-w-sm mx-auto">
            {isLogin
              ? "Sign in to access your merchant dashboard and manage your events"
              : "Create your merchant account to start selling tickets and managing events"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#232326] rounded-[12px] p-6 sm:p-8 relative">
          <div
            aria-hidden="true"
            className="absolute border-[#424249] border border-solid inset-0 pointer-events-none rounded-[12px]"
          />

          {/* Toggle Buttons */}
          <div className="bg-[#121214] content-stretch flex items-center p-[4px] relative rounded-[12px] shrink-0 mb-6">
            <div
              aria-hidden="true"
              className="absolute border-[#424249] border border-solid inset-0 pointer-events-none rounded-[12px]"
            />
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrors({});
                setTouched({});
              }}
              className={`flex-1 content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0 transition-all ${
                !isLogin ? "bg-[#feff1c]" : ""
              }`}
            >
              <div
                className={`flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${
                  !isLogin ? "text-[#121214]" : "text-[#f8f9fa]"
                }`}
              >
                <p className="leading-[18.2px]">Sign Up</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                setTouched({});
              }}
              className={`flex-1 content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[8px] shrink-0 transition-all ${
                isLogin ? "bg-[#feff1c]" : ""
              }`}
            >
              <div
                className={`flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${
                  isLogin ? "text-[#121214]" : "text-[#f8f9fa]"
                }`}
              >
                <p className="leading-[18.2px]">Login</p>
              </div>
            </button>
          </div>

          {/* Signup Form */}
          {!isLogin && (
            <form
              onSubmit={handleSignup}
              className="space-y-5"
              noValidate
            >
              {/* Business Name */}
              <div>
                <FormLabel required>
                  Business / Organizer Name
                </FormLabel>
                <FormInput
                  type="text"
                  value={signupData.businessName}
                  onChange={(e) =>
                    handleFieldChange(
                      "businessName",
                      e.target.value,
                    )
                  }
                  onBlur={() => handleBlur("businessName")}
                  placeholder="e.g., Strictly Soul Ghana"
                  error={errors.businessName}
                  touched={touched.businessName}
                  showValidation={true}
                />
                {touched.businessName &&
                  errors.businessName && (
                    <HelperText error>
                      {errors.businessName}
                    </HelperText>
                  )}
              </div>

              {/* Contact Person */}
              <div>
                <FormLabel required>Contact Person</FormLabel>
                <FormInput
                  type="text"
                  value={signupData.contactPerson}
                  onChange={(e) =>
                    handleFieldChange(
                      "contactPerson",
                      e.target.value,
                    )
                  }
                  onBlur={() => handleBlur("contactPerson")}
                  placeholder="e.g., Kofi Mensah"
                  error={errors.contactPerson}
                  touched={touched.contactPerson}
                  showValidation={true}
                />
                {touched.contactPerson &&
                  errors.contactPerson && (
                    <HelperText error>
                      {errors.contactPerson}
                    </HelperText>
                  )}
              </div>

              {/* Phone Number */}
              <div>
                <FormLabel required>Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  value={signupData.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(
                      e.target.value,
                    );
                    handleFieldChange("phone", formatted);
                  }}
                  onBlur={() => handleBlur("phone")}
                  placeholder="024 123 4567"
                  error={errors.phone}
                  touched={touched.phone}
                  showValidation={true}
                />
                {touched.phone && errors.phone && (
                  <HelperText error>{errors.phone}</HelperText>
                )}
                {!errors.phone && (
                  <HelperText>
                    Used for account security and payout
                    notifications
                  </HelperText>
                )}
              </div>

              {/* Email */}
              <div>
                <FormLabel required>Email Address</FormLabel>
                <FormInput
                  type="email"
                  value={signupData.email}
                  onChange={(e) =>
                    handleFieldChange("email", e.target.value)
                  }
                  onBlur={() => handleBlur("email")}
                  placeholder="your@email.com"
                  error={errors.email}
                  touched={touched.email}
                  showValidation={true}
                />
                {touched.email && errors.email && (
                  <HelperText error>{errors.email}</HelperText>
                )}
                {!errors.email && (
                  <HelperText>
                    We'll send event updates and important
                    notifications here
                  </HelperText>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="font-['Inter:Regular',sans-serif] font-bold text-[12px] leading-[15.6px] text-[#9caab8] uppercase tracking-wider block mb-2">
                  Password{" "}
                  <span className="text-[#feff1c]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupData.password}
                    onChange={(e) =>
                      handleFieldChange(
                        "password",
                        e.target.value,
                      )
                    }
                    onBlur={() => handleBlur("password")}
                    placeholder="Create a strong password"
                    className={`w-full px-[16px] py-[12px] pr-[48px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none transition-all ${
                      touched.password && errors.password
                        ? "ring-2 ring-red-500 border-red-500"
                        : "focus:ring-1 focus:ring-[#feff1c] border-[#424249]"
                    }`}
                    style={{ border: "1px solid" }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#767686] hover:text-[#f8f9fa] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {signupData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-[#121214] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{
                            width: `${passwordStrength.strength}%`,
                          }}
                        />
                      </div>
                      {passwordStrength.label && (
                        <span
                          className={`font-['Inter:Regular',sans-serif] text-[11px] font-bold ${
                            passwordStrength.strength <= 25
                              ? "text-red-500"
                              : passwordStrength.strength <= 50
                                ? "text-amber-500"
                                : passwordStrength.strength <=
                                    75
                                  ? "text-blue-500"
                                  : "text-green-500"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {touched.password && errors.password && (
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] leading-[15.6px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </p>
                )}

                <div className="mt-2 space-y-1">
                  <p className="font-['Inter:Regular',sans-serif] text-[11px] leading-[14.3px] text-[#767686]">
                    Password must include:
                  </p>
                  <ul className="space-y-0.5 ml-2">
                    <li
                      className={`font-['Inter:Regular',sans-serif] text-[11px] leading-[14.3px] flex items-center gap-1 ${
                        signupData.password.length >= 8
                          ? "text-green-500"
                          : "text-[#767686]"
                      }`}
                    >
                      {signupData.password.length >= 8 ? (
                        <Check size={12} />
                      ) : (
                        <span className="w-3">•</span>
                      )}
                      At least 8 characters
                    </li>
                    <li
                      className={`font-['Inter:Regular',sans-serif] text-[11px] leading-[14.3px] flex items-center gap-1 ${
                        /(?=.*[a-z])/.test(
                          signupData.password,
                        ) &&
                        /(?=.*[A-Z])/.test(signupData.password)
                          ? "text-green-500"
                          : "text-[#767686]"
                      }`}
                    >
                      {/(?=.*[a-z])/.test(
                        signupData.password,
                      ) &&
                      /(?=.*[A-Z])/.test(
                        signupData.password,
                      ) ? (
                        <Check size={12} />
                      ) : (
                        <span className="w-3">•</span>
                      )}
                      Uppercase & lowercase letters
                    </li>
                    <li
                      className={`font-['Inter:Regular',sans-serif] text-[11px] leading-[14.3px] flex items-center gap-1 ${
                        /(?=.*\d)/.test(signupData.password)
                          ? "text-green-500"
                          : "text-[#767686]"
                      }`}
                    >
                      {/(?=.*\d)/.test(signupData.password) ? (
                        <Check size={12} />
                      ) : (
                        <span className="w-3">•</span>
                      )}
                      At least one number
                    </li>
                  </ul>
                </div>
              </div>

              <FormButton
                type="submit"
                variant="primary"
                disabled={Object.keys(errors).some(
                  (key) => errors[key],
                )}
              >
                Create Account
              </FormButton>

              {/* Quick demo access */}
              <FormButton
                type="button"
                variant="secondary"
                onClick={() => {
                  const demoData: SignupData = {
                    email: "demo@merchant.gh",
                    password: "Demo12345",
                    businessName: "Strictly Soul Ghana",
                    contactPerson: "Kofi Mensah",
                    phone: "+233 24 555 1234",
                  };
                  toast.success("Using demo account");
                  onSignupComplete(demoData);
                }}
              >
                Try Demo Account
              </FormButton>

              <p className="font-['Inter:Regular',sans-serif] text-[11px] leading-[14.3px] text-[#767686] text-center mt-4">
                By signing up, you agree to our{" "}
                <button
                  type="button"
                  className="text-[#feff1c] hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#feff1c] hover:underline"
                >
                  Privacy Policy
                </button>
              </p>
            </form>
          )}

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    className="w-full px-[16px] py-[12px] pr-[48px] bg-[#121214] rounded-[8px] text-[#f8f9fa] font-['Inter:Regular',sans-serif] text-[14px] placeholder:text-[#767686] focus:outline-none focus:ring-1 focus:ring-[#feff1c] transition-all"
                    style={{ border: "1px solid #424249" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#767686] hover:text-[#f8f9fa] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[12px]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#424249] bg-[#121214] text-[#feff1c] focus:ring-[#feff1c] cursor-pointer"
                  />
                  <span className="font-['Inter:Regular',sans-serif] text-[#9caab8] group-hover:text-[#f8f9fa] transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="font-['Inter:Regular',sans-serif] text-[#feff1c] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <FormButton type="submit" variant="primary">
                Sign In
              </FormButton>

              {/* Quick demo access */}
              <FormButton
                type="button"
                variant="secondary"
                onClick={() => {
                  toast.success("Logged in successfully!");
                  onLoginComplete();
                }}
              >
                Try Demo Login
              </FormButton>
            </form>
          )}
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};