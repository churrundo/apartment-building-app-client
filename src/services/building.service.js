import service from './index';

const buildingService = {
    getAllbuildings : ()=> service.get('/api/buildings'),
    createbuilding : (formData)=> service.post('/api/buildings', formData),
    getbuildingById: (buildingId) => service.get(`/api/buildings/${buildingId}`),
    getbuildingByAddress: (buildingAddress) => service.get(`/api/buildings?address=${buildingAddress}`),
    updatebuilding: (buildingId, formData) => service.put(`/api/buildings/${buildingId}`, formData),
    deletebuilding: (buildingId) => service.delete(`/api/buildings/${buildingId}`),
}

export default buildingService;
