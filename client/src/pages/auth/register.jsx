import CommonForm from "@/components/common/form";
import { GoogleAuth } from "@/components/googleAuth/GoogleAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { loginUser, registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
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
           have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      
      
            </div>
      

    </div>
  );
}

export default AuthRegister;
