import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useCreateNewStaff } from "./useCreateNewStaff";
import { useEditUser } from "../users/useEditUser";

function CreateNewStaffForm({
  userToEdit = {},
  displayDirection = "horizontal",
  onCloseModal,
}) {
  ////////////////////////////////////////////////
  // AUTOFILL EXISTING USER DETAILS IN EDIT SESSION
  ////////////////////////////////////////////////

  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: isEditSession ? { ...editValues } : {},
  });

  const { createNewStaff, isPending } = useCreateNewStaff();
  const { isEditing, editUser } = useEditUser();

  const isWorking = isPending || isEditing;

  async function onSubmit(data) {
    if (isEditSession) {
      editUser({ ...data }, { onSuccess: onCloseModal });
    } else createNewStaff({ ...data }, { onSuccess: () => reset() });
  }

  function onError(errors) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Name"
        error={errors?.name?.message}
        displayDirection={displayDirection}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
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
          autoComplete="username"
          disabled={isWorking}
          {...register("email", { required: "*This field is required" })}
        />
      </FormRow>

      {/* Password should not be edited in this form in Edit Session , use RESET or FORGOT PASSWORD form */}
      {!isEditSession && (
        <>
          <FormRow
            displayDirection={displayDirection}
            label="New Password"
            error={errors?.password?.message}
          >
            <Input
              type="password"
              id="password"
              placeholder="Enter Staff Temporary Password"
              disabled={isWorking}
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
              disabled={isWorking}
              {...register("passwordConfirm", {
                required: "*This field is required",
                validate: (value) =>
                  String(value) === String(getValues().password) ||
                  "*Passwords do not match",
              })}
            />
          </FormRow>
        </>
      )}

      <FormRow displayDirection={displayDirection}>
        <Button variation="primary" size="large" disabled={isWorking}>
          {isEditSession ? "Edit Staff" : "Create New Staff"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewStaffForm;
