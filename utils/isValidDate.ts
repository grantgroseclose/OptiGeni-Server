const isValidDate = (date: Date): boolean => {
    return !isNaN(date.getTime());
}

export default isValidDate;