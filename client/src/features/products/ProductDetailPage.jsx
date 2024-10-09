import styled from "styled-components";
import Table from "../../ui/Table";
import ProductDetailPageImageView from "./PrdocutDetailPageImageView";
import Heading from "../../ui/Heading";

const StyledDetailPage = styled.div`
  border: 1px solid var(--color-grey-700);
  display: grid;
  grid-template-columns: 40rem 30rem;
  font-size: 1.4rem;
  padding: 2rem;
  width: 100%;
`;

const StyledProductDetails = styled.main``;

const StyledProductImages = styled.aside`
  height: 30rem;
`;

const StyledRow = styled.div`
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 10rem 1fr;
`;

const StyledHeader = styled.div`
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const StyledDetails = styled.div`
  font-weight: 300;
`;

const StyledHeading = styled(Heading)`
  padding-bottom: 2rem;
`;

function ProductDetailPage({ product }) {
  const {
    name,
    brand,
    model,
    category,
    subCategory,
    price,
    discountPrice,
    size,
    combo,
    description,
    includedParts,
    additionalInformation,
    video,
    additionalImages,
    mainImage,
  } = product;

  return (
    <StyledDetailPage>
      <StyledProductDetails>
        <StyledHeading as="h2">PRODUCT DETAILS</StyledHeading>
        <StyledRow>
          <StyledHeader>Name</StyledHeader>
          <StyledDetails>{name ? name : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Brand</StyledHeader>
          <StyledDetails>
            {brand.name ? brand.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Bike Model</StyledHeader>
          <StyledDetails>
            {model.name ? model.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Category</StyledHeader>
          <StyledDetails>
            {category.name ? category.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>SubCategory</StyledHeader>
          <StyledDetails>
            {subCategory.name ? subCategory.name : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Price</StyledHeader>
          <StyledDetails>{price ? `₹ ${price}` : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Discount Price</StyledHeader>
          <StyledDetails>
            {discountPrice ? discountPrice : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Size</StyledHeader>
          <StyledDetails>{size ? size : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Combo</StyledHeader>
          <StyledDetails>{combo ? combo : "--- NA ---"}</StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Description</StyledHeader>
          <StyledDetails>
            {description ? description : "--- NA ---"}
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Included Parts</StyledHeader>
          <StyledDetails>
            <Table columns="1fr 1fr" menuListRequired={false}>
              <Table.Header>
                <div>Part</div>
                <div>Quantity</div>
              </Table.Header>
              <Table.Body
                data={includedParts}
                render={(part) => (
                  <Table.Row columns="10rem 10rem" key={part.id}>
                    <div>{part.part.name}</div>
                    <div>{part.quantity}</div>
                  </Table.Row>
                )}
              />
            </Table>
          </StyledDetails>
        </StyledRow>

        <StyledRow>
          <StyledHeader>Additional Information</StyledHeader>
          <StyledDetails>
            {additionalInformation ? additionalInformation : "--- NA ---"}
          </StyledDetails>
        </StyledRow>
      </StyledProductDetails>

      <StyledProductImages>
        <ProductDetailPageImageView
          name={name}
          additionalImages={additionalImages}
          mainImage={mainImage}
          video={video}
        />
      </StyledProductImages>
    </StyledDetailPage>
  );
}

export default ProductDetailPage;
