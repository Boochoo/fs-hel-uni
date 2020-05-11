import axios from 'axios';

const baseUrl = `/api/persons`;

const getAll = () => axios.get(baseUrl);

const create = (newObject) => axios.post(baseUrl, newObject);

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);

  return req.then((response) => response.data);
};

const deleteItem = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  deleteItem,
};
