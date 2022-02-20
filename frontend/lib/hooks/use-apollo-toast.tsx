import { useEffect } from "react";
import toast from "react-hot-toast";

export const useApolloToast = (data, loading, error) => {
  useEffect(() => {
    if (loading) {
      var toastLoading = toast.loading("Loading...");
    }
    if (error) {
      if (error.message.includes("slug")) {
        toast.error("Title already in use");
      } else if (error.message.includes("username")) {
        toast.error("Username already in use");
      } else {
        toast.error(error.message);
      }
    }
    if (data) {
      toast.success("Success");
    }
    return () => toast.dismiss(toastLoading);
  }, [loading]);
};
