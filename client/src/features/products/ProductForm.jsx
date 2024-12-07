import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SelectBrands from "../brands/SelectBrands";
import SelectModels from "../models/SelectModels";
import SelectCategories from "../categories/SelectCategories";
import SelectSubCategories from "../subCategories/SelectSubCategories";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import SelectParts from "../parts/SelectParts";
import FormRowIncludedParts from "../../ui/FormRowIncludedParts";
import styled from "styled-components";
import Button from "../../ui/Button";

import { useCreateProduct } from "./useCreateProduct";
import supabase, { supabaseUrl } from "../../services/supabase";
import { useEditProduct } from "./useEditProduct";

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

const StyledInvisibleBox = styled.div`
  display: none;
`;

function ProductForm({ productToEdit = {}, onCloseModal }) {
  const {
    id: editId,
    brand,
    model,
    category,
    subCategory,
    includedParts,
    additionalInformations,
    descriptions,
    additionalImages: additionalImagesLinks,
    ...editValues
  } = productToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm({
    defaultValues: isEditSession
      ? {
          brand: brand.id,
          model: model.id,
          category: category.id,
          subCategory: subCategory.id,
          includedParts,
          additionalInformations,
          descriptions,
          ...editValues,
        }
      : {
          includedParts: [{ quantity: 1, parts: "" }],
          additionalInformations: [{ bulletPointNumber: "", info: "" }],
          descriptions: [{ bulletPointNumber: "", info: "" }],
        },
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

  const {
    fields: additionalInfoFields,
    append: additionalInfoAppend,
    remove: additionalInfoRemove,
  } = useFieldArray({
    control,
    name: "additionalInformations",
  });

  const {
    fields: descriptionFields,
    append: descriptionAppend,
    remove: descriptionRemove,
  } = useFieldArray({
    control,
    name: "descriptions",
  });

  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();

  const isWorking = isCreating || isEditing;

  async function onSubmit(data) {
    const hasMainImagePath = data.mainImage?.startsWith?.(supabaseUrl);

    const hasAdditionalImagePaths = isEditSession
      ? additionalImagesLinks.length !== 0 && data.additionalImages.length === 0
      : false;
    const parts = data.includedParts.map((part) => ({
      quantity: part.quantity,
      part: part.parts,
    }));

    const informations = data.additionalInformations.map(
      (information) => information.info
    );

    const description = data.descriptions.map(
      (description) => description.info
    );
    const imageName = `${data.name}-${Math.random()}-${Date.now()}`.replaceAll(
      "/",
      ""
    );
    const imagePath = hasMainImagePath
      ? data.mainImage
      : `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

    if (!hasMainImagePath) {
      const { error: storageError } = await supabase.storage
        .from("productImages")
        .upload(imageName, data.mainImage[0]);

      if (storageError)
        toast.error(
          "Product Image could not be uploaded and the product was not created"
        );
    }

    let additionalImagePaths;

    if (hasAdditionalImagePaths) {
      data.additionalImages = additionalImagesLinks;
    } else {
      const additionalImageNames = [];
      additionalImagePaths = [];
      const additionalImages = [...data.additionalImages];
      await additionalImages.map((image, i) => {
        let imageName = `${
          data.name
        }-${Math.random()}-${Date.now()}`.replaceAll("/", "");
        imageName = `${imageName}--${i + 1}`;
        const imagePath = `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

        const { error: storageError } = supabase.storage
          .from("productImages")
          .upload(imageName, data.additionalImages[i]);

        if (storageError)
          toast.error(
            "Product Image could not be uploaded and the product was not created"
          );

        return (
          additionalImageNames.push(imageName),
          additionalImagePaths.push(imagePath)
        );
      });
    }

    if (isEditSession) {
      editProduct(
        {
          ...data,
          includedParts: parts,
          additionalInformations: informations,
          descriptions: description,
          mainImage: imagePath,
          additionalImages: additionalImagePaths,
        },
        { onSuccess: onCloseModal }
      );
    } else
      createProduct(
        {
          ...data,
          includedParts: parts,
          additionalInformations: informations,
          descriptions: description,
          mainImage: imagePath,
          additionalImages: additionalImagePaths,
        },
        { onSuccess: () => reset() }
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
            disabled={isWorking}
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
            {...register("mainImage", {
              required: isEditSession ? false : "*This field is required",
              validate: (value) => {
                if (
                  !value.startsWith?.(supabaseUrl) &&
                  !value[0]?.type.startsWith("image")
                )
                  return "*Product Picture should be an image";
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Additional Images"
          error={errors?.additionalImages?.message}
        >
          <FileInput
            accept="image/*"
            multiple
            id="additionalImages"
            {...register("additionalImages", {
              validate: (value) => {
                for (let i = 0; i < value.length; i++) {
                  if (
                    !value[i].startsWith?.(supabaseUrl) &&
                    !value[i].type.startsWith("image")
                  )
                    return "*Additional Pictures should be an image";
                }
              },
            })}
          />
        </FormRow>

        <FormRowIncludedParts
          label="Description"
          error={errors?.descriptions?.root.message}
        >
          <StyledUl>
            {descriptionFields.map((item, index) => (
              <StyledLi key={`${item.id}${index}`}>
                <StyledInvisibleBox
                  {...register(`descriptions.${index}.bulletPointNumber`)}
                />
                <Controller
                  render={({ field }) => (
                    <Textarea
                      placeholder="Enter a brief description about the Product"
                      {...field}
                    ></Textarea>
                  )}
                  name={`descriptions.${index}.info`}
                  defaultValue={isEditSession && descriptions[index]}
                  control={control}
                />
                <Button
                  size="small"
                  variation="secondary"
                  type="button"
                  onClick={() => descriptionRemove(index)}
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
            onClick={() =>
              descriptionAppend({ bulletPointNumber: "", info: "" })
            }
          >
            Add Info
          </Button>
        </FormRowIncludedParts>

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
                  defaultValue={isEditSession && includedParts[index]?.part.id}
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

        <FormRowIncludedParts
          label="Additional Information"
          error={errors?.additionalInformations?.root.message}
        >
          <StyledUl>
            {additionalInfoFields.map((item, index) => (
              <StyledLi key={`${item.id}${index}`}>
                <StyledInvisibleBox
                  {...register(
                    `additionalInformations.${index}.bulletPointNumber`
                  )}
                />
                <Controller
                  render={({ field }) => (
                    <Textarea
                      placeholder="Enter Additional Information about the Product"
                      {...field}
                    ></Textarea>
                  )}
                  name={`additionalInformations.${index}.info`}
                  defaultValue={isEditSession && additionalInformations[index]}
                  control={control}
                />
                <Button
                  size="small"
                  variation="secondary"
                  type="button"
                  onClick={() => additionalInfoRemove(index)}
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
            onClick={() =>
              additionalInfoAppend({ bulletPointNumber: "", info: "" })
            }
          >
            Add Info
          </Button>
        </FormRowIncludedParts>

        <FormRow label="Video">
          <Input
            type="url"
            placeholder="Enter video link for the Product"
            id="video"
            {...register("video")}
          />
        </FormRow>
        <FormRow>
          <Button
            size="medium"
            variation="secondary"
            type={isEditSession ? "button" : "reset"}
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button size="large" variation="primary" disabled={isWorking}>
            {isEditSession ? "Edit Product" : "Create Product"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default ProductForm;
