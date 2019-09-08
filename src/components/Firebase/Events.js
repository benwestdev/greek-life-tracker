import React, { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const FirestoreCollection = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection("events"),
    {}
  );

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{" "}
            {value.docs.map(doc => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{" "}
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
};

export { FirestoreCollection };
