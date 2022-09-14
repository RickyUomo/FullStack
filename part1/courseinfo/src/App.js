
const Header = (props) => {
  return (
    <div>
      <h1>Title: {props.course.name}</h1>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <h1>Name: {props.name}</h1>
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts.parts[0].name} />
      <Part name={props.parts.parts[1].name} />
      <Part name={props.parts.parts[2].name} />
    </div>

  );
}

const Total = (props) => {
  return (
    <div>
      <h1>Toal Execrise: {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</h1>
    </div>
  );
}

// 1.1, 1.2 
// const App = () => {
//   // const-definitions
//   const course = 'full-stack open course';
//   const content = 'Learn full-stack awesome';
//   const total = '2';

//   return (
//     <div>
//       <Header course={course} />
//       <Content content={content} />
//       <Total total={total} />
//     </div>
//   )
// }

// 1.3
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App