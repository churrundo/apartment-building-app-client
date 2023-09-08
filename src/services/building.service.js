import service from './index';

const buildingService = {
    getAllBuildings : ()=> service.get('/api/buildings'),
    createBuilding : (formData)=> service.post('/api/buildings', formData),
    getBuildingById: (buildingId) => service.get(`/api/buildings/${buildingId}`),
    getBuildingByAddress: (buildingAddress) => service.get(`/api/buildings?address=${buildingAddress}`),
    updateBuilding: (buildingId, formData) => service.put(`/api/buildings/${buildingId}`, formData),
    deleteBuilding: (buildingId) => service.delete(`/api/buildings/${buildingId}`),
}

export default buildingService;
