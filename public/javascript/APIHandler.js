class APIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: 'https://minions-api.herokuapp.com'
    })
  }
  getFullList = () => this.axiosApp.get(`/characters`)

  getOneRegister = (id) => this.axiosApp.get(`/characters/${id}`)

  createOneRegister = (info) => this.axiosApp.post(`/characters`, info)

  updateOneRegister = (id, info) => this.axiosApp.put(`/characters/${id}`, info)

  deleteOneRegister = (id) => this.axiosApp.delete(`/characters/${id}`)
}

