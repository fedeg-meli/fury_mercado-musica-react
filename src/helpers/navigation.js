import axios from "axios";

export const fetchRequest = config => {
  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        const { status, data } = response;
        if ((status >= 200 && status < 300) || status === 304) {
          resolve(data);
        } else {
          resolve({
            err: data.error
          });
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};
