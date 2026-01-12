const Notification = ({ message, isSuccessful }) => {
  if (message === null) { 
    return null;
  }

  return (
      <p className={isSuccessful ? 'successful-notification' : 'unsuccessful-notification'}>
      {message}
    </p>
  );
}

export default Notification;