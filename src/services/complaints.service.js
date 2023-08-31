import service from './index';

const complaintService = {
    getAllComplaints : ()=> service.get('/api/complaints'),
    createComplaint : (formData)=> service.post('/api/complaints', formData),
    getComplaint: (complaintId) => service.get(`/api/complaints/${complaintId}`),
    updateComplaint: (complaintId, formData) => service.put(`/api/complaints/${complaintId}`, formData),
    deleteComplaint: (complaintId) => service.delete(`/api/complaints/${complaintId}`),
}

export default complaintService;
