import service from './index';

const announcementService = {
    getAllAnnouncements : ()=> service.get('/api/announcements'),
    createAnnouncement : (formData)=> service.post('/api/announcements', formData),
    getAnnouncement: (announcementId) => service.get(`/api/announcements/${announcementId}`),
    updateAnnouncement: (announcementId, formData) => service.put(`/api/announcements/${announcementId}`, formData),
    deleteAnnouncement: (announcementId) => service.delete(`/api/announcements/${announcementId}`),
}

export default announcementService;
