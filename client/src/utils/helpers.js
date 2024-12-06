export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(date));

export function formatStatus(status) {
  let splitStatus;
  if (
    status === "cancelled" ||
    status === "paid" ||
    status === "pending" ||
    status === "cod" ||
    status === "upi" ||
    status === "cards" ||
    status === "netbanking"
  )
    return status.charAt(0).toUpperCase() + status.slice(1);

  splitStatus = status.split("_")[1].trim();
  return splitStatus.charAt(0).toUpperCase() + splitStatus.slice(1);
}
