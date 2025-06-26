import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/router";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginSchema, Loginschemtype } from "@/utils/zodschema";
import { loginUser } from "@/utils/apiQueries";
import { toast } from "sonner";

const signin = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Loginschemtype>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  // Backend Code

  const onsubmit = async (fdata: Loginschemtype) => {
    try {
      const login = await loginUser(fdata);
      console.log(login);

      if (login === undefined) {
        return;
      }
      if (login === true) {
        router.push("/");
        reset();
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      <Card className="w-[380px] sm:w-[350px]">
        <CardBody className="p-4 space-y-8">
          <div className="space-y-1">
            <div className="font-bold text-3xl">Login</div>
            <div className="text-slate-500">
              Enter your Email and Password to continue
            </div>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
            <Input
              {...register("email")}
              variant="bordered"
              placeholder="Enter the Email"
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("password")}
              variant="bordered"
              placeholder="Enter the Password"
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email?.message}
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? <Eye /> : <EyeOff />}
                </button>
              }
            />
            <Button
              fullWidth
              color="primary"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </form>
          <Divider />
          <div className="flex justify-center items-center gap-2">
            <p>Don't Have An Account ?</p>
            <Link className="text-blue-500 font-bold" href={"/auth/register"}>
              Register
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default signin;
