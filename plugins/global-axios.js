/**
 * 重写Axios响应
 * @param $axios
 */
export default function ({ $axios,store,redirect }) {
  // $axios.onResponse(response => {
  //   console.log('axios response:',response)
  //   return response
  // })

  $axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (!error.response) {
      alert('网络错误')
    } else {
      const code = error.response.status
      const response = error.response.data
      const originalRequest = error.config;

      if (code === 401 && !originalRequest._retry) {
        console.log('401',response)
        originalRequest._retry = true
        //store.dispatch('logout')
        store.dispatch('showLoginAlert',true)
        // window.location.href = "/login";
        //redirect('/login')
      }

      return Promise.reject(error)
    }
  });
}
