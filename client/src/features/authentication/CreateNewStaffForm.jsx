// import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateNewStaff } from "./useCreateNewStaff";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";

function CreateNewStaffForm({ displayDirection = "horizontal" }) {
  const { createNewStaff, isPending } = useCreateNewStaff();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  async function onSubmit(data) {
    createNewStaff({ ...data }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Name"
        error={errors?.name?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="text"
          id="name"
          disabled={isPending}
          placeholder="Enter Staff Full Name"
          {...register("name", { required: "*This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={errors?.email?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="email"
          id="email"
          placeholder="Enter Staff Email Address"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isPending}
          {...register("email", { required: "*This field is required" })}
        />
      </FormRow>

      <FormRow
        displayDirection={displayDirection}
        label="New Password"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          placeholder="Enter Staff Temporary Password"
          disabled={isPending}
          {...register("password", {
            required: "*This field is required",
            minLength: {
              value: 8,
              message: "Password should contain atleast 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        displayDirection={displayDirection}
        label="Confirm New Password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Enter Staff Temporary Password to confirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "*This field is required",
            validate: (value) =>
              String(value) === String(getValues().password) ||
              "*Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection}>
        <Button variation="primary" size="large" disabled={isPending}>
          {!isPending ? "Create New Staff" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewStaffForm;
