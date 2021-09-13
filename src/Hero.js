import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { ref, onValue, off } from "firebase/database";
import { database } from "./fire";

const Hero = (props) => {
  const [pob, setPob] = useState(null);
  const { handleLogout, user, pid } = props;
  useEffect(() => {
    const Ref = ref(database, `/users/${pid}`);
    onValue(Ref, (snapshot) => {
      console.log(snapshot.val());
      setPob(snapshot.val());
    });
  }, [pid]);
  if (!pob) return <div className="loadScreen">Loading...</div>;
  return (
    <section className="hero">
      <nav>
        <h2>Welcome, {user.email}</h2>

        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="background">
        <ProfileCard
          name={user.email}
          city={pob.placeOfBirth}
          dob={pob.dob}
        ></ProfileCard>
      </div>
    </section>
  );
};

export default Hero;
