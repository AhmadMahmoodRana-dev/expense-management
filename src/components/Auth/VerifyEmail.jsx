"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AuthLayout from "@/layouts/AuthLayout";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import Baseurl from "@/constant/Baseurl";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useParams();
  const token = params?.token;

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("Invalid or missing verification token");
        setLoading(false);
        return;
      }

      try {
        console.log("✅ Verifying email with token:", token);

        const response = await axios.get(
          `${Baseurl}/verify-email/${token}`
        );

        console.log("Email verification successful:", response.data);
        setVerified(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth");
        }, 3000);

      } catch (error) {
        console.error("Error verifying email:", error);
        setError(
          error.response?.data?.message || 
          "Failed to verify email. The link may be invalid or expired."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  if (loading) {
    return (
      <AuthLayout
        title="Verifying Email"
        subtitle="Please wait while we verify your email address"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout
        title="Verification Failed"
        subtitle="We couldn't verify your email address"
      >
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Verification Failed
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800 font-medium mb-2">
              What you can do:
            </p>
            <ul className="text-sm text-blue-600 ml-4 list-disc space-y-1">
              <li>Request a new verification email</li>
              <li>Check if you've already verified your email</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Go to Sign In
            </button>

            <button
              onClick={() => router.push("/register")}
              className="w-full text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Create New Account
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (verified) {
    return (
      <AuthLayout
        title="Email Verified!"
        subtitle="Your email has been successfully verified"
      >
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Success!
            </h3>
            <p className="text-green-700 mb-4">
              Your email has been verified successfully.
            </p>
            <p className="text-sm text-green-600">
              You can now sign in and start using your account.
            </p>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Go to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  return null;
};

export default VerifyEmail;