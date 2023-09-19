// represent the home page route of the app {localhost:3000/}
import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered hacking and educational prompts</span>
    </h1>
    <p className='desc text-center'>
      An open-source AI prompting tool for modern world to
      discover, create and share prompts
    </p>

    <Feed />
  </section>
);

export default Home;
