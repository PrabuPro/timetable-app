const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined;


export const state = () => {
  return {
    auth: null,
    students: [],
  }
}
export const mutations = {
  // auth mutations
  setAuth (state, auth) {
    state.auth = auth
  },
  unSetAuth(state, auth) {
    state.auth = null;
  },

  
  //Student Mutations
  resetStudents(state, studentList){
    state.students = studentList;
  },
  setStudents(state, studentList) {
    state.students.push(studentList);
  },
  addNewStudent(state, newStudent){
    state.students.push(newStudent)
  },
  updateStudent(state, editStudent){
    let editIndex = state.students.findIndex(item => item.id == editStudent.id)
    Object.assign(state.students[editIndex], editStudent)
  },
  deleteStudent(state, studentId){
    let editIndex = state.students.findIndex(item => item.id == studentId)
    state.students.splice(editIndex, 1)
  },

}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },

  async logout({state, commit}){
    Cookie.remove('auth');
    commit('unSetAuth', null);
    this.$toast.error('Loggin Out').goAway(1500);
  },
  async showError({state, commit}, error){
    const errorMessage = error.data.error != null ? (typeof error.data.error[0] == 'string' ? error.data.error[0] :'Something went wrong' ) : 'Something went wrong';
    this.$toast.error(errorMessage).goAway(1500);
  },
  async connectionError({state, commit}, error){
    this.$toast.error(error).goAway(1500);
  },

  //Actions
  async getItems({state,commit}, data){
        console.log(data.urlPath, data.resetItem, data.setItem);
        await this.$axios.$get(data.urlPath)
          .then(res => {
              const itemRes = res != null ? res : [];
              if(itemRes.length > 0){
                commit(data.resetItem, []);
                itemRes.forEach(item => {
                  commit(data.setItem, item);
                })
              }
          })
    },

  async saveItem({commit}, data){
    const itemObject = data.object;
    await this.$axios.$post(data.urlPath, {
            ...itemObject
          })
          .then(res => {
              const itemRes = res != null ? res : [];
              if(itemRes != null){
                commit(data.addNewItem, itemRes);
                this.$toast.success(data.messeges.addItem).goAway(1500); 
              }
          })
  },
  async updateItem({commit}, data){
    const itemObject = data.object;
    await this.$axios.$put(data.urlPath + data.id, {
            ...itemObject
          })
          .then(res => {
              const itemRes = res != null ? res : [];
              if(itemRes != null){
                commit(data.updateItem, itemRes);
                this.$toast.success(data.messeges.updateItem).goAway(1500);
              }
          })
  },
  async deleteItem({commit}, data){
    await this.$axios.$delete(data.urlPath + data.id, {})
          .then(res => {
              const itemRes = res != null ? res : [];
              if(itemRes != null){
                commit(data.deleteItem, data.id);
                this.$toast.success(data.messeges.deleteItem).goAway(1500);
              }
          })
  },


}
