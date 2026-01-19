import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewCamper from "./NewCamper";
import API_BASE_URL from "../config";

function Home() {
  const [campers, setCampers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities`)
      .then((r) => r.json())
      .then(setActivities);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/campers`)
      .then((r) => r.json())
      .then(setCampers);
  }, []);

  function handleAddCamper(newCamper) {
    setCampers((campers) => [...campers, newCamper]);
  }

  function handleDeleteActivity(id) {
    fetch(`${API_BASE_URL}/activities/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setActivities((activities) =>
          activities.filter((activity) => activity.id !== id)
        );
      }
    });
  }

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <span>
              {activity.name} | Difficulty: {activity.difficulty}
            </span>
            <button onClick={() => handleDeleteActivity(activity.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Campers</h2>
      <ul>
        {campers.map((camper) => (
          <li key={camper.id}>
            <span>
              {camper.name}, age {camper.age}
            </span>
            <Link to={`/campers/${camper.id}`}>View Activities</Link>
          </li>
        ))}
      </ul>
      <hr />
      <NewCamper onAddCamper={handleAddCamper} />
    </div>
  );
}

export default Home;
