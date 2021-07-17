export default function ({ $axios, store, redirect }) {
    // $axios.onRequest((config) => {
    //     if(store.state.auth != null){
    //         config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`;
    //         console.log('store', store.state.auth.accessToken);
    //     }
    // })

    $axios.onError(error => {
    if (error.response && error.response.status === 401) {
        store.dispatch('logout');
        redirect('/login')
    }
    if (error.response && error.response.status === 400) {
        store.dispatch('showError', error.response)
    }
    if (error.response && error.response.status === 504) {
        store.dispatch('connectionError', 'Please Check your Internet Connection')
    }
    if (error.response && error.response.status === 500) {
        store.dispatch('connectionError', 'Server Error')
    }
  })

  
}