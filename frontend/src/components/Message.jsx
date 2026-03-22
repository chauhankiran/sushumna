const Message = ({ message }) => {
    if (!message) return null;
    return <p className="mb-4 green">{message}</p>;
};

export default Message;
