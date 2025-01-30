function CustomerForm({ customerToEdit = {} }) {
  return (
    <p>
      {" "}
      {` 😐 Data can only be edited by `}{" "}
      <strong>{`${customerToEdit.user.name}`}</strong>{" "}
    </p>
  );
}

export default CustomerForm;
