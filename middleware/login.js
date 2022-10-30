export default function ({ app, redirect }) {
  if (!app.$cookies.get('logged')) {
    return redirect('/login')
  }
}
