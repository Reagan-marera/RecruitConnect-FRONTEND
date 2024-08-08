import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobPostingDetails from './JobPostingDetails';

const JobPostingList = () => {
    const [jobPostings, setJobPostings] =useState([]);
      useEffect(() => {
        fetch('/api/jobpostings')
        .then(response => response.json())
        .then(data => setJobPostings(data));
      },[]);
       return (
        <div>
            <h2>Your Job Posting</h2>
            <ul>
                {jobPostings.maps((postings) =>(
                    <li key={postings.id}>
                        <JobPostingDetails postings={posting} />

                    </li>
                ))}
                </ul>
            </div>
       );
    };
    

       export default JobPostingList


      
