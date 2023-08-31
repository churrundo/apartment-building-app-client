import service from './index';

const userService = {
    getAllUsers : ()=> service.get('/api/users'),
    createUser : (formData)=> service.post('/api/users', formData),
    getUser: (userId) => service.get(`/api/users/${userId}`),
    updateUser: (userId, formData) => service.put(`/api/users/${userId}`, formData),
    deleteUser: (userId) => service.delete(`/api/users/${userId}`),
}

export default userService;
