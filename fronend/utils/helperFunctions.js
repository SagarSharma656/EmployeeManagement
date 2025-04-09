export const dateFormate = (isoDate) => {
    const dateObj = new Date(isoDate);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}