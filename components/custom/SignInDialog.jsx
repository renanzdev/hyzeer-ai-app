import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext } from "react";
import axios from "axios";

function SignInDialog({ openDialog, closeDialog }) {
  const { useDetail, setUserDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent
        style={{
          backgroundColor: Colors.BACKGROUND,
          borderColor: Colors.BORDER_COLOR,
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-center text-white">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            {Lookup.SIGNIN_SUBHEADING}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-3">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-400 
          mt-3"
            onClick={() => googleLogin()}
          >
            Sign In With Google
          </Button>
          <p className="text-sm text-gray-400 text-center">
            {Lookup.SIGNIn_AGREEMENT_TEXT}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
