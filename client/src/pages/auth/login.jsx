import CommonForm from "@/components/common/form";
import { GoogleAuth } from "@/components/googleAuth/GoogleAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  const handleGuest=()=>{
    dispatch(loginUser({email:"one@gmail.com",password:"one"}))
  }
  const handleDemoAdmin=()=>{
    dispatch(loginUser({email:"fun@gmail.com",password:"fun"}))
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="">
        <p className="text-center text-2xl line-clamp-1 leading-tight">or</p>
      </div>
      <div className="flex flex-col gap-4">
        
     <Button className="w-full" variant={"secondary"} onClick={handleGuest}>
      Login as Guest
     </Button>
     
     <Button className="w-full" variant={"outline"} onClick={handleDemoAdmin}>
      Login as Demo Admin
     </Button>
      <GoogleAuth/>
      <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>


      </div>
    </div>
  );
}

export default AuthLogin;
