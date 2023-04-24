export function handleChange(e, stateSetter) {
    const { name, value } = e.target;
    stateSetter((prevState) => {
        return {
            ...prevState,
            [name]: value,
        };
    });
}