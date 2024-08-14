// ConfirmationModal.js
import React, { useState, useEffect } from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, job, actionType }) => {
  const [newTitle, setNewTitle] = useState(job ? job.title : '');
  const [newDescription, setNewDescription] = useState(job ? job.description : '');
  const [newLocation, setNewLocation] = useState(job ? job.location : '');
  const [newBenefits, setNewBenefits] = useState(job ? job.benefits : '');
  const [newResponsibilities, setNewResponsibilities] = useState(job ? job.responsibilities : '');

  useEffect(() => {
    if (job) {
      setNewTitle(job.title);
      setNewDescription(job.description);
      setNewLocation(job.location);
      setNewBenefits(job.benefits);
      setNewResponsibilities(job.responsibilities);
    }
  }, [job]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (actionType === 'update') {
      onConfirm({
        title: newTitle,
        description: newDescription,
        location: newLocation,
        benefits: newBenefits,
        responsibilities: newResponsibilities
      });
    } else {
      onConfirm();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <h3 style={{ fontSize: '1.25em', fontWeight: '600', marginBottom: '15px' }}>
          {actionType === 'update' ? 'Update Job' : 'Confirm Deletion'}
        </h3>
        {actionType === 'update' ? (
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Location:</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Benefits:</label>
              <input
                type="text"
                value={newBenefits}
                onChange={(e) => setNewBenefits(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Responsibilities:</label>
              <textarea
                value={newResponsibilities}
                onChange={(e) => setNewResponsibilities(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
              />
            </div>
          </form>
        ) : (
          <p style={{ marginBottom: '15px' }}>Are you sure you want to delete this job?</p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button
            onClick={handleConfirm}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {actionType === 'update' ? 'Update' : 'Delete'}
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#dc3545',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
