// this is the main entry point for the app and all of the components are wrapped within it
import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Hacking Prompts",
  description: "Discover & Share AI hacking Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {/* we get the children from the prompts */}
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
