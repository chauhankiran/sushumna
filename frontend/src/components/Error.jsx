const Error = ({ message }) => {
    if (!message) return null;
    return <p className="mb-4 red">{message}</p>;
};

export default Error;
