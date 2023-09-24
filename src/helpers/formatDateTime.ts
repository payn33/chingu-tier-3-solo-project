const formatDateTime = (timestamp: number, time?: boolean): string => {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (time) return `${hours}:${minutes}`;

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default formatDateTime;
