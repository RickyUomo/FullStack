const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ course }) => {
    const parts = course.parts;
    const sum = parts.reduce((total, part) => total + part.exercises, 0);

    return <p>Total of {sum} courses</p>;
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
    const parts = course.parts;

    return (
        <>
            {parts.map(p => <Part key={p.id} part={p} />)}
        </>
    );
}

const Course = ({ courses }) => {

    return (
        <>
            {courses.map((course) => {
                return (
                    <>
                        <Header name={course.name} />
                        <Content course={course} />
                        <Total course={course} />
                    </>
                );
            })}
        </>
    )
}

export default Course;