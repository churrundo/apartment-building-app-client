import service from './index';

const buildingService = {
    getAllBuildings : ()=> service.get('/api/buildings'),
    createBuilding : (formData)=> service.post('/api/buildings', formData),
    getResidents: (buildingId)=> service.get(`/api/buildings/${buildingId}/directory`),
    getBuildingById: (buildingId) => service.get(`/api/buildings/${buildingId}`),
    getBuildingByAddress: (buildingAddress) => service.get(`/api/buildings?address=${buildingAddress}`),
    updateBuilding: (buildingId, formData) => service.put(`/api/buildings/${buildingId}`, formData),
    addUserToBuilding: (buildingId, userId) => service.put(`/api/buildings/${buildingId}/addUser/${userId}`),
    addAnnouncementToBuilding: (buildingId, announcementId) => service.put(`/api/buildings/${buildingId}/addAnnouncement/${announcementId}`),
    addPollToBuilding: (buildingId, pollId) => service.put(`/api/buildings/${buildingId}/addPoll/${pollId}`),
    deleteBuilding: (buildingId) => service.delete(`/api/buildings/${buildingId}`),
}

export default buildingService;
