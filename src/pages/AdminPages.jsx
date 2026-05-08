import React from 'react';
import './Admin.css';

export const Login = () => {
  return (
    <div className="admin-page container">
      <div className="login-container glass">
        <h1>Admin Access</h1>
        <form>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export const Admin = () => {
  return (
    <div className="admin-page container">
      <div className="admin-dashboard">
        <h1>Dashboard</h1>
        <p>This is where you will upload your 4K videos.</p>
        <button className="btn btn-primary">+ Upload New Video</button>
      </div>
    </div>
  );
};
