import React, { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const JobPostingDetails = ({ posting }) => {
  return (
    <div>
      <h3>{posting.jobTitle}</h3>
      <p>{posting.company}</p>
      <p>{posting.location}</p>
      <p>{posting.decription}</p>
      <p>{posting.requirements}</p>
      <p>{posting.salary}</p>
    </div>
  );
};

export default JobPostingDetails;
