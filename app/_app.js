import '../styles/globals.css'; // Tailwind & global styles

function MyApp({ Component, pageProps }) {
  // If you need a global store, consider using React Context or a state management solution like Redux or Zustand.
  return (
    <div className="font-sans">
      {/* You can add a NavBar and Footer here or in a separate Layout component */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
