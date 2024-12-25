function CustomerForm({ customerToEdit = {} }) {
  return (
    <p> {` 😐 Data can only be edited by ${customerToEdit.user.name} `} </p>
  );
}

export default CustomerForm;
