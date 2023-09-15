import service from './index';

const pollService = {
    createPoll : (formData)=> service.post('/api/polls', formData),
    getAllPolls : ()=> service.get('/api/polls'),
    getPollsByBuilding: (buildingId) => service.get(`/api/polls?buildingId?=${buildingId}`),
    getPoll: (pollId) => service.get(`/api/polls/${pollId}`),
    updatePoll: (pollId, formData) => service.put(`/api/polls/${pollId}`, formData),
    vote: (pollId, optionId, userId) => service.post(`/api/polls/${pollId}/vote`, { optionId, userId }),
    closePoll: (pollId, userId) => service.put(`/api/polls/${pollId}/close`, { userId }),
    deletePoll: (pollId) => service.delete(`/api/polls/${pollId}`),
}

export default pollService;
