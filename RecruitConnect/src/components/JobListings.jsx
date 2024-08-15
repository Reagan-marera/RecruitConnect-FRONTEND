import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome styles
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify styles
import ConfirmationModal from './ConfirmationModal'; // Import the custom modal

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [actionType, setActionType] = useState('');
  const { token, employerId } = useAuth(); // Use AuthContext

  // Mock data
  const mockJobs = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Develop and maintain software applications.",
      location: "San Francisco, CA",
      created_at: "2024-08-01T10:00:00Z",
      benefits: "Health, Dental, Vision",
      responsibilities: "Coding, Debugging, Testing",
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Manage product lifecycle and coordinate with teams.",
      location: "New York, NY",
      created_at: "2024-08-05T12:00:00Z",
      benefits: "401(k), Paid Time Off",
      responsibilities: "Planning, Market Research, Stakeholder Communication",
    },
    {
      id: 3,
      title: "UX Designer",
      description: "Design user experiences and interfaces.",
      location: "Austin, TX",
      created_at: "2024-08-10T09:00:00Z",
      benefits: "Flexible Hours, Remote Work Option",
      responsibilities: "Design, Research, Prototyping",
    },
  ];

  useEffect(() => {
    // Mock fetching jobs
    const fetchJobs = () => {
      try {
        // Replace this with API call when using real data
        setJobs(mockJobs);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        toast.error("Error fetching jobs. Please try again later.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = (job) => {
    setCurrentJob(job);
    setActionType('delete');
    setIsModalOpen(true);
  };

  const handleUpdate = (job) => {
    setCurrentJob(job);
    setActionType('update');
    setIsModalOpen(true);
  };

  const confirmAction = async (updatedJob) => {
    try {
      if (actionType === 'delete' && currentJob) {
        setJobs(jobs.filter(job => job.id !== currentJob.id));
        toast.success("Job deleted successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      } else if (actionType === 'update' && currentJob) {
        setJobs(jobs.map(job => job.id === currentJob.id ? { ...job, ...updatedJob } : job));
        toast.success("Job updated successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(`Error ${actionType === 'delete' ? 'deleting' : 'updating'} job. Please try again later.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    }
    setIsModalOpen(false);
    setCurrentJob(null);
    setActionType('');
  };

  const cancelAction = () => {
    setIsModalOpen(false);
    setCurrentJob(null);
    setActionType('');
  };

  return (
    <div>
      <ToastContainer /> {/* Include ToastContainer to render toast notifications */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmAction}
        onCancel={cancelAction}
        job={currentJob}
        actionType={actionType}
      />
      {loading && <p>Loading...</p>}
      {!loading && !jobs.length && <p>No jobs found.</p>}
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
          }}
        >
          <h3 style={{ fontSize: '1.5em', fontWeight: '600' }}>{job.title}</h3>
          <p style={{ color: '#4a4a4a' }}>{job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
          <p><strong>Benefits:</strong> {job.benefits}</p>
          <p><strong>Responsibilities:</strong> {job.responsibilities}</p>

          <div style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <button
              onClick={() => handleUpdate(job)}
              style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <i className="fas fa-edit" style={{ marginRight: '5px' }}></i> Update
            </button>
            <button
              onClick={() => handleDelete(job)}
              style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#dc3545',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <i className="fas fa-trash-alt" style={{ marginRight: '5px' }}></i> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
