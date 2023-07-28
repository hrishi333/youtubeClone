function convertToTimeAgo(createdAt) {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - createdDate.getTime();

    // Convert the time difference to seconds, minutes, hours, days, weeks, months, or years
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(daysDiff / 30);
    const yearsDiff = Math.floor(daysDiff / 365);

    // Construct the "time ago" format
    let timeAgo = '';
    if (secondsDiff < 60) {
        timeAgo = `${secondsDiff} seconds ago`;
    } else if (minutesDiff < 60) {
        timeAgo = `${minutesDiff} minutes ago`;
    } else if (hoursDiff < 24) {
        timeAgo = `${hoursDiff} hours ago`;
    } else if (daysDiff < 7) {
        timeAgo = `${daysDiff} days ago`;
    } else if (weeksDiff < 4) {
        timeAgo = `${weeksDiff} weeks ago`;
    } else if (monthsDiff < 12) {
        timeAgo = `${monthsDiff} months ago`;
    } else if (yearsDiff === 1) {
        timeAgo = `1 year ago`;
    } else {
        timeAgo = `${yearsDiff} years ago`;
    }

    return timeAgo;
}

export default convertToTimeAgo;
// Usage example
/*const createdAt = '2023-07-10T10:25:00Z';
const timeAgo = convertToTimeAgo(createdAt);
console.log(timeAgo); // Output: "3 years ago"*/
