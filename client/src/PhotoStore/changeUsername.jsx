import React from 'react'

const changeUsername = () => {
    
  return (
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
          alert("You need to be logged in to change your username");
          return;
        }
        
        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify({
            ...JSON.parse(localStorage.getItem("userInfo")),
            username: data.newUsername
          }));
          alert("Username changed successfully");
        } else {
          alert("Failed to change username");
        }
      }}>
        <label>
          New username:
          <input type="text" name="newUsername" />
        </label>
        <button type="submit">Save</button>
      </form>
      
    </div>
  )
}

export default changeUsername
