import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { usePostMutationQueries } from "@/apiquery/useApiQuery";
import ToastErrorHandler from "@/utils/ToastErrorHandler";
import { useAuth } from "./context/AuthContext";

const passwordSchema = z
  .string()
  .min(6, "Password should be atleast 8 characters")
  .max(16, "Password can only have a maximum of 16 characters");

const formSchema = z
  .object({
    name: z.string().min(3, "User Name must contain 3 characters."),
    email: z.string().email("Enter a valid Email Address"),
    password: passwordSchema,
    cpassword: passwordSchema,
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Password don't match",
  });

type SignUpFormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: SignUpMutation, isPending } = usePostMutationQueries(
    "login",
    "api/auth/signup"
  );
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const toggleview = (type: string) => {
    type === "pass"
      ? setShowPassword((prev) => !prev)
      : setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data: SignUpFormValues) => {
    SignUpMutation(data, {
      onSuccess(response) {
        localStorage.setItem("userId", response?.data.id);
        toast.success(response?.data.message);
        login(response?.data.authToken);
      },
      onError(error) {
        ToastErrorHandler(error);
      },
    });
  };

  return (
    <div className="container max-w-4xl py-4 mx-auto md:py-10">
      <Heading title={"Sign Up"} />
      <Separator className="mt-4 mb-8" />
      <div className="max-w-lg mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.control.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 md:gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isPending}
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          disabled={isPending}
                          placeholder="Password"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          disabled={isPending}
                          className="absolute inset-y-0 grid place-items-center right-5 opacity-80 focus:opacity-100"
                          onClick={() => toggleview("pass")}
                        >
                          <EyeOff
                            size={20}
                            className={`${
                              isPending ? "text-input" : "text-foreground"
                            } absolute transition-all duration-200 ${
                              showPassword ? "scale-100" : "scale-0"
                            }`}
                          />
                          <Eye
                            size={20}
                            className={`${
                              isPending ? "text-input" : "text-foreground"
                            } absolute transition-all duration-200 ${
                              !showPassword ? "scale-100" : "scale-0"
                            }`}
                          />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          disabled={isPending}
                          placeholder="Confirm Password"
                          {...field}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          disabled={isPending}
                          className="absolute inset-y-0 grid place-items-center right-5 opacity-80 focus:opacity-100"
                          onClick={() => toggleview("cpass")}
                        >
                          <EyeOff
                            size={20}
                            className={`${
                              isPending ? "text-input" : "text-foreground"
                            } absolute transition-all duration-200 ${
                              showConfirmPassword ? "scale-100" : "scale-0"
                            }`}
                          />
                          <Eye
                            size={20}
                            className={`${
                              isPending ? "text-input" : "text-foreground"
                            } absolute transition-all duration-200 ${
                              !showConfirmPassword ? "scale-100" : "scale-0"
                            }`}
                          />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start my-3 md:flex-row it md:items-center md:justify-between gap-y-3 md:gap-y-0">
              <div className="flex gap-2 mr-auto">
                <Button disabled={isPending} type="submit">
                  SignUp
                </Button>
                <Button
                  disabled={isPending}
                  type="reset"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              </div>
              <div className="sm:pr-3">
                <p className="flex items-center text-base sm:text-lg text-accent-foreground/50 text- ">
                  <span>Have an Accout ?</span>
                  <Link
                    to={isPending ? "/signup" : "/login"}
                    className={`'pb-[2px] ml-2 text-sm sm:text-base border-b border-b-current ${
                      isPending
                        ? "text-input"
                        : "text-accent-foreground/90 hover:text-accent-foreground"
                    }`}
                  >
                    Log in now!
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
