export default function Home() {
  return (
    <main style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      fontFamily: "Arial"
    }}>
      <h1>FertilityCareHub</h1>
      <p>Trusted guidance for your fertility journey.</p>
      <button style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "5px"
      }}>
        Coming Soon
      </button>
    </main>
  );
}
