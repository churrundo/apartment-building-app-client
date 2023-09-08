import service from './index';

const announcementService = {
    
    createAnnouncement : (formData)=> service.post('/api/announcements', formData),
    getAllAnnouncements : ()=> service.get('/api/announcements'),
    getAnnouncementsByBuilding: (buildingId)=> service.get(`/api/announcements/buildingId?:${buildingId}`),
    getAnnouncement: (announcementId) => service.get(`/api/announcements/${announcementId}`),
    updateAnnouncement: (announcementId, formData) => service.put(`/api/announcements/${announcementId}`, formData),
    deleteAnnouncement: (announcementId) => service.delete(`/api/announcements/${announcementId}`),
}

export default announcementService;
