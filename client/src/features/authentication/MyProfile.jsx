import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useUser } from "./useUser";
import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateMyProfile } from "./useUpdateMe";

function MyProfile({ displayDirection = "horizontal" }) {
  const [isUpdateSession, setIsUpdateSession] = useState(false);
  const { isPending, user } = useUser();
  const { isEditing, updateMyProfile } = useUpdateMyProfile();

  const isWorking = isPending || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user || {},
  });

  async function onSubmit(data) {
    if (!isUpdateSession) return setIsUpdateSession(true);

    if (isUpdateSession) {
      updateMyProfile({ ...data }, { onSuccess: setIsUpdateSession(false) });
    }
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
          disabled={isWorking || !isUpdateSession}
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
          disabled={isWorking || !isUpdateSession}
          {...register("email", { required: "*This field is required" })}
        />
      </FormRow>

      <FormRow displayDirection={displayDirection}>
        <Button variation="primary" size="large" disabled={isWorking}>
          {!isUpdateSession ? (
            "Edit My Profile"
          ) : !isWorking ? (
            "Update My Profile"
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default MyProfile;
