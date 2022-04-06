function SignupPage() {
  //send the form data back to the server to create a new user
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/';
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <form>
      <div>
        <center>
          <h1>Signup</h1>
          Username:<input type="text" name="username" placeholder="username"></input>
          Email:<input type="text" name="email" placeholder="email"></input>
          Password:<input type="text" name="password" placeholder="password"></input>
          Are you a channel owner?<input type="checkbox" name="channel_owner"></input>
          <button onClick={handleSubmit}>Signup</button>
        </center>
      </div>
    </form>
  );
}

export default SignupPage;
