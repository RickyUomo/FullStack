
const Header = (props) => {
  return (
    <div>
      <h1>Title: {props.course}</h1>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <h1>Name: {props.name}</h1>
      <h2>Number {props.number}</h2>
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part name="first" number={1} />
      <Part name="second" number={2} />
      <Part name="third" number={3} />
    </div>

  );
}

const Total = (props) => {
  return (
    <div>
      <h1>Toal Execrise: {props.total}</h1>
    </div>
  );
}

const App = () => {
  // const-definitions
  const course = 'full-stack open course';
  const content = 'Learn full-stack awesome';
  const total = '2';

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={total} />
    </div>
  )
}

export default App