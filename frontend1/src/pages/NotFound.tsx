import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Not Found – wrong ocean, bro 🌊</p>
      <a href="/" style={styles.link}>🏄‍♂️ Back to safety</a>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    fontFamily: "Arial, sans-serif",
  },
  code: {
    fontSize: "6rem",
    margin: 0,
    color: "#0077b6",
  },
  message: {
    fontSize: "1.5rem",
    margin: "1rem 0",
    color: "#023e8a",
  },
  link: {
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    backgroundColor: "#00b4d8",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default NotFound;
