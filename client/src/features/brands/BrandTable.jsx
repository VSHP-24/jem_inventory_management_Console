import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";

import { useGetBrands } from "./useGetBrands";

function BrandTable() {
  const { isPending, brands } = useGetBrands();

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr  .5fr">
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={brands}
        render={(brand, i) => (
          <BrandRow brand={brand} index={i} key={brand.id} />
        )}
      />
    </Table>
  );
}

export default BrandTable;
