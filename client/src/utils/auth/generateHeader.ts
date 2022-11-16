const generateAuthHeader = (token: string | null) => `Bearer ${token}`
export default generateAuthHeader
