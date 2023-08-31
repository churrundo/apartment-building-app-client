import service from './index';

const pollService = {
    getAllPolls : ()=> service.get('/api/polls'),
    createPoll : (formData)=> service.post('/api/polls', formData),
    getPoll: (pollId) => service.get(`/api/polls/${pollId}`),
    updatePoll: (pollId, formData) => service.put(`/api/polls/${pollId}`, formData),
    deletePoll: (pollId) => service.delete(`/api/polls/${pollId}`),
}

export default pollService;
