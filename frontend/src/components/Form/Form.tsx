import { useState } from "react";
import api from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, registerSchema } from "@/lib/Form/loginRegisterSchema";
import { loginRegisterFields } from "@/lib/Form/loginRegisterFields";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginPageImage from "../../assets/Form/LoginPage.jpg";
import { toast } from "../../components/Error/ErrorSonner";

function HomeForm({ route, method }: { route: string; method: string }) {
  const [_loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const isLogin = method === "login";
  const name = isLogin ? "Login" : "Register";

  const formSchema = name === "Login" ? loginSchema : registerSchema;

  const form = isLogin
    ? useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
        },
      })
    : useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          passwordConfirm: "",
        },
      });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    if ("passwordConfirm" in values) {
      const { passwordConfirm, ...filteredValues } = values as {
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        passwordConfirm: string;
        role?: string;
      };
      filteredValues.role = "customer";

      values = { ...filteredValues };
    }

    try {
      const res = await api.post(
        route,
        isLogin
          ? { username: values.username, password: values.password }
          : values,
      );

      if (isLogin) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        toast({
          title: "Login Successful!",
          description: "Redirecting to homepage...",
          button: {
            label: "Go immediately!",
            onClick: () => navigate("/"),
          },
        });

      } else {
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Login Failed!",
        description: "Invalid username or password. Try again"
      });
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  const formFields = isLogin
    ? loginRegisterFields.login
    : loginRegisterFields.register;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[800px] items-center p-4 md:flex md:h-screen md:max-h-[700px]">
        <div className="hidden h-full w-1/2 md:block">
          <img
            src={LoginPageImage}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <div className="flex h-full flex-col justify-center">
            <CardHeader className="px-8">
              <CardTitle>
                {isLogin ? "Login to Proceed" : "Create an Account"}
              </CardTitle>
              <CardDescription>
                {isLogin ? (
                  <div>
                    Don't have an account?&nbsp;
                    <Link to="/register" className="underline">
                      Register
                    </Link>
                  </div>
                ) : (
                  <div>
                    Do you have an existing account?&nbsp;
                    <Link to="/login" className="underline">
                      Login
                    </Link>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="scrollbar mb-10 flex flex-col gap-y-2 px-8 pb-10 md:overflow-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                    console.log("Form validation errors: ", errors);
                  })}
                  className="flex-row"
                >
                  {formFields.map((field) => {
                    if (
                      isLogin &&
                      (field.name === "first_name" ||
                        field.name === "last_name" ||
                        field.name === "passwordConfirm")
                    ) {
                      return null;
                    }
                    return (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={
                          field.name as
                            | "password"
                            | "username"
                            | "first_name"
                            | "last_name"
                            | "email"
                            | "passwordConfirm"
                        }
                        render={({ field: formField }) => (
                          <FormItem className="pb-4">
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={field.placeholder}
                                type={field.type}
                                {...formField}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                  <div className="absolute">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HomeForm;
