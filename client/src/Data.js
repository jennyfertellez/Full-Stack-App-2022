import apiBaseUrl from "./config";

// GET, POST, DELETE, and PUT requests to the REST API
export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Checks if authorization is required
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // GET User from the database
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

// Creates User
    async createUser(user) {
        const response = await this.api("/users", "POST", user);
        if (response.status === 201) {
          return [];
        } else if (response.status === 400) {
          return response.json().then((data) => {
            return data.errors;
          });
        } else {
          throw new Error();
        }
     }
 // GET all courses from the database
  async getCourses() {
    const response = await this.api(`/courses`, "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }
  // GET a specific course
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }
  // Creates Course
  async createCourse(body, emailAddress, password) {
    const response = await this.api("/courses", "POST", body, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Updates a Course
  async updateCourse(id, body, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "PUT", body, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  // DELETE a Course (with authorization)
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
}
