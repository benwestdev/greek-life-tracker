import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import * as STATUSES from "../../constants/statuses";

const PointsCard = ({ attendances }) => {
  const [alphaPoints, setAlphaPoints] = useState(1);
  const [comPoints, setComPoints] = useState(0);
  const [sisPoints, setSisPoints] = useState(0);

  let aPoints = 0;
  let cPoints = 0;
  let sPoints = 0;

  useEffect(() => {
    console.log("here 1");
    attendances.forEach(attendance => {
      if (attendance.eventType === STATUSES.ALPHA_TYPE) {
        if (attendance.status === STATUSES.APPROVED) {
          aPoints += Number(attendance.points);
        }
      } else if (attendance.eventType === STATUSES.COM_SERVICE_TYPE) {
        if (attendance.status === STATUSES.APPROVED) {
          cPoints += Number(attendance.points);
        }
      } else if (attendance.eventType === STATUSES.SISTERHOOD_TYPE) {
        if (attendance.status === STATUSES.APPROVED) {
          sPoints += Number(attendance.points);
        }
      }
    });
    setAlphaPoints(aPoints);
    setComPoints(cPoints);
    setSisPoints(sPoints);
  }, [attendances]);

  return (
    <Row>
      <div className="col">
        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
          <div>
            <span className="display-3" style={{ display: "block" }}>
              {comPoints}
            </span>
            <span className="description">{STATUSES.COM_SERVICE_TYPE}</span>
          </div>
          <div>
            <span className="display-3" style={{ display: "block" }}>
              {alphaPoints}
            </span>
            <span className="description">{STATUSES.ALPHA_TYPE}</span>
          </div>
          <div>
            <span className="display-3" style={{ display: "block" }}>
              {sisPoints}
            </span>
            <span className="description">{STATUSES.SISTERHOOD_TYPE}</span>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default PointsCard;
