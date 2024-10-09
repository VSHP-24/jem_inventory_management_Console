import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BrandRow from "./BrandRow";

import { useGetBrands } from "./useGetBrands";

function BrandTable() {
  const { isPending, brands } = useGetBrands();

  function DeletedBrands() {
    return (
      <Table
        columns="2fr 5fr .5fr"
        modalWindowedTable={true}
        menuListRequired={false}
      >
        <Table.Header>
          <div>Sl No.</div>
          <div>Name</div>
        </Table.Header>

        <Table.Body
          data={brands.filter((brand) => brand.isDeleted)}
          render={(brand, i) => (
            <BrandRow
              brand={brand}
              index={i}
              key={brand.id}
              id={brand.id}
              deletedTable={true}
            />
          )}
        />
      </Table>
    );
  }

  if (isPending) return <Spinner />;

  return (
    <Table columns=".5fr 1fr .5fr" deletedTableContent={<DeletedBrands />}>
      <Table.Header>
        <div>Sl No.</div>
        <div>Name</div>
      </Table.Header>

      <Table.Body
        data={brands.filter((brand) => !brand.isDeleted)}
        render={(brand, i) => (
          <BrandRow brand={brand} index={i} key={brand.id} id={brand.id} />
        )}
      />
    </Table>
  );
}

export default BrandTable;
