"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { FormMessage } from "./ui/form";
type FormType = "sign-in" | "sign-up";

const authformSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formSchema = authformSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    console.log(data);
  };
  return (
    <>
      <Card className="w-full sm:max-w-md auth-form border-none shadow-none">
        <CardHeader>
          <CardTitle className="form-title text-center">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {type === "sign-up" && (
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="shad-form-item">
                        <FieldLabel htmlFor="form-rhf-demo-title shad-form-label">
                          Full Name
                        </FieldLabel>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="shad-input"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="shad-form-item">
                      <FieldLabel htmlFor="form-rhf-demo-title shad-form-label">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="shad-input"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="shad-form-message"
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field>
            <Button
              type="submit"
              className="form-submit-button"
              disabled={isLoading}
            >
              {type === "sign-in" ? "Sign In" : "Sign UP"}
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>
            {errorMessage && <p className="error-message">*{errorMessage}</p>}
            <div className="body-2 flex justify-center">
              <p className="text-light-100">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 font-medium text-brand"
              >
                {"  "}
                {type === "sign-in" ? "  sign-up" : "  sign-in"}
              </Link>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
};

export default AuthForm;
