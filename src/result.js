import axios from 'axios';

const result = {
  async render() {
    const res = await axios.get('/api/users');

    return (res.data || [])
      .map(user => {
        return `<div>${user.id} : ${user.name}</div>`;
      })
      .join('');
  },
};

export default result;

// API를 호출하여 데이터를 가져와서 div 리스트를 반환
