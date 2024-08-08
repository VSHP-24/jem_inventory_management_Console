import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

function Products() {
  const {
    isPending,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <ul>
        {products.map((el, i) => (
          <li key={el.name}>
            <p>Name: {el.name}</p>
            <p>Brand: {el.brand.name}</p>
            <p>Model:{el.model.name}</p>
            <p>Category:{el.category.name}</p>
            <p>SubCategory:{el.subCategory.name}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
