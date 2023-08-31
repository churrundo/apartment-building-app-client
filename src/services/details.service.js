import service from './index';

const detailService = {
    getAllDetails : ()=> service.get('/api/details'),
    createDetail : (formData)=> service.post('/api/details', formData),
    getDetail: (detailId) => service.get(`/api/details/${detailId}`),
    updateDetail: (detailId, formData) => service.put(`/api/details/${detailId}`, formData),
    deleteDetail: (detailId) => service.delete(`/api/details/${detailId}`),
}

export default detailService;
