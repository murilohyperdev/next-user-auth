export default function LoginForm() {
  return(
    <form className="space-y-3">
      <label htmlFor="email">
        Login
      </label>
      <input type="text" name="email" id="email" />
      <br />
      <label htmlFor="password">
        Password
      </label>
      <input type="password" name="password" id="password" />
      <br />
      <button>
        Logar
      </button>
    </form>
  )
}