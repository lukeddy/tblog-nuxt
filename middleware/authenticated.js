export default function ({ store, redirect }) {
  //如果用户未登录跳转到登录页
  if (!store.getters.isLoggedIn) {
    console.log('请先登录',store.state.token)
    return redirect('/login')
  }
}
