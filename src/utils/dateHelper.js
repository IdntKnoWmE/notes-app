

export const getTodayDateTime = () => {

    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());

    // Format time in hour:minute AM/PM
    const time = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const formattedTodayDate = `${time} ${day}/${month}/${year}`;
    return formattedTodayDate;
}