import { useEffect } from "react";
import toast, { ToastPosition } from "react-hot-toast";

export const useApolloToast = (
  data,
  loading,
  error,
  options?: {
    success?: string;
    loading?: string;
    error?: string;
    position?: ToastPosition;
  }
) => {
  useEffect(() => {
    if (loading) {
      var toastLoading = toast.loading(options?.loading || "Loading...", {
        position: options?.position,
      });
    }
    if (error) {
      if (error.message.includes("slug")) {
        toast.error("Title already in use", {
          position: options?.position,
        });
      } else if (error.message.includes("username")) {
        toast.error("Username already in use", {
          position: options?.position,
        });
      } else {
        toast.error(options?.error || "Error", {
          position: options?.position,
        });
      }
    }
    if (data) {
      toast.success(options?.success || "Success", {
        position: options?.position,
      });
    }
    return () => toast.dismiss(toastLoading);
  }, [loading]);
};
