import base64 from 'base-64'
import { notification } from 'antd'

export default async function GetProjects() {
  const response = await fetch('http://localhost/api/project/getall', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(`${sessionStorage.getItem('email')}:${sessionStorage.getItem('password')}`)}`,
    },
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  console.log(response)
  return response.json()
}
