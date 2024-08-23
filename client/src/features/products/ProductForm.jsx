import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectBrands from "../brands/SelectBrands";
import SelectModels from "../models/SelectModels";
import SelectCategories from "../categories/SelectCategories";
import SelectSubCategories from "../subCategories/SelectSubCategories";
import SelectParts from "../parts/SelectParts";
import Textarea from "../../ui/Textarea";

import { useCreateProduct } from "./useCreateProduct";

function ProductForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { isCreating, createProduct } = useCreateProduct();

  function onSubmit(data) {
    createProduct({ ...data }, { onSuccess: (data) => reset() });
  }

  function onError(errors) {
    return null;
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Product Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isCreating}
            {...register("name", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Brand" error={errors?.brand?.message}>
          <Select
            name="brand"
            id="brand"
            {...register("brand", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectBrands />
          </Select>
        </FormRow>

        <FormRow label="Model" error={errors?.model?.message}>
          <Select
            name="model"
            id="model"
            {...register("model", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectModels />
          </Select>
        </FormRow>

        <FormRow label="Category" error={errors?.Category?.message}>
          <Select
            name="category"
            id="category"
            {...register("category", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectCategories />
          </Select>
        </FormRow>

        <FormRow label="SubCategory" error={errors?.subCategory?.message}>
          <Select
            name="subCategory"
            id="subCategory"
            {...register("subCategory", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectSubCategories />
          </Select>
        </FormRow>

        <FormRow label="Price" error={errors?.price?.message}>
          <Input
            type="number"
            id="price"
            {...register("price", {
              required: "*This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Discount Price" error={errors?.discountPrice?.message}>
          <Input
            type="number"
            id="discountPrice"
            {...register("discountPrice", {
              validate: (value) =>
                Number(value) < Number(getValues().price) ||
                "Discount Price is greater than or equal to regular price",
            })}
          />
        </FormRow>

        <FormRow label="Size">
          <Input type="text" id="size" {...register("size")} />
        </FormRow>

        <FormRow label="Combo">
          <Input type="text" id="combo" {...register("combo")} />
        </FormRow>

        <FormRow label="Main Image" error={errors?.mainImage?.message}>
          <Input
            type="text"
            id="mainImage"
            {...register("mainImage", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Additional Images">
          <Input
            type="text"
            id="additionalImage"
            {...register("additionalImage")}
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea type="text" id="description" {...register("description")} />
        </FormRow>

        <FormRow label="Included Parts" error={errors?.includedParts?.message}>
          <Select
            name="includedParts"
            id="includedParts"
            {...register("includedParts", {
              required: "*This field is required",
              validate: (value) => {
                if (!value) return "*This field is required";
              },
            })}
          >
            <SelectParts />
          </Select>
        </FormRow>

        <FormRow label="Additional Information">
          <Input
            type="text"
            id="additionalInformation"
            {...register("additionalInformation")}
          />
        </FormRow>

        <FormRow label="Video">
          <Input type="text" id="video" {...register("video")} />
        </FormRow>
        <FormRow>
          <button type="reset">Cancel</button>
          <button disabled={isCreating}>Create</button>
        </FormRow>
      </Form>
    </>
  );
}

export default ProductForm;
