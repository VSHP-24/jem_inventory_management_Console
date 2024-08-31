import { Controller, useFieldArray, useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectBrands from "../brands/SelectBrands";
import SelectModels from "../models/SelectModels";
import SelectCategories from "../categories/SelectCategories";
import SelectSubCategories from "../subCategories/SelectSubCategories";
import Textarea from "../../ui/Textarea";

import { useCreateProduct } from "./useCreateProduct";
import supabase, { supabaseUrl } from "../../services/supabase";
import FileInput from "../../ui/FileInput";
import SelectParts from "../parts/SelectParts";
import FormRowIncludedParts from "../../ui/FormRowIncludedParts";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledUl = styled.ul`
  padding: 0;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledInputQuantity = styled(Input)`
  width: 5rem;
`;
const StyledSelect = styled(Select)`
  width: 75%;
`;

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm({
    defaultValues: {
      includedParts: [{ quantity: 1, parts: "" }],
    },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "includedParts",
    rules: {
      required: "*This field is required",
      validate: (value) => {
        let message = "";

        value.forEach((part) => {
          if (Number(part.quantity) < 1)
            return (message = "*Quantity cannot be less than 1");
          if (!part.parts)
            return (message = "*Minimum 1 part should be selected");
        });
        if (message) return message;
      },
    },
  });

  const { isCreating, createProduct } = useCreateProduct();

  async function onSubmit(data) {
    const parts = data.includedParts.map((part) => ({
      quantity: part.quantity,
      part: part.parts,
    }));
    const imageName = `${data.name}-${Math.random()}-${Date.now()}`.replaceAll(
      "/",
      ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("productImages")
      .upload(imageName, data.mainImage[0]);

    if (storageError)
      throw new Error(
        "Product Image could not be uploaded and the product was not created"
      );

    const additionalImageNames = [];
    const additionalImagePaths = [];
    const additionalImages = [...data.additionalImage];
    await additionalImages.map((image, i) => {
      let imageName = `${data.name}-${Math.random()}-${Date.now()}`.replaceAll(
        "/",
        ""
      );
      imageName = `${imageName}--${i + 1}`;
      const imagePath = `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

      const { error: storageError } = supabase.storage
        .from("productImages")
        .upload(imageName, data.additionalImage[i]);

      if (storageError)
        throw new Error(
          "Product Image could not be uploaded and the product was not created"
        );

      return (
        additionalImageNames.push(imageName),
        additionalImagePaths.push(imagePath)
      );
    });

    createProduct(
      {
        ...data,
        includedParts: parts,
        mainImage: imagePath,
        additionalImages: additionalImagePaths,
      },
      { onSuccess: (data) => reset() }
    );
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
            placeholder="Enter a Product Name"
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

        <FormRow label="Category" error={errors?.category?.message}>
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
            placeholder="Enter Price of the Product"
            {...register("price", {
              required: "*This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Discount Price" error={errors?.discountPrice?.message}>
          <Input
            type="number"
            id="discountPrice"
            placeholder="Enter Discount Price"
            {...register("discountPrice", {
              validate: (value) =>
                Number(value) < Number(getValues().price) ||
                "*Discount Price is greater than or equal to regular price",
            })}
          />
        </FormRow>

        <FormRow label="Size">
          <Input
            type="text"
            placeholder="Enter Size of the Product"
            id="size"
            {...register("size")}
          />
        </FormRow>

        <FormRow label="Combo">
          <Input
            type="text"
            placeholder="Enter Combo of the Products"
            id="combo"
            {...register("combo")}
          />
        </FormRow>

        <FormRow label="Main Image" error={errors?.mainImage?.message}>
          <FileInput
            accept="image/*"
            id="mainImage"
            {...register("mainImage", { required: "*This field is required" })}
          />
        </FormRow>

        <FormRow label="Additional Images">
          <FileInput
            accept="image/*"
            multiple
            id="additionalImage"
            {...register("additionalImage")}
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea
            type="text"
            placeholder="Enter a brief description about the Product"
            id="description"
            {...register("description")}
          />
        </FormRow>

        <FormRowIncludedParts
          label="Included Parts"
          error={errors?.includedParts?.root.message}
        >
          <StyledUl>
            {fields.map((item, index) => (
              <StyledLi key={item.id}>
                <StyledInputQuantity
                  {...register(`includedParts.${index}.quantity`)}
                />
                <Controller
                  render={({ field }) => (
                    <StyledSelect {...field}>
                      <SelectParts />
                    </StyledSelect>
                  )}
                  name={`includedParts.${index}.parts`}
                  control={control}
                />
                <Button
                  size="small"
                  variation="secondary"
                  type="button"
                  onClick={() => remove(index)}
                >
                  &times;
                </Button>
              </StyledLi>
            ))}
          </StyledUl>
          <Button
            size="medium"
            variation="primary"
            type="button"
            onClick={() => append({ quantity: 1, parts: "" })}
          >
            Add Part
          </Button>
        </FormRowIncludedParts>

        <FormRow label="Additional Information">
          <Input
            type="text"
            id="additionalInformation"
            {...register("additionalInformation")}
          />
        </FormRow>

        <FormRow label="Video">
          <Input
            type="text"
            placeholder="Enter video link for the Product"
            id="video"
            {...register("video")}
          />
        </FormRow>
        <FormRow>
          <Button size="medium" variation="secondary" type="reset">
            Cancel
          </Button>
          <Button size="large" variation="primary" disabled={isCreating}>
            Create
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default ProductForm;
