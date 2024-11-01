const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return (
    <div>
      <h4>{errorMessage}</h4>
    </div>
  );
};

export { Notify };
