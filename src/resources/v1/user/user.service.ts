class UserService {
  findByEmail(): {_id, email} {
    return { _id: '3213312', email: 'otavioprimo@gmail.com' };
  }
}

export default new UserService();
