const base_url = "http://127.0.0.1:8080/";

// cafe
export async function fetchAllCafes(data = "") {
  let dataUrl = base_url + "cafe";
  if (data) {
    dataUrl += "?location=" + data;
  }
  return await fetch(dataUrl, {
    method: "GET",
    crossorigin: true,
  })
    .then((r) => r.json())
    .then((data) => data.data);
}

export async function createCafe(data) {
  let dataUrl = base_url + "cafe";
  return await fetch(dataUrl, {
    method: "POST",
    crossorigin: true,
    headers: {
      // "Content-Type": "multipart/form-data",
    },
    body: data,
  })
    .then((r) => r.json())
    .then((data) => data.message);
}

export async function updateCafe(data) {
  let dataUrl = base_url + "cafe";
  return await fetch(dataUrl, {
    method: "PUT",
    crossorigin: true,
    headers: {
      // "Content-Type": "multipart/form-data",
    },
    body: data,
  })
    .then((r) => r.json())
    .then((data) => data.message);
}

export async function deleteCafe(data) {
  let dataUrl = base_url + "cafe";
  return await fetch(dataUrl, {
    method: "DELETE",
    crossorigin: true,
    headers: {
      // "Content-Type": "multipart/form-data",
    },
    body: data,
  })
    .then((r) => r.json())
    .then((data) => data.message);
}

// Employees
export async function fetchAllEmployees(data) {
  let dataUrl = base_url + "employee";
  if (data) {
    dataUrl += "?cafe=" + data;
  }

  return await fetch(dataUrl, {
    method: "GET",
    crossorigin: true,
  })
    .then((r) => r.json())
    .then((data) => data.data);
}

export async function createNewEmployee(data) {
  let dataUrl = base_url + "employee";

  return await fetch(dataUrl, {
    method: "POST",
    crossorigin: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((data) => data.message);
}

export async function updateEmployee(data) {
  let dataUrl = base_url + "employee";

  return await fetch(dataUrl, {
    method: "PUT",
    crossorigin: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((data) => data.message);
}

export async function deleteEmployee(data) {
  let dataUrl = base_url + "employee";

  return await fetch(dataUrl, {
    method: "DELETE",
    crossorigin: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((data) => data.message);
}
