function About() {
  return (
    <div className="aboutPage container mt-4">
      <div className="row">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h1 className="mt-4">Credits</h1>
            <h3>Assets</h3>
            <a href="https://unsplash.com/photos/ycVFts5Ma4s?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">
              Homepage splash image from Hannah Morgan
            </a>
            <a href="http://fakestoreapi.com/">
              "Fake Store API" by MohammadReza Keikavousi
            </a>

            <h1 className="mt-3">Technology Stack</h1>
            <h3>Frontend</h3>
            <a href="https://reactjs.org/">ReactJS - Frontend</a>
            <a href="https://getbootstrap.com/">Bootstrap - Styling</a>
            <a href="https://sass-lang.com/">Sass - Styling</a>
          </div>
          <div className="d-flex flex-column mt-4 mx-auto">
            <h3>Favorite Books</h3>
            <a href="https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654">
              The Design of Everyday Things
            </a>
            <a href="https://www.amazon.com/Originals-audiobook/dp/B01A7Q61LI/">
              Originals
            </a>
            <a href="https://www.amazon.com/Triumph-City-Greatest-Invention-Healthier/dp/0143120549/">
              Triumph of the City
            </a>

            <h3 className="mt-3">Fun Coding Readings</h3>
            <a href="https://divyanshu013.dev/blog/temporal-dead-zone/">
              Temporal Dead Zone
            </a>
            <a href="https://joyofcode.xyz/dark-mode-favicon">
              Favicon That Works For Light And Dark Mode
            </a>
            <a href="https://betterexplained.com/articles/understanding-quakes-fast-inverse-square-root/">
              Understanding Quake’s Fast Inverse Square Root
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
