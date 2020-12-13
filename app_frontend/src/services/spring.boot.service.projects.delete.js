import { notification } from 'antd'
import base64 from 'base-64'

export default async function DeleteProjects(data) {
  console.log('try to set project')
  console.log(JSON.stringify(data))
  const result = await fetch(`http://backend/api/v1/project/deletebyid/${data.id}`, {
    method: 'POST',
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      Authorization: `Basic ${base64.encode(`${sessionStorage.getItem('email')}:${sessionStorage.getItem('password')}`)}`,
    },
    body: JSON.stringify(data),
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  console.log(result)
  return result
}
