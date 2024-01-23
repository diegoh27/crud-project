import Card from "./card";

const Cards = ({ tasks }) => {
  return (
    <div className="grid grid-cols-3  ">
      {tasks?.map((task, index) => (
        <Card task={task} key={index} />
      ))}
    </div>
  );
};

export default Cards;
