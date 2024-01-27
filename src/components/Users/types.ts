export type User = {
  _id: string
  email: string
  username: string
  role: 'ADMIN' | 'USER' | null
  active?: boolean
}
