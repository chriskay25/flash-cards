class ApiAdapter {

  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1"
  }

  get(url) {
    return fetch(this.baseUrl + url)
      .then(resp => resp.json())
  }

  post(url, question, answer, collection_id) {
    const bodyData = {question, answer, collection_id}
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(resp => resp.json())
  }

}